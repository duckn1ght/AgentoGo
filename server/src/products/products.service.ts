import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private prodRep: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.prodRep.create(createProductDto);
    return await this.prodRep.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.prodRep.find();
  }

  async findOne(uuid: string): Promise<Product> {
    return await this.prodRep.findOne({ where: { id: uuid } });
  }

  async remove(id: string): Promise<void> {
    const product = await this.prodRep.findOne({ where: { id: id } });
    if (product) {
      await this.prodRep.remove(product);
    } else {
      throw new Error(`Product with id ${id} not found`);
    }
  }

  async update(
    uuid: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const prod = await this.prodRep.findOne({ where: { id: uuid } });
    if (prod) {
      Object.assign(prod, updateProductDto);
      return await this.prodRep.save(prod);
    } else {
      console.error('Продукт не найден. Ошибка обновления');
    }
  }
}
