import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    PREPARING = "PREPARING",
    READY = "READY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class Order {
    id: number;
    customer: User;
    customerId: number;
    restaurant: Restaurant;
    restaurantId: number;
    orderItems: OrderItem[];
    status: OrderStatus;
    total: number;
    createdAt: Date;
}
