import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(id, updateProductDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
