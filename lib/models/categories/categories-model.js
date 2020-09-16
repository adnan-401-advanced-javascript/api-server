const schema = require("./categories-schema.js");
const Model = require("../mongo");

/**
 * @class Category
 */

class Category extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Category();
