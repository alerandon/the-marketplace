import {
  ApiOperationOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const CalculateQuoteDocs = {
  apiOperation: {
    summary: 'Calculate cart quote',
    description:
      'Receives a list of products with quantities and returns the subtotal of each item and the total amount. Does not persist data in the database.',
  } as ApiOperationOptions,

  apiResponseStatus200: {
    status: 200,
    description: 'Quote calculated successfully',
    schema: {
      example: {
        items: [
          {
            productId: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Coca Cola 2L',
            price: 10.5,
            quantity: 2,
            subtotal: 21.0,
          },
          {
            productId: '223e4567-e89b-12d3-a456-426614174001',
            name: 'Papas Lays Original',
            price: 7.5,
            quantity: 1,
            subtotal: 7.5,
          },
        ],
        total: 28.5,
        itemCount: 3,
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus400: {
    status: 400,
    description: 'Invalid data or insufficient stock',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          example: 'Insufficient stock for "Coca Cola 2L". Available: 5, Requested: 10',
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        },
      },
    },
  } as ApiResponseOptions,

  apiResponseStatus404: {
    status: 404,
    description: 'One or more products were not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'The following products were not found: 123e4567-e89b-12d3-a456-426614174000',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  } as ApiResponseOptions,
};
