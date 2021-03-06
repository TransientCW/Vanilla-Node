// Deps
const checksConfirm = require('./checks/confirmRequests');
const tokensConfirm = require('./tokens/confirmRequests');
const usersConfirm = require('./users/confirmRequests');

const ACCEPTABLE_METHODS = ['post', 'get', 'put', 'delete'];

// Define request handlers
const handlers = {
  checks: (data, callback) => {
    // Only accept the following http methods
    if (ACCEPTABLE_METHODS.indexOf(data.method) > -1) {
      handlers._checks[data.method](data, callback);
    } else {
      callback(405);
    }
  },
  notFound: (data, callback) => {
    callback(404);
  },
  ping: (data, callback) => {
    callback(200, { status: 'alive' });
  },
  tokens: (data, callback) => {
    // Only accept the following http methods
    if (ACCEPTABLE_METHODS.indexOf(data.method) > -1) {
      handlers._tokens[data.method](data, callback);
    } else {
      callback(405);
    }
  },
  users: (data, callback) => {
    // Only accept the following http methods
    if (ACCEPTABLE_METHODS.indexOf(data.method) > -1) {
      handlers._users[data.method](data, callback);
    } else {
      callback(405);
    }
  }
};

// health checks route submethods
handlers._checks = {
  delete: (data, callback) => {
    return checksConfirm.delete(data, callback);
  },
  get: (data, callback) => {
    return checksConfirm.get(data, callback);
  },
  post: (data, callback) => {
    return checksConfirm.post(data, callback);
  },
  put: (data, callback) => {
    return checksConfirm.put(data, callback);
  }
};

// tokens route submethods
handlers._tokens = {
  // required data: phoneNumber
  // TODO only let authenticated user delete their own data
  // TODO clean up ALL files and data associated with this user
  delete: (data, callback) => {
    return tokensConfirm.delete(data, callback);
  },
  // required data: phoneNumber - TODO only let authenticated user
  // access their own data object, not anyone elses
  get: (data, callback) => {
    return tokensConfirm.get(data, callback);
  },
  // required data: phone, password
  post: (data, callback) => {
    return tokensConfirm.post(data, callback);
  },
  // required data: tokenId and extend boolean
  // TODO only let authenticated user update their own data
  put: (data, callback) => {
    return tokensConfirm.put(data, callback);
  }
};

// users route submethods
handlers._users = {
  // required data: phoneNumber
  // TODO only let authenticated user delete their own data
  // TODO clean up ALL files and data associated with this user
  delete: (data, callback) => {
    return usersConfirm.delete(data, callback);
  },
  // required data: phoneNumber - TODO only let authenticated user
  // access their own data object, not anyone elses
  get: (data, callback) => {
    return usersConfirm.get(data, callback);
  },
  // required data: firstName, lastName, phone, password, tosAgreement
  post: (data, callback) => {
    return usersConfirm.post(data, callback);
  },
  // required data: phoneNumber
  // optional data: first, last, pass - at least 1 MUST be specified to put/update
  // TODO only let authenticated user update their own data
  put: (data, callback) => {
    return usersConfirm.put(data, callback);
  }
};

module.exports = handlers;
