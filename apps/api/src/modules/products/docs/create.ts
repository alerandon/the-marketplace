import { ApiResponseOptions } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';

export const CreateDocs = {
  apiOperation: { summary: 'Create a new product (global)' },
  apiBody: { type: CreateProductDto },
  apiResponseStatus201: {
    status: 201,
    description: 'Product successfully created.',
    schema: {
      example: {
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Orange juice (250 ml)',
          description: 'An individual recipient of orange juice',
          price: 1.0,
          sku: 'FRUT66645356',
          stock: 22,
          isAvailable: true,
          createdAt: '2025-11-02T12:34:45.678Z',
          updatedAt: '2025-11-02T12:34:45.678Z',
        },
      },
    },
  } as ApiResponseOptions,
  apiResponseStatus400: {
    status: 400,
    description: 'Bad request for create product.',
    schema: {
      example: {
        message: ['price must be a valid positive number'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus409: {
    status: 409,
    description: 'Conflict - A product with the same SKU already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'A record with sku "PROD-12345" already exists.',
        error: 'Conflict',
      },
    },
  } as ApiResponseOptions,
};
