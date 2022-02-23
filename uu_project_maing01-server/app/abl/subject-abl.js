"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },

  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
};

const DEFAULTS = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.userDao = DaoFactory.getDao("user");
  }

  async get(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //attempts to acquire Dao record

    dtoOut = await this.dao.get(awid, dtoIn.id)


    //Checks for existence of specified subject

    if (!dtoOut) {
      throw new Errors.Delete.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    //returns the Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async list(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Checks DtoIn for unfilled values which it fills from the default constant set in this file

    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;

    //attemps to create a list out of Dao File

    let dtoOut = await this.dao.list(awid, dtoIn.order, dtoIn.pageInfo);

    //returns the list 

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async update(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;
    
    //Get users name 

    let id = dtoIn.supervisors
    let user;

    for (let i = 0; i < id.length; i++) {
      user = await this.userDao.get(awid, id[i]);
    }

    dtoIn.supervisorName = user.name;


    //Sets up a dtoOut and receives specified subject by ID

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified subject

    if (!dtoOut) {
      throw new Errors.Update.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    //Attemps to change the dao record

    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //Returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;


  }

  async delete(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("subjectDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut and receives specified subject by ID

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified subject

    if (!dtoOut) {
      throw new Errors.Delete.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    //attemps to delete record

    await this.dao.delete(awid, dtoIn.id);

    //returns the errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async create(awid, dtoIn, session) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;
    
    //Get users name 

    let id = dtoIn.supervisors
    let user;

    for (let i = 0; i < id.length; i++) {
      user = await this.userDao.get(awid, id[i]);
    }

    dtoIn.supervisorName = user.name;


    //Sets up a dtoOut

    let dtoOut;

    //Checks for an existence of a subject with a same name
    let name = dtoIn.name;
    let subjectDb = await this.dao.getByName(awid, name);

    if (subjectDb) {
      throw new Errors.Create.SubjectAlreadyExists({ uuAppErrorMap }, { code: name });
    }

    //attempts to create a new Dao record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new SubjectAbl();
