import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { CreateStoreProductDto } from '../dto/create-store-product.dto';
import { UpdateStoreProductDto } from '../dto/update-store-product.dto';

export const StoreProductsDocs = {
  findProducts: {
    apiOperation: {
      summary: 'Find products in store',
      description: 'Find all products in a store with optional filtering',
    } as ApiOperationOptions,

    apiParam: {
      name: 'id',
      description: 'Store ID',
      type: String,
      required: true,
    },

    apiQueries: [
      {
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number for pagination (optional)',
        example: 1,
      },
      {
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page (optional)',
        example: 10,
      },
      {
        name: 'q',
        required: false,
        type: String,
        description: 'Search text to filter products by name (optional)',
        example: 'orange',
      },
      {
        name: 'inStock',
        required: false,
        type: Boolean,
        description: 'Filter products by stock availability (optional)',
        example: true,
      },
    ],

    apiResponseStatus200: {
      status: 200,
      description: 'List of products in the store',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store not found',
    } as ApiResponseOptions,
  },

  createProduct: {
    apiOperation: {
      summary: 'Add product to store',
      description: 'Create a product to a specific store',
    } as ApiOperationOptions,

    apiParam: {
      name: 'id',
      description: 'Store ID',
      type: String,
      required: true,
    },

    apiBody: {
      type: CreateStoreProductDto,
      examples: {
        example1: {
          summary: 'Create an orange juice product',
          value: {
            name: 'Orange Juice 500ml',
            description: 'Fresh squeezed orange juice',
            price: 3.99,
            sku: 'JUICE-ORA-500',
            stock: 50,
            isAvailable: true,
          },
        },
      },
    },

    apiResponseStatus201: {
      status: 201,
      description: 'Product added to store successfully',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store or product not found',
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
  },

  updateProduct: {
    apiOperation: {
      summary: 'Update product in store',
      description: 'Update a product of a specific store',
    } as ApiOperationOptions,

    apiParams: [
      {
        name: 'id',
        description: 'Store ID',
        type: String,
        required: true,
      },
      {
        name: 'productId',
        description: 'Product ID',
        type: String,
        required: true,
      },
    ],

    apiBody: {
      type: UpdateStoreProductDto,
      examples: {
        example1: {
          summary: 'Update product price and stock',
          value: {
            price: 4.49,
            stock: 75,
          },
        },
        example2: {
          summary: 'Update product availability',
          value: {
            isAvailable: false,
          },
        },
      },
    },

    apiResponseStatus200: {
      status: 200,
      description: 'Product updated in store successfully',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store or product not found',
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
  },

  deleteProduct: {
    apiOperation: {
      summary: 'Delete product from store',
      description: 'Delete a product from a specific store',
    } as ApiOperationOptions,

    apiParams: [
      {
        name: 'id',
        description: 'Store ID',
        type: String,
        required: true,
      },
      {
        name: 'productId',
        description: 'Product ID',
        type: String,
        required: true,
      },
    ],

    apiResponseStatus200: {
      status: 200,
      description: 'Product deleted from store successfully',
    } as ApiResponseOptions,

    apiResponseStatus404: {
      status: 404,
      description: 'Store or product not found',
    } as ApiResponseOptions,
  },
};
