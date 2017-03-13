// stub model
// a proper database should be used
const users_db = {};

exports.Users = {
  find: function(id, cb) {
    cb(null, users_db[id] ? Object.assign({}, users_db[id]) : null);
  },

  getAll: function(cb) {
    cb(null, users_db);
  },

  save: function(user, cb) {
    users_db[user.id] = Object.assign({}, user);
    cb(null, true);
  },

  updateOrCreate: function(profile, cb) {
    user = users_db[profile.id] || {};
    Object.assign(user, profile);
    users_db[profile.id] = Object.assign({}, user);
    cb(null, user);
  }
};
