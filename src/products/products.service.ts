import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id });
    }

    create(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    update(id: number, updatedProduct: Partial<Product>): Promise<Product> {
        return this.productRepository.save({ id, ...updatedProduct });
    }

    delete(id: number): Promise<void> {
        return this.productRepository.delete(id).then(() => undefined);
    }
}
