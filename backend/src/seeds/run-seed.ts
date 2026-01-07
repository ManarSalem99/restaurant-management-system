import { DataSource } from 'typeorm';
import { seedDatabase } from './seed';
import { User } from '../users/entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'restaurant.db',
  entities: [User, Restaurant, MenuItem, Order, OrderItem],
  synchronize: true,
});

async function run() {
  try {
    await dataSource.initialize();
    console.log('Database connected');
    await seedDatabase(dataSource);
    console.log('Seed completed successfully!');
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

run();
