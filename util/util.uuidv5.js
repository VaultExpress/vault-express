require('dotenv').config();
const uuidv5 = require('uuid/v5');

const veUtilUuidv5 = {};

// Private function to prepare uuid v5 namespace.
veUtilUuidv5.environmentNameSpace = () => {
  // Retrieve VE_UUID_NAMESPACE
  if (typeof process.env.VE_UUIDV5_NAMESPACE === 'undefined') {
    throw Error('VE_UUIDV5_NAMESPACE is required to be set in environment');
  }

  return process.env.VE_UUIDV5_NAMESPACE;
};

// Construct namespace from environment.
veUtilUuidv5.constructNameSpace = () => {
  // Construct namespace from environment.
  try {
    return uuidv5(veUtilUuidv5.environmentNameSpace(), uuidv5.DNS);
  } catch (e) {
    throw e;
  }
};

// Produce uuidv5 from provided string with environment namespace
veUtilUuidv5.uuidv5 = str => uuidv5(str, veUtilUuidv5.constructNameSpace());

module.exports = veUtilUuidv5;
