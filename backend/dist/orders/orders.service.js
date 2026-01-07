"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const menu_item_entity_1 = require("../menu-items/entities/menu-item.entity");
let OrdersService = class OrdersService {
    ordersRepository;
    orderItemsRepository;
    menuItemsRepository;
    constructor(ordersRepository, orderItemsRepository, menuItemsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.menuItemsRepository = menuItemsRepository;
    }
    async create(createOrderDto, customerId) {
        const { restaurantId, items } = createOrderDto;
        if (!items || items.length === 0) {
            throw new common_1.BadRequestException('Order must have at least one item');
        }
        const menuItemIds = items.map((item) => item.menuItemId);
        const menuItems = await this.menuItemsRepository.find({
            where: { id: (0, typeorm_2.In)(menuItemIds) },
        });
        if (menuItems.length !== menuItemIds.length) {
            throw new common_1.NotFoundException('One or more menu items not found');
        }
        const invalidItems = menuItems.filter((mi) => mi.restaurantId !== restaurantId);
        if (invalidItems.length > 0) {
            throw new common_1.BadRequestException('All menu items must belong to the same restaurant');
        }
        let total = 0;
        const orderItems = items.map((item) => {
            const menuItem = menuItems.find((mi) => mi.id === item.menuItemId);
            if (!menuItem) {
                throw new common_1.NotFoundException(`Menu item with ID ${item.menuItemId} not found`);
            }
            const itemTotal = Number(menuItem.price) * item.quantity;
            total += itemTotal;
            const orderItem = this.orderItemsRepository.create({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: Number(menuItem.price),
            });
            return orderItem;
        });
        const order = this.ordersRepository.create({
            customerId,
            restaurantId,
            total,
            status: order_entity_1.OrderStatus.PENDING,
            orderItems,
        });
        return this.ordersRepository.save(order);
    }
    async findAll(customerId) {
        const where = customerId ? { customerId } : {};
        return this.ordersRepository.find({
            where,
            relations: ['customer', 'restaurant', 'orderItems', 'orderItems.menuItem'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, customerId) {
        const where = { id };
        if (customerId) {
            where.customerId = customerId;
        }
        const order = await this.ordersRepository.findOne({
            where,
            relations: ['customer', 'restaurant', 'orderItems', 'orderItems.menuItem'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        order.status = status;
        return this.ordersRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.ordersRepository.remove(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map