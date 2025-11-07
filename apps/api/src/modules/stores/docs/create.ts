import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { CreateStoreDto } from '../dto/create-store.dto';

export const CreateDocs = {
  apiOperation: {
    summary: 'Create store',
    description: 'Creates a new store',
  } as ApiOperationOptions,

  apiBody: {
    type: CreateStoreDto,
    examples: {
      example1: {
        summary: 'Create a fresh fruits store',
        value: {
          name: 'Fresh Fruits Market',
          address: '123 Main Street, Downtown',
          city: 'New York',
          phone: '+1-555-0123',
        },
      },
    },
  },

  apiResponseStatus201: {
    status: 201,
    description: 'The store has been created successfully',
    schema: {
      example: {
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Frutas y frutas',
          address: 'Baruta',
          city: 'Caracas',
          phone: '+584120000000',
          deletedAt: null,
          createdAt: '2025-11-02T12:34:45.678Z',
          updatedAt: '2025-11-02T12:34:45.678Z',
        },
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus400: {
    status: 400,
    description: 'Bad Request - Validation error',
    schema: {
      example: {
        error: {
          message: 'Validation failed',
          details: [
            {
              field: 'name',
              message: 'Name is required',
            },
            {
              field: 'address',
              message: 'Address is required',
            },
          ],
        },
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus409: {
    status: 409,
    description: 'Conflict - A store with the same unique field already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'This field is already in use.',
        error: 'Conflict',
      },
    },
  } as ApiResponseOptions,
};
