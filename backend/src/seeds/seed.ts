import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
import * as bcrypt from 'bcrypt';

export async function seedDatabase(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const restaurantRepository = dataSource.getRepository(Restaurant);
  const menuItemRepository = dataSource.getRepository(MenuItem);

  // Check if admin already exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@restaurant.com' },
  });

  if (!existingAdmin) {
    console.log('Creating admin user...');
    const admin = userRepository.create({
      email: 'admin@restaurant.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: UserRole.ADMIN,
    });
    await userRepository.save(admin);
    console.log('Admin user created: admin@restaurant.com / admin123');
  } else {
    console.log('Admin user already exists');
  }

  // Create sample restaurants
  const existingRestaurants = await restaurantRepository.count();
  if (existingRestaurants === 0) {
    console.log('Creating sample restaurants...');

    const restaurant1 = restaurantRepository.create({
      name: 'Pizza Palace',
      address: '123 Main St, New York, NY 10001',
      phone: '(555) 123-4567',
      description: 'Authentic Italian pizza with fresh ingredients',
    });
    const savedRestaurant1 = await restaurantRepository.save(restaurant1);

    const restaurant2 = restaurantRepository.create({
      name: 'Burger Junction',
      address: '456 Oak Ave, New York, NY 10002',
      phone: '(555) 234-5678',
      description: 'Gourmet burgers and fries',
    });
    const savedRestaurant2 = await restaurantRepository.save(restaurant2);

    const restaurant3 = restaurantRepository.create({
      name: 'Sushi Express',
      address: '789 Pine St, New York, NY 10003',
      phone: '(555) 345-6789',
      description: 'Fresh sushi and Japanese cuisine',
    });
    const savedRestaurant3 = await restaurantRepository.save(restaurant3);

    // Create menu items for Pizza Palace
    const pizzaItems = [
      {
        name: 'Margherita Pizza',
        price: 12.99,
        description: 'Classic pizza with tomato, mozzarella, and basil',
        restaurantId: savedRestaurant1.id,
      },
      {
        name: 'Pepperoni Pizza',
        price: 14.99,
        description: 'Pizza with pepperoni and mozzarella',
        restaurantId: savedRestaurant1.id,
      },
      {
        name: 'Hawaiian Pizza',
        price: 15.99,
        description: 'Pizza with ham, pineapple, and mozzarella',
        restaurantId: savedRestaurant1.id,
      },
    ];

    for (const item of pizzaItems) {
      const menuItem = menuItemRepository.create(item);
      await menuItemRepository.save(menuItem);
    }

    // Create menu items for Burger Junction
    const burgerItems = [
      {
        name: 'Classic Burger',
        price: 9.99,
        description: 'Beef patty with lettuce, tomato, and special sauce',
        restaurantId: savedRestaurant2.id,
      },
      {
        name: 'Cheese Burger',
        price: 10.99,
        description: 'Classic burger with cheese',
        restaurantId: savedRestaurant2.id,
      },
      {
        name: 'BBQ Bacon Burger',
        price: 12.99,
        description: 'Burger with bacon, BBQ sauce, and cheese',
        restaurantId: savedRestaurant2.id,
      },
    ];

    for (const item of burgerItems) {
      const menuItem = menuItemRepository.create(item);
      await menuItemRepository.save(menuItem);
    }

    // Create menu items for Sushi Express
    const sushiItems = [
      {
        name: 'Salmon Roll',
        price: 8.99,
        description: 'Fresh salmon sushi roll',
        restaurantId: savedRestaurant3.id,
      },
      {
        name: 'Tuna Roll',
        price: 8.99,
        description: 'Fresh tuna sushi roll',
        restaurantId: savedRestaurant3.id,
      },
      {
        name: 'Dragon Roll',
        price: 13.99,
        description: 'Eel, cucumber, and avocado roll',
        restaurantId: savedRestaurant3.id,
      },
    ];

    for (const item of sushiItems) {
      const menuItem = menuItemRepository.create(item);
      await menuItemRepository.save(menuItem);
    }

    console.log('Sample restaurants and menu items created!');
  } else {
    console.log('Restaurants already exist');
  }
}
