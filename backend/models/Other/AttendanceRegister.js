const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceRegisterSchema = new Schema({
  student: {
      type: Schema.Types.ObjectId,
      ref: 'Student Detail',
      required: true
  },
  subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
  },
  teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty Detail',
      required: true
  },
  date: {
      type: Date,
      default: Date.now
  },
  isPresent: {
      type: Boolean,
      default: false
  }
});




const AttendanceRegister = mongoose.model('AttendanceRegister', attendanceRegisterSchema);

module.exports = {  AttendanceRegister };