import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
export interface CreateOrderDto {
    restaurantId: number;
    items: {
        menuItemId: number;
        quantity: number;
    }[];
}
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    private menuItemsRepository;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>, menuItemsRepository: Repository<MenuItem>);
    create(createOrderDto: CreateOrderDto, customerId: number): Promise<Order>;
    findAll(customerId?: number): Promise<Order[]>;
    findOne(id: number, customerId?: number): Promise<Order>;
    updateStatus(id: number, status: OrderStatus): Promise<Order>;
    remove(id: number): Promise<void>;
}
