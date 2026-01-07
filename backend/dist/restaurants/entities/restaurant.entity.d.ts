import { MenuItem } from '../../menu-items/entities/menu-item.entity';
import { Order } from '../../orders/entities/order.entity';
export declare class Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
    description: string;
    menuItems: MenuItem[];
    orders: Order[];
}
