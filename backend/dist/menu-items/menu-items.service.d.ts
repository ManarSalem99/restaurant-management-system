import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
export declare class MenuItemsService {
    private menuItemsRepository;
    constructor(menuItemsRepository: Repository<MenuItem>);
    create(createMenuItemDto: Partial<MenuItem>): Promise<MenuItem>;
    findAll(restaurantId?: number): Promise<MenuItem[]>;
    findOne(id: number): Promise<MenuItem>;
    update(id: number, updateMenuItemDto: Partial<MenuItem>): Promise<MenuItem>;
    remove(id: number): Promise<void>;
}
