const { response } = require('express');
const { Service } = require('feathers-mongodb');
const { ObjectId } = require('mongodb');

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
    });
  }

  async create(data, params) {
    try {
      const { email } = data;
      const isEmailAlreadyUsedQuery = { email };
      const isEmailAlreadyUsed = await this.Model.find(isEmailAlreadyUsedQuery).count();
      if (isEmailAlreadyUsed > 0) {
        throw "Email already in use";
      }
      return super.create(data, params);
    } catch (e) {
      console.log("error", e);
    }
  }
};
