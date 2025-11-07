import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CartQuoteDto } from './dto/cart-quote.dto';
import { QuoteResponseDto, QuoteItemResponseDto } from './dto/quote-response.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async calculateQuote(cartQuoteDto: CartQuoteDto): Promise<QuoteResponseDto> {
    const { items } = cartQuoteDto;

    // Extraer todos los productIds
    const productIds = items.map((item) => item.productId);

    // Buscar todos los productos en una sola consulta
    const products = await this.productRepository.find({
      where: { id: In(productIds) },
      relations: ['store'],
    });

    // Validar que se encontraron todos los productos
    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p.id);
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Los siguientes productos no fueron encontrados: ${missingIds.join(', ')}`,
      );
    }

    // Crear un mapa de productos para acceso rápido
    const productMap = new Map(products.map((p) => [p.id, p]));

    // Calcular subtotales y validar stock
    const quotedItems: QuoteItemResponseDto[] = items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new NotFoundException(`Producto con ID ${item.productId} no encontrado`);
      }

      // Validar disponibilidad
      if (!product.isAvailable) {
        throw new BadRequestException(
          `El producto "${product.name}" no está disponible`,
        );
      }

      // Validar stock suficiente
      if (item.quantity > product.stock) {
        throw new BadRequestException(
          `Stock insuficiente para "${product.name}". Disponible: ${product.stock}, Solicitado: ${item.quantity}`,
        );
      }

      const price = parseFloat(product.price.toString());
      const subtotal = price * item.quantity;

      return {
        productId: product.id,
        name: product.name,
        price: price,
        quantity: item.quantity,
        subtotal: parseFloat(subtotal.toFixed(2)),
      };
    });

    // Calcular total y cantidad de items
    const total = quotedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const itemCount = quotedItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: quotedItems,
      total: parseFloat(total.toFixed(2)),
      itemCount,
    };
  }
}
