"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/term-error.js");

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
class TermAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("term");
  }

  async filter(awid, dtoIn) {
    
  }

  async get(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termGetDtoInType", dtoIn);

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


    //Checks for existence of specified term

    if (!dtoOut) {
      throw new Errors.Delete.TermDoesNotExist({ uuAppErrorMap }, { termId: dtoIn.id });
    }

    //returns the Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async list(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termListDtoInType", dtoIn);
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

    let validationResult = this.validator.validate("termUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut and receives specified term by ID

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified term

    if (!dtoOut) {
      throw new Errors.Update.TermDoesNotExist({ uuAppErrorMap }, { termId: dtoIn.id });
    }

    //Attemps to change the dao record

    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Update.TermDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //Returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;


  }

  async delete(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut and receives specified term by ID

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified term

    if (!dtoOut) {
      throw new Errors.Delete.TermDoesNotExist({ uuAppErrorMap }, { termId: dtoIn.id });
    }

    //attemps to delete record
    
      await this.dao.delete(awid, dtoIn.id);
   
    //returns the errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;


  }

  async create(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //attempts to create a new Dao record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TermDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

}

module.exports = new TermAbl();
