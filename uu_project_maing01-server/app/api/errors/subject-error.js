"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectAlreadyExists: class extends ProjectMainUseCaseError{
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectAlreadyExists`;
      this.message = "Subject already exists.";
    }
  },
  SubjectDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Failed to create Subject.";
    }
  },
};

const Delete = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  },
  SubjectDaoDeleteFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}subjectDaoDeleteFailed`;
      this.message = "Failed to delete Subject.";
    }
  },
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  },
  SubjectDaoUpdateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Failed to update Subject.";
    }
  },
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
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
