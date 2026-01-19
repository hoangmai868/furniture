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
    const order = this.orderRepository.create({
      customerName: createOrderDto.customerName,
      customerEmail: createOrderDto.customerEmail,
      customerPhone: createOrderDto.customerPhone,
      shippingAddress: createOrderDto.shippingAddress,
      totalPrice: createOrderDto.totalPrice,
    });
    const savedOrder = await this.orderRepository.save(order);

    const items = createOrderDto.items.map(item => 
      this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })
    );
    await this.orderItemRepository.save(items);

    return this.findOne(savedOrder.id);
  }

  findAll() {
    return this.orderRepository.find({ relations: ['items', 'items.product'] });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ 
      where: { id },
      relations: ['items', 'items.product']
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
