const {Users} = require('./models');

exports.root = function (req, res) {
  res.render('index', {user: req.user});
};

exports.getAllUsers = function (req, res) {
  Users.getAll(function (err, users) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(users);
  });
};

exports.getUser = function (req, res) {
  Users.find(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(user);
  })
};
