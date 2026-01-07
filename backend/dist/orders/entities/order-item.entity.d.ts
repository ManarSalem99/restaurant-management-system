import { Order } from './order.entity';
import { MenuItem } from '../../menu-items/entities/menu-item.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    orderId: number;
    menuItem: MenuItem;
    menuItemId: number;
    quantity: number;
    price: number;
}
