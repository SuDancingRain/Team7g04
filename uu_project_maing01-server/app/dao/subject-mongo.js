"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
    async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }
  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async getByName(awid, name) {
    return await super.findOne({ name, awid });
  }

  async list(awid, order, pageInfo) {
    const filter = { awid };
    const sort = { name: order === "asc" ? 1 : -1 };

    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = SubjectMongo;
