"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const GRADE_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}grade/`;

const Create = {
  UC_CODE: `${GRADE_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}gradeDaoCreateFailed`;
      this.message = "Failed to create Grade.";
    }
  },
};

const Delete = {
  UC_CODE: `${GRADE_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}gradeDoesNotExist`;
      this.message = "Grade does not exist.";
    }
  },
  GradeDaoDeleteFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}gradeDaoDeleteFailed`;
      this.message = "Failed to delete Grade.";
    }
  },
};

const Update = {
  UC_CODE: `${GRADE_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}gradeDoesNotExist`;
      this.message = "Grade does not exist.";
    }
  },
  GradeDaoUpdateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}gradeDaoUpdateFailed`;
      this.message = "Failed to update Grade.";
    }
  },
};

const List = {
  UC_CODE: `${GRADE_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${GRADE_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}gradeDoesNotExist`;
      this.message = "Grade does not exist.";
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
