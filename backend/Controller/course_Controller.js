const { query } = require("express");
const Courses = require("../Models/courses");
const Class = require("../Models/Classroom");
const User = require("../Models/user");
module.exports.fetchCourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate("owner");
    res.json(courses);
  } catch (e) {
    console.log("Error ", e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.createCourse = async (req, res) => {
  try {
    const { auth } = req.query;
    let course = new Courses(req.body);
    course.owner = auth;
    await course.save();
    res.status(200).send("Course Saved Successfully");
  } catch (e) {
    console.log("Error received", e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getCourse = async (req, res) => {
  try {
    let { id } = req.params;
    let course = await Courses.findById(id);
    res.json(course);
  } catch (e) {
    console.log("Error ", e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.editCourse = async (req, res) => {
  try {
    let { id } = req.params;
    await Courses.findByIdAndUpdate(id, req.body);
    res.status(200).send("Updated Successfully");
  } catch (e) {
    console.log("Error", e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteCourse = async (req, res) => {
  try {
    let { id } = req.params;
    await Courses.findByIdAndDelete(id);
    res.status(200).send("Course Deleted Successfully");
  } catch (e) {
    console.log("Error", e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.dashCourses = async (req, res) => {
  try {
    const { auth } = req.query;
    const course = await Courses.find({ owner: auth }).populate("students");
    // const userr = await User.findById("6745f49d7c1101608bff5526");
    res.json(course);
  } catch (err) {
    res.json(err);
  }
};

//!

module.exports.getTeacherDashboardData = async (req, res) => {
  try {
    const { teacherId } = req.body; // Get teacher ID from the request body

    // Fetch classes for the teacher
    const classes = await Class.find({ teacher: teacherId })
      .populate("course")
      .populate("teacher");

    // Fetch courses owned by the teacher
    const courses = await Courses.find({ owner: teacherId }).populate(
      "students"
    );

    // Calculate statistics
    const totalStudents = new Set(); // To avoid counting duplicate students
    const totalClasses = classes.length;

    courses.forEach((course) => {
      course.students.forEach((student) =>
        totalStudents.add(student.toString())
      );
    });

    const totalCourses = courses.length;
    const totalUniqueStudents = totalStudents.size;

    // Response data structure
    res.json({
      totalStudents: totalUniqueStudents,
      totalCourses,
      totalClasses,
      classData: classes,
      courseData: courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
