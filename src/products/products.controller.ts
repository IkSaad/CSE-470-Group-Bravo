import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Post()
    create(@Body() product: Product) {
        return this.productsService.create(product);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() product: Partial<Product>) {
        return this.productsService.update(+id, product);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.delete(+id);
    }
}
