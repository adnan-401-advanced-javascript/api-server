const schema = require("./products-schema.js");

const Model = require("../mongo");

/**
 * @class Product
 */

class Product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Product();
