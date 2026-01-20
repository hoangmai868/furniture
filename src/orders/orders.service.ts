import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create({
      ...createOrderDto,
      statusHistory: [{
        status: createOrderDto.status || 'pending',
        timestamp: new Date(),
        note: 'Đơn hàng được tạo',
        updatedBy: createOrderDto.customer?.userId || 'system'
      }]
    });
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['assignedStaff'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['assignedStaff']
    });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    // Update status history if status changed
    // TODO: In production, updatedBy should come from authenticated user context
    if (updateOrderDto.status && updateOrderDto.status !== order.status) {
      const newHistoryEntry = {
        status: updateOrderDto.status,
        timestamp: new Date(),
        note: `Trạng thái đơn hàng được cập nhật từ ${order.status} sang ${updateOrderDto.status}`,
        updatedBy: updateOrderDto.assignedStaffId || 'system'
      };
      order.statusHistory = [...(order.statusHistory || []), newHistoryEntry];
    }

    Object.assign(order, updateOrderDto);
    return this.ordersRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }
}
