const Schedule = require("../Models/Classroom");
const nodemailer = require("nodemailer");

module.exports.scheduleClass = async (req, res,next) => {
  try {
    const { course, teacher } = req.query;
    const { date, time_start, time_to, roomCode } = req.body;
    console.log(roomCode);
    const schedule = new Schedule({
      teacher,
      course,
      date,
      time_start,
      time_to,
      roomCode,
    });
    await schedule.save();
    next();
  } catch (err) {
    res.json("Error occured", err);
  }
};

module.exports.getLiveClasses = async (req, res) => {
  try {
    const { auth } = req.query;
    const classes = await Schedule.find({ teacher: auth }).populate([
      "course",
      "teacher",
    ]);
    res.json(classes);
  } catch (err) {
    res.json("Error in fetching classes", err);
  }
};

module.exports.getUpcomingclasses = async (req, res) => {
  try {
    const { course } = req.query;
    const classes = await Schedule.find({ course: course }).populate("course");
    res.json(classes);
  } catch (err) {
    res.json("Error in Fetching classes", err);
  }
};
