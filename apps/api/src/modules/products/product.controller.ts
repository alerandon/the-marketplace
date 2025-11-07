import * as Swagger from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { ProductsService } from './product.service';
import { FindOneDocs, CreateDocs } from './docs';
import { CreateProductDto } from './dto/create-product.dto';
import { checkIfEntityNotFound, checkIfDuplicateKey } from '../../utils/error';

@Swagger.ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  @Swagger.ApiOperation(FindOneDocs.apiOperation)
  @Swagger.ApiParam(FindOneDocs.apiParam)
  @Swagger.ApiResponse(FindOneDocs.apiResponseStatus200)
  @Swagger.ApiResponse(FindOneDocs.apiResponseStatus404)
  @Swagger.ApiResponse(FindOneDocs.apiResponseStatus400)
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(id);
      const response = { data: product };
      return response;
    } catch (error) {
      checkIfEntityNotFound({ error, id, entityName: 'Product' });
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiBody(CreateDocs.apiBody)
  @Swagger.ApiOperation(CreateDocs.apiOperation)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus201)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus400)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus409)
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const createdProduct = await this.productsService.create(createProductDto);
      const response = { data: createdProduct };
      return response;
    } catch (error) {
      checkIfDuplicateKey(error);
      throw error;
    }
  }
}
