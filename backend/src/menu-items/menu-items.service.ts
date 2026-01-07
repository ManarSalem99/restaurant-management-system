import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemsRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: Partial<MenuItem>): Promise<MenuItem> {
    const menuItem = this.menuItemsRepository.create(createMenuItemDto);
    return this.menuItemsRepository.save(menuItem);
  }

  async findAll(restaurantId?: number): Promise<MenuItem[]> {
    const where = restaurantId ? { restaurantId } : {};
    return this.menuItemsRepository.find({
      where,
      relations: ['restaurant'],
    });
  }

  async findOne(id: number): Promise<MenuItem> {
    const menuItem = await this.menuItemsRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }
    return menuItem;
  }

  async update(
    id: number,
    updateMenuItemDto: Partial<MenuItem>,
  ): Promise<MenuItem> {
    const menuItem = await this.findOne(id);
    Object.assign(menuItem, updateMenuItemDto);
    return this.menuItemsRepository.save(menuItem);
  }

  async remove(id: number): Promise<void> {
    const menuItem = await this.findOne(id);
    await this.menuItemsRepository.remove(menuItem);
  }
}
