import { OrdersService } from './orders.service';
import type { CreateOrderDto } from './orders.service';
import { Order, OrderStatus } from './entities/order.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<Order>;
    findAll(req: any, customerId?: string): Promise<Order[]>;
    findOne(id: string, req: any): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    remove(id: string): Promise<void>;
}
