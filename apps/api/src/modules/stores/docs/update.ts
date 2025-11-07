import {
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { UpdateStoreDto } from '../dto/update-store.dto';

export const UpdateDocs = {
  apiOperation: {
    summary: 'Update store',
    description: 'Updates an existing store',
  } as ApiOperationOptions,

  apiBody: {
    type: UpdateStoreDto,
    examples: {
      example1: {
        summary: 'Update store name and phone',
        value: {
          name: 'Updated Fresh Fruits Market',
          phone: '+1-555-9999',
        },
      },
      example2: {
        summary: 'Update store address',
        value: {
          address: '456 New Avenue, Uptown',
          city: 'Los Angeles',
        },
      },
    },
  },

  apiParam: {
    name: 'id',
    description: 'Store ID',
    type: String,
    required: true,
  } as ApiParamOptions,

  apiResponseStatus200: {
    status: 200,
    description: 'The store has been updated successfully',
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
    description: 'Bad Request - Validation failed',
  } as ApiResponseOptions,

  apiResponseStatus404: {
    status: 404,
    description: 'Store not found',
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
