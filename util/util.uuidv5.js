require('dotenv')
    .config();

const uuidv5 = require('uuid/v5')

let ve_util_uuidv5 = {};


/** Private function to prepare uuid v5 namespace. */
ve_util_uuidv5._environmentNameSpace = () => {
    
    /// retrieve VE_UUID_NAMESPACE
    if ( typeof process.env.VE_UUIDV5_NAMESPACE === "undefined") {
        throw "VE_UUIDV5_NAMESPACE is required to be set in environment"
    }
    else {
        return process.env.VE_UUIDV5_NAMESPACE
    }
}

/**
 * Construct namespace from environment.
 */
ve_util_uuidv5._constructNameSpace = () => {
    
    /// construct namespace from environment.
    try {
        return uuidv5(ve_util_uuidv5._environmentNameSpace(), uuidv5.DNS)
    }
    catch (e) {
        throw e
    }
}

/** Produce uuidv5 from provided string with environment namespace */
ve_util_uuidv5.uuidv5 = str => {
    return uuidv5(str, ve_util_uuidv5._constructNameSpace())
}

module.exports = ve_util_uuidv5