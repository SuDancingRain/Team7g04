"use strict";
const AssignmentAbl = require("../../abl/assignment-abl.js");

class AssignmentController {

  get(ucEnv) {
    return AssignmentAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return AssignmentAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return AssignmentAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return AssignmentAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return AssignmentAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AssignmentController();
