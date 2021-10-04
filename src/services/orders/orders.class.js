const { Service } = require('feathers-mongodb');


exports.Orders = class Orders extends Service {
  constructor(options, app) {
    super(options);
    this.dishesService = app.service('dishes');

    app.get('mongoClient').then(db => {
      this.Model = db.collection('orders');

    });
  }

  async create(data, params) {
    const { dishId, quantity } = data;
    const dish = await this.dishesService.get(dishId);
    const order = {
      ...data,
      totalPrice: quantity * dish.price,
      price: dish.price,
      dishName: dish.dishName
    }
    return super.create(order, params);
  }
};
