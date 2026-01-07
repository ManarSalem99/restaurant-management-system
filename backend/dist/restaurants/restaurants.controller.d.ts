import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: Partial<Restaurant>): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: Partial<Restaurant>): Promise<Restaurant>;
    remove(id: string): Promise<void>;
}
