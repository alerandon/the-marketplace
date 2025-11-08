import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoresModule } from './modules/stores/store.module';
import { ProductsModule } from './modules/products/product.module';
import { CartModule } from './modules/cart/cart.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StoresModule,
    ProductsModule,
    CartModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = await configService.get('database');
        return databaseConfig;
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
