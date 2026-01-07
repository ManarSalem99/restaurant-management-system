import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';

export interface CreateOrderDto {
  restaurantId: number;
  items: { menuItemId: number; quantity: number }[];
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(MenuItem)
    private menuItemsRepository: Repository<MenuItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto, customerId: number): Promise<Order> {
    const { restaurantId, items } = createOrderDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    // Fetch menu items and validate they belong to the restaurant
    const menuItemIds = items.map((item) => item.menuItemId);
    const menuItems = await this.menuItemsRepository.find({
      where: { id: In(menuItemIds) },
    });

    if (menuItems.length !== menuItemIds.length) {
      throw new NotFoundException('One or more menu items not found');
    }

    // Validate all menu items belong to the restaurant
    const invalidItems = menuItems.filter((mi) => mi.restaurantId !== restaurantId);
    if (invalidItems.length > 0) {
      throw new BadRequestException('All menu items must belong to the same restaurant');
    }

    // Calculate total
    let total = 0;
    const orderItems = items.map((item) => {
      const menuItem = menuItems.find((mi) => mi.id === item.menuItemId);
      if (!menuItem) {
        throw new NotFoundException(`Menu item with ID ${item.menuItemId} not found`);
      }
      const itemTotal = Number(menuItem.price) * item.quantity;
      total += itemTotal;

      const orderItem = this.orderItemsRepository.create({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: Number(menuItem.price),
      });
      return orderItem;
    });

    const order = this.ordersRepository.create({
      customerId,
      restaurantId,
      total,
      status: OrderStatus.PENDING,
      orderItems,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(customerId?: number): Promise<Order[]> {
    const where = customerId ? { customerId } : {};
    return this.ordersRepository.find({
      where,
      relations: ['customer', 'restaurant', 'orderItems', 'orderItems.menuItem'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, customerId?: number): Promise<Order> {
    const where: any = { id };
    if (customerId) {
      where.customerId = customerId;
    }

    const order = await this.ordersRepository.findOne({
      where,
      relations: ['customer', 'restaurant', 'orderItems', 'orderItems.menuItem'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }
}
