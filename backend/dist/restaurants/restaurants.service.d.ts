import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsService {
    private restaurantsRepository;
    constructor(restaurantsRepository: Repository<Restaurant>);
    create(createRestaurantDto: Partial<Restaurant>): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    findOne(id: number): Promise<Restaurant>;
    update(id: number, updateRestaurantDto: Partial<Restaurant>): Promise<Restaurant>;
    remove(id: number): Promise<void>;
}
