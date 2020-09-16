const schema = require("./products-schema.js");

/**
 * @class Product
 */

class Product {
  /* eslint-disable-next-line */
  /**
   * [create description]
   * @method create
   * @param  {object} record
   * @return {promise}
   */
  create(record) {
    const newRecord = new schema(record);
    return newRecord.save();
  }

  /* eslint-disable-next-line */
  /**
   * [get description]
   * @method get
   * @param  {number} _id
   * @param  {string} category
   * @return {promise}
   */
    get({ _id, category }) {
    if (_id) {
      return schema.findById(_id);
    }
    if (category) { // true means no category
      return schema.find({ category });
    }
    return schema.find();
  }

  /**
   * [update description]
   * @method update
   * @param  {number} _id    [description]
   * @param  {object} record [description]
   * @return {promise}        [description]
   */

  update(_id, record) {
    return schema.findOneAndUpdate({_id: _id}, record );
  }

  /**
   * [delete description]
   * @method delete
   * @param  {number} _id [description]
   * @return {promise}     [description]
   */

    delete(_id) {
        return schema.findByIdAndDelete(_id);
    }
}

module.exports = new Product();
