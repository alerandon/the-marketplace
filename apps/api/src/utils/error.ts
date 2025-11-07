import { NotFoundException, ConflictException } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

interface CheckIfEntityNotFoundParams {
  error: unknown;
  id: string;
  entityName: string;
}

export function checkIfEntityNotFound({
  error,
  id,
  entityName,
}: CheckIfEntityNotFoundParams) {
  if (error instanceof EntityNotFoundError) {
    throw new NotFoundException(`${entityName} with ID ${id} not found.`);
  }
}

interface PostgresError extends Error {
  code?: string;
  detail?: string;
  constraint?: string;
}

export function checkIfDuplicateKey(error: unknown) {
  if (error instanceof QueryFailedError) {
    const pgError = error.driverError as PostgresError;

    // PostgreSQL error code for unique violation
    if (pgError.code === '23505') {
      // Extract field name from constraint or detail
      let field = 'field';
      let value = '';

      if (pgError.constraint) {
        // Extract field name from constraint like "products_sku_key"
        const match = pgError.constraint.match(/^(.+?)_(.+?)_key$/);
        if (match && match[2]) {
          field = match[2];
        }
      }

      if (pgError.detail) {
        // Extract value from detail like "Key (sku)=(PROD-123) already exists."
        const valueMatch = pgError.detail.match(/\((.+?)\)=\((.+?)\)/);
        if (valueMatch && valueMatch[1] && valueMatch[2]) {
          field = valueMatch[1];
          value = valueMatch[2];
        }
      }

      const message = value
        ? `A record with ${field} "${value}" already exists.`
        : `This ${field} is already in use.`;

      throw new ConflictException(message);
    }
  }
}
