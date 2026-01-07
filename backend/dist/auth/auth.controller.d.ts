import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(email: string, password: string, name: string, role?: UserRole): Promise<{
        id: number;
        email: string;
        name: string;
        role: UserRole;
        orders: import("../orders/entities/order.entity").Order[];
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
}
