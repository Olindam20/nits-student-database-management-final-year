
const mongoose = require("mongoose");

const GrievancesSchema = new mongoose.Schema({
  scholarID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addressed: {
        type: Boolean,
        default: false
    }
});

const Grievances = mongoose.model('Grievances', GrievancesSchema);

module.exports = Grievances;
