import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { PaginatedResult, PAGINATE_DEFAULT_LIMIT } from '@the-marketplace/shared';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { Product } from '../products/entities/product.entity';
import { applyFuzzySearch, applyFuzzySearchAnd } from './store.helpers';

interface FindManyParams {
  pageNumber?: number;
  pageLimit?: number;
  q?: string;
}

interface FindProductsParams {
  storeId: string;
  pageNumber?: number;
  pageLimit?: number;
  q?: string;
  inStock?: boolean;
}

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findMany({
    pageNumber = 1,
    pageLimit = PAGINATE_DEFAULT_LIMIT,
    q,
  }: FindManyParams): Promise<PaginatedResult<Store>> {
    const queryBuilder = this.storeRepository.createQueryBuilder('store');

    if (q) {
      applyFuzzySearch<Store>(queryBuilder, q, 'store.name');
    }

    const skipNumber = (pageNumber - 1) * pageLimit;
    const [stores, totalItems] = await queryBuilder
      .skip(skipNumber)
      .take(pageLimit)
      .getManyAndCount();

    const hasPrev = pageNumber > 1;
    const hasNext = skipNumber + stores.length < totalItems;
    const response: PaginatedResult<Store> = {
      items: stores,
      page: pageNumber,
      limit: pageLimit,
      totalItems,
      hasPrev,
      hasNext,
    };

    return response;
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeRepository.findOneOrFail({
      where: { id },
      relations: ['products'],
    });

    return store;
  }

  async create(body: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(body);
    await this.storeRepository.save(store);
    return store;
  }

  async update(id: string, body: UpdateStoreDto): Promise<Store> {
    const store = await this.storeRepository.findOneOrFail({ where: { id } });
    const updatedStore = this.storeRepository.merge(store, body);
    await this.storeRepository.save(updatedStore);
    return updatedStore;
  }

  async delete(id: string): Promise<Store> {
    const store = await this.storeRepository.findOneOrFail({
      where: { id },
    });
    await this.storeRepository.softDelete(id);
    return store;
  }

  async findProducts({
    storeId,
    pageNumber = 1,
    pageLimit = PAGINATE_DEFAULT_LIMIT,
    q,
    inStock,
  }: FindProductsParams): Promise<PaginatedResult<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.storeId = :storeId', { storeId });

    if (q) {
      applyFuzzySearchAnd(queryBuilder, q, 'product.name');
    }

    if (inStock !== undefined) {
      queryBuilder.andWhere('product.isAvailable = :inStock', { inStock });
    }

    const skipNumber = (pageNumber - 1) * pageLimit;
    const [products, totalItems] = await queryBuilder
      .skip(skipNumber)
      .take(pageLimit)
      .getManyAndCount();

    const hasPrev = pageNumber > 1;
    const hasNext = skipNumber + products.length < totalItems;
    const response = {
      items: products,
      page: pageNumber,
      limit: pageLimit,
      totalItems,
      hasPrev,
      hasNext,
    };

    return response;
  }

  async createProduct(
    storeId: string,
    body: CreateStoreProductDto,
  ): Promise<Product> {
    const product = this.productRepository.create({
      storeId,
      ...body,
    });

    await this.productRepository.save(product);
    return product;
  }

  async updateProduct(
    storeId: string,
    productId: string,
    body: UpdateStoreProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({
      where: { id: productId, store: { id: storeId } },
    });
    const updatedProduct = this.productRepository.merge(product, body);
    await this.productRepository.save(updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(storeId: string, productId: string): Promise<Product> {
    const productToDelete = await this.productRepository.findOneOrFail({
      where: { id: productId, store: { id: storeId } },
    });
    await this.productRepository.delete(productToDelete.id);
    return productToDelete;
  }
}
