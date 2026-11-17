
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  // 1. Create Product
  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  // 2. Find All Products
  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'All products retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  // 3. Find One Product
  async findOne(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      message: 'Product found successfully',
      data: product,
    };
  }

  // 4. Update Product (PATCH)
  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  // 5. Replace Product (PUT)
  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: updatedProduct,
    };
  }

  // 6. Delete Product
  async remove(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  // 7. Find Products By Category
  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category },
    });

    return {
      message: 'Products by category retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  // 8. Search Products By Name
  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });

    return {
      message: 'Product search completed successfully',
      count: products.length,
      data: products,
    };
  }

  // 9. Toggle Active Status
  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    product.isActive = !product.isActive;

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product active status changed successfully',
      data: updatedProduct,
    };
  }
}
