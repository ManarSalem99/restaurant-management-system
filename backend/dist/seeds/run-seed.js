"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const seed_1 = require("./seed");
const user_entity_1 = require("../users/entities/user.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const menu_item_entity_1 = require("../menu-items/entities/menu-item.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const order_item_entity_1 = require("../orders/entities/order-item.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'restaurant.db',
    entities: [user_entity_1.User, restaurant_entity_1.Restaurant, menu_item_entity_1.MenuItem, order_entity_1.Order, order_item_entity_1.OrderItem],
    synchronize: true,
});
async function run() {
    try {
        await dataSource.initialize();
        console.log('Database connected');
        await (0, seed_1.seedDatabase)(dataSource);
        console.log('Seed completed successfully!');
        await dataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        await dataSource.destroy();
        process.exit(1);
    }
}
run();
//# sourceMappingURL=run-seed.js.map