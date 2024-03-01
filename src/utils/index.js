const { access, rm } = require("fs/promises");
const { constants } = require("fs");

async function dirIsExist(path) {
  let isHas = false;
  try {
    await access(path, constants.R_OK | constants.W_OK);
    isHas = true;
  } catch{
    console.error("cannot access");
  }
  return isHas;
}

async function removeDir(path) {
  let isSuccess = false;
  try {
    await rm(path, { recursive: true });
    isSuccess = true;
  } catch {
    console.error("cannot access");
  }
  return isSuccess;
}

module.exports = {
  dirIsExist,
  removeDir
};
