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

@Swagger.ApiTags('Products')
@Swagger.ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  @UseGuards(AuthGuard('auth-jwt'))
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
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      throw error;
    }
  }

  @Post()
  @Swagger.ApiBody(CreateDocs.apiBody)
  @Swagger.ApiOperation(CreateDocs.apiOperation)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus201)
  @Swagger.ApiResponse(CreateDocs.apiResponseStatus400)
  async create(@Body() createProductDto: CreateProductDto) {
    const createdProduct = await this.productsService.create(createProductDto);
    const response = { data: createdProduct };
    return response;
  }
}
