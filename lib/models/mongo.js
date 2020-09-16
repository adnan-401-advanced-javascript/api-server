class Model {
  constructor(schema) {
    this.Schema = schema;
  }

  create(record) {
    const newRecord = new this.Schema(record);
    return newRecord.save();
  }

  get(_id) {
    const obj = _id ? { _id } : {};
    return this.Schema.find(obj);
  }

  update(_id, record) {
    return this.Schema.findByIdAndUpdate(_id, record);
  }

  delete(_id) {
    return this.Schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
