"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const USER_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}user/`;

const Create = {
  UC_CODE: `${USER_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userDaoCreateFailed`;
      this.message = "Failed to create User.";
    }
  },
};

const Delete = {
  UC_CODE: `${USER_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },
  UserDaoDeleteFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userDaoDeleteFailed`;
      this.message = "Failed to delete User.";
    }
  },
};

const Update = {
  UC_CODE: `${USER_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },
  UserDaoUpdateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDaoUpdateFailed`;
      this.message = "Failed to update User.";
    }
  },
};

const List = {
  UC_CODE: `${USER_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${USER_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
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
