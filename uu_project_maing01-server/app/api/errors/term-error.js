"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const TERM_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}term/`;

const Create = {
  UC_CODE: `${TERM_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}termDaoCreateFailed`;
      this.message = "Failed to create Term.";
    }
  },
};

const Delete = {
  UC_CODE: `${TERM_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}termDoesNotExist`;
      this.message = "Term does not exist.";
    }
  },
  TermDaoDeleteFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}termDaoDeleteFailed`;
      this.message = "Failed to delete Term.";
    }
  },
};

const Update = {
  UC_CODE: `${TERM_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}termDoesNotExist`;
      this.message = "Term does not exist.";
    }
  },
  TermDaoUpdateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}termDaoUpdateFailed`;
      this.message = "Failed to update Term.";
    }
  },
};

const List = {
  UC_CODE: `${TERM_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${TERM_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}termDoesNotExist`;
      this.message = "Term does not exist.";
    }
  },
};

const Filter = {
  UC_CODE: `${TERM_ERROR_PREFIX}filter/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Filter.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  Filter,
  Get,
  List,
  Update,
  Delete,
  Create
};
