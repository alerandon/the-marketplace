import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { CartQuoteDto } from './dto/cart-quote.dto';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { CalculateQuoteDocs } from './docs';

@Swagger.ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('quote')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('auth-jwt'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(CalculateQuoteDocs.apiOperation)
  @Swagger.ApiResponse(CalculateQuoteDocs.apiResponseStatus200)
  @Swagger.ApiResponse(CalculateQuoteDocs.apiResponseStatus400)
  @Swagger.ApiResponse(CalculateQuoteDocs.apiResponseStatus404)
  async calculateQuote(
    @Body() cartQuoteDto: CartQuoteDto,
  ): Promise<QuoteResponseDto> {
    return this.cartService.calculateQuote(cartQuoteDto);
  }
}
