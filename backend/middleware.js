const Schema = require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const crypto = require("crypto");
const User = require("./Models/user.js");
const Teacher = require("./Models/Teacher.js");
const Course = require("./Models/courses.js");
const Student = require("./Models/Student.js");
const Schedule = require("./Models/Classroom.js");

module.exports.validateCourse = (req, res, next) => {
  let { error } = Schema.courseSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    res.json(new ExpressError(400, errMsg));
  } else {
    next();
  }
};

module.exports.validateUser = (req, res, next) => {
  let error = Schema.userSchema.valid(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    res.json(new ExpressError(400, errMsg));
  } else {
    next();
  }
};

module.exports.paymentVerification = (req, res, next) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const { auth } = req.query;
    const { id } = req.params;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generated_signature == razorpay_signature) {
      next();
    }
  } catch (e) {
    res.json("Error in payment Verification");
  }
};

module.exports.newInstructor = async (req, res, next) => {
  try {
    const { auth } = req.query;
    const user = await User.findById(auth);
    const teacher = new Teacher({ id: auth });
    user.isTeacher = true;
    await user.save();
    await teacher.save();
    res.json(teacher);
  } catch (err) {
    res.json("Error occured", err);
  }
};

// Forming a new Student
module.exports.upDateStudent = async (req, res, next) => {
  const { auth } = req.query; // User ID
  const { id } = req.params; // Course ID which is going to buy
  const st = await Student.findOne({ id: auth });
  const course = await Course.findById(id);
  const owner = course.owner;
  const teacher = await Teacher.findOne({ id: owner });

  if (st) {
    st.myLearnings.push(id);
    await st.save();
    course.students.push(auth);
    res.json("Student Updated");
    if (!teacher.students.includes(auth)) {
      teacher.students.push(auth);
    }
  } else {
    const st = new Student({ id: auth });
    st.myLearnings.push(id);
    course.students.push(auth);
    teacher.students.push(auth);
    await st.save();
    res.json("New User Created and updated");
  }
  await teacher.save();
  await course.save();
};

module.exports.validatemeeting = async (req, res, next) => {
  try {
    const { teacher } = req.query;
    const { date, time_start, time_to } = req.body;

    // Check if any existing class for the teacher overlaps with the new class
    const conflictingClass = await Schedule.findOne({
      teacher,
      date,
      $or: [
        {
          // New class starts during an existing class
          time_start: { $lt: time_to, $gte: time_start },
        },
        {
          // New class ends during an existing class
          time_to: { $gt: time_start, $lte: time_to },
        },
        {
          // New class completely overlaps an existing class
          time_start: { $lte: time_start },
          time_to: { $gte: time_to },
        },
      ],
    });

    if (conflictingClass) {
      return res.json(
          "You are Having Already scheduled class in this time",
      );
    }

    next(); // No conflicts, proceed to the scheduling logic
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: "Error checking for schedule conflicts",
    });
  }
};
// Replace with the correct path to your Schedule model
