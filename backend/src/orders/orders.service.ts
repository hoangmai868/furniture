import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    if (createOrderDto.items && createOrderDto.items.length > 0) {
      const items = createOrderDto.items.map(item =>
        this.orderItemRepository.create({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })
      );
      order.items = items;
    }
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['items', 'items.product', 'assignedStaff']
    });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'assignedStaff']
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.orderRepository.delete(id);
    return { deleted: true };
  }
}
