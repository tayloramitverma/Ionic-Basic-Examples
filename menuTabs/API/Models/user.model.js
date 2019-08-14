const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    Name: {type: String},
    Email: {type: String},
    Password: {type: String},
    Mobile: {type: String},
    Avatar: {type: String},
    Modified: {type: Date},
    ResetPassword: {type: String}


   // BranchID: {type: mongoose.Schema.ObjectId, ref: 'EmployeeId'},

});

// Export the model
module.exports = mongoose.model('Entries', EmployeeSchema);