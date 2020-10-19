const schema = require("./items-schema.js");

const Model = require("../mongo");

/**
 * @class Product
 */

class Item extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Item();
