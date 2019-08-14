const user = require("../Models/user.model");

exports.create = function(req, res, next) {
  let data = req.body.data;
  data.Modified = new Date();
  const userdata = new user(data);
  console.log(userdata);
  userdata.save().then(result =>{
    return res.status(200).json({
        status: true,
        message: "Successfully created product",
        result: data
      });
  }).catch(err => {
      console.log(err);
      next(err);
  });
};

exports.getUsers = function(req, res, next) {
  user.find().then(result =>{
    return res.status(200).json({
        status: true,
        message: "Successfully get users listing",
        result: result
      });
  }).catch(err => {
      console.log(err);
      next(err);
  });
};

exports.getOneUser = function(req, res, next) {
  var id = req.params.id;
  user.findById(id).then(result =>{
    return res.status(200).json({
        status: true,
        message: "Successfully get users listing",
        result: result
      });
  }).catch(err => {
      console.log(err);
      next(err);
  });
};