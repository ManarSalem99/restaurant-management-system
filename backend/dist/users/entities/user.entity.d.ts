import { Order } from '../../orders/entities/order.entity';
export declare enum UserRole {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    orders: Order[];
    hashPassword(): Promise<void>;
}
