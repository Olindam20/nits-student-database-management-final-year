const express = require("express");
const FacultyDetails = require("../models/Faculty/FacultyDetails");
const Subject = require("../models/Other/Subject");
const Student = require("../models/Students/StudentDetails");
const { AttendanceRegister } = require("../models/Other/AttendanceRegister");
const router = express.Router();

router.post("/addAttendance", async (req, res) => {
  let { employeeId, code, enrollmentNo, date } = req.body;
  try {
    let subject = await Subject.findOne({ code });
    let employee = await FacultyDetails.findOne({ employeeId });
    let student = await Student.findOne({ enrollmentNo });
    
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = date.split("-")[2];


    if (subject && employee && student) {
      await AttendanceRegister.create({
        student: student._id,
        subject: subject._id,
        teacher: employee._id,

        date: new Date(`${year}-${month}-${day}`),
        isPresent: true,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Data" });
    }

    const data = {
      success: true,
      message: "Attendance Added!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/getAttendance", async (req, res) => {
  let { employeeId } = req.body;
  let { code } = req.body;
  let { date } = req.body;

  try {
    let employee = await FacultyDetails.findOne({ employeeId });
    let subject = await Subject.findOne({ code });
    console.log(subject);

    let attendance = await AttendanceRegister.find({ teacher: employee._id, subject: subject._id, date: new Date(date) }).populate("student").populate("subject").populate("teacher");
    return res.json({ success: true, attendance });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


module.exports = router;
