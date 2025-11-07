import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Store } from '../modules/stores/entities/store.entity';
import { Product } from '../modules/products/entities/product.entity';
import { CreateUsersTable1762298400367 } from '../migrations/1762298400367-create-users-table';
import { CreateProductsTable1762298472187 } from '../migrations/1762298472187-create-products-table';
import { CreateStoresTable1762298469927 } from '../migrations/1762298469927-create-stores-table';
import { EnableUnaccentExtension1762511474731 } from '../migrations/1762511474731-enable-unaccent-extension';
import { EnablePgTrgmExtension1762511800000 } from '../migrations/1762511800000-enable-pg-trgm-extension';

const {
  API_DB_HOST = 'postgres',
  API_DB_PORT = '5432',
  API_DB_USERNAME = 'postgres',
  API_DB_PASSWORD = 'password',
  API_DB_DATABASE = 'the-marketplace',
} = process.env;

export default new DataSource({
  type: 'postgres',
  host: API_DB_HOST,
  port: parseInt(API_DB_PORT, 10),
  username: API_DB_USERNAME,
  password: API_DB_PASSWORD,
  database: API_DB_DATABASE,
  entities: [User, Store, Product],
  migrations: [
    CreateUsersTable1762298400367,
    CreateStoresTable1762298469927,
    CreateProductsTable1762298472187,
    EnableUnaccentExtension1762511474731,
    EnablePgTrgmExtension1762511800000
  ],
  synchronize: false,
  logging: false,
});
