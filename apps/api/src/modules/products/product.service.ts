import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({
      where: { id },
      relations: ['stores'],
    });

    return product;
  }

  async create(body: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(body);
    await this.productRepository.save(product);
    return product;
  }
}
