"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const ASSIGNMENT_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}assignment/`;

const Create = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}assignmentDaoCreateFailed`;
      this.message = "Failed to create Assignment.";
    }
  },
};

const Delete = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
  AssignmentDaoDeleteFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}assignmentDaoDeleteFailed`;
      this.message = "Failed to delete Assignment.";
    }
  },
};

const Update = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
  AssignmentDaoUpdateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}assignmentDaoUpdateFailed`;
      this.message = "Failed to update Assignment.";
    }
  },
};

const List = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
};


module.exports = {
  Get,
  List,
  Update,
  Delete,
  Create
};
