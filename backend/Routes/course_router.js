const express = require("express");
const router = express.Router();
const courseController = require("../Controller/course_Controller");
const { validateCourse } = require("../middleware.js");

router.get("/courses", courseController.fetchCourses);

router.post("/create", validateCourse, courseController.createCourse);

router.get("/course/:id", courseController.getCourse);

router.get("/dashCourses", courseController.dashCourses);

router.post("/dashboardreq", courseController.getTeacherDashboardData);

router.patch("/course/:id/edit", validateCourse, courseController.editCourse);

router.delete("/course/:id/delete", courseController.deleteCourse);

module.exports = router;
