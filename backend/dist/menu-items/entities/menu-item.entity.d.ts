import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare class MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    restaurant: Restaurant;
    restaurantId: number;
}
