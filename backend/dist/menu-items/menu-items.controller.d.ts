import { MenuItemsService } from './menu-items.service';
import { MenuItem } from './entities/menu-item.entity';
export declare class MenuItemsController {
    private readonly menuItemsService;
    constructor(menuItemsService: MenuItemsService);
    create(createMenuItemDto: Partial<MenuItem>): Promise<MenuItem>;
    findAll(restaurantId?: string): Promise<MenuItem[]>;
    findOne(id: string): Promise<MenuItem>;
    update(id: string, updateMenuItemDto: Partial<MenuItem>): Promise<MenuItem>;
    remove(id: string): Promise<void>;
}
