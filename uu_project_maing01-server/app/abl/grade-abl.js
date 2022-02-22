"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/grade-error.js");

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
  filterUnsupportedKeys: {
    code: `${Errors.Filter.UC_CODE}unsupportedKeys`
  },
};

const DEFAULTS = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class GradeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("grade");
    this.assignmentDao = DaoFactory.getDao("assignment");
    this.userDao = DaoFactory.getDao("user");
  }

  async filter(awid, dtoIn) {

  }

  async get(awid, dtoIn) {


    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeGetDtoInType", dtoIn);

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


    //Checks for existence of specified grade

    if (!dtoOut) {
      throw new Errors.Delete.GradeDoesNotExist({ uuAppErrorMap }, { gradeId: dtoIn.id });
    }

    //returns the Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async list(awid, dtoIn, session, authorizationResult) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeListDtoInType", dtoIn);
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

    //instances dtoOut

    let dtoOut;

    //Gets Uuidentity and profiles, attemps to create a list out of Dao File

    let userId = [session.getIdentity().getUuIdentity()];
    let visibility = authorizationResult.getAuthorizedProfiles().includes("Readers");

    if (!visibility === true) {

      if (!dtoIn.assignmentId) {
        dtoOut = await this.dao.list(awid, dtoIn.order, dtoIn.pageInfo);
      } else {
        dtoOut = await this.dao.listByAssignmentId(awid, dtoIn.assignmentId, dtoIn.order, dtoIn.pageInfo);
      }
    } else {
      if (!dtoIn.assignmentId) {
        dtoOut = await this.dao.listForReaders(awid, userId, dtoIn.order, dtoIn.pageInfo);
      } else {
        dtoOut = await this.dao.listByAssignmentIdForReaders(awid, dtoIn.assignmentId, userId, dtoIn.order, dtoIn.pageInfo);
      }
    }


    //returns the list 

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    dtoOut.assignment = dtoIn.assignmentId
    return dtoOut;

  }

  async update(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;
    
    //Get users name 

    let uuIdentity = dtoIn.userId
    let user;

    for (let i = 0; i < uuIdentity.length; i++) {
     user = await this.userDao.getByUuIdentity(awid, uuIdentity[i]);
    }

    dtoIn.name = user.name;
    
    //Sets up a dtoOut and receives specified grade by ID

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified grade

    if (!dtoOut) {
      throw new Errors.Update.GradeDoesNotExist({ uuAppErrorMap }, { gradeId: dtoIn.id });
    }

    //Attemps to change the dao record

    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Update.GradeDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //Returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

}

  async delete(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut and receives specified grade by ID

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified grade

    if (!dtoOut) {
      throw new Errors.Delete.GradeDoesNotExist({ uuAppErrorMap }, { gradeId: dtoIn.id });
    }

    //attemps to delete record

    await this.dao.delete(awid, dtoIn.id);

    //returns the errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;


  }

  async create(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Get users name 

    let uuIdentity = dtoIn.userId
    let user;

    for (let i = 0; i < uuIdentity.length; i++) {
     user = await this.userDao.getByUuIdentity(awid, uuIdentity[i]);
    }

    dtoIn.name = user.name;

    //Sets up a dtoOut

    let dtoOut;

    //attempts to create a new Dao record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.GradeDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;


  }

}

module.exports = new GradeAbl();
