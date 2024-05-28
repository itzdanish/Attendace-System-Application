const express = require("express");
const authAdmin = require("../routes/auth/admin");
const authStudent = require("../routes/auth/student");
const authFaculty = require("../routes/auth/faculty");

const error = require("../middleware/error");

const colleges = require("../routes/colleges");

const admin = require("../routes/admin");

const departments = require("../routes/departments");
const academicsYear = require("../routes/academics-year");
const semesters = require("../routes/semesters");
const divisions = require("../routes/divisions");
const batches = require("../routes/batches");

const students = require("../routes/students");
const studentCourses = require("../routes/student/courses");
const studentCourseAttendancesStatistics = require("../routes/student/course-attendance-statistics");
const studentUpcomingLectures = require("../routes/student/upcoming-lectures");
const studentTodayAttendanceStatistics = require("../routes/student/today-attendance-statistics");
const studentCurrentLecture = require("../routes/student/current-lecture");
const studentCurrentLectureStatus = require("../routes/student/current-lecture-status");
const studentTimeTable = require("../routes/student/timetable");
const studentCourseRecentAttendances = require("../routes/student/course-recent-attendance");

const activeDivisions = require("../routes/active-divisions");
const activeBatches = require("../routes/active-batches");

const faculty = require("../routes/faculty");
const facultyUpcomingLectures = require("../routes/faculty/upcoming-lectures");
const facultyCourses = require("../routes/faculty/courses");
const facultyTimeTable = require("../routes/faculty/timetable");

const course = require("../routes/course/course");
const courses = require("../routes/courses");
const courseStudents = require("../routes/course/students");

const theoryAssigns = require("../routes/theory-assigns");
const theorySessions = require("../routes/theory-sessions");
const theorySessionsConducted = require("../routes/theory-sessions-conducted");
const theoryAttendance = require("../routes/theory-attendances");
const practicalAssigns = require("../routes/practical-assigns");
const practicalSessions = require("../routes/practical-sessions");
const practicalSessionsConducted = require("../routes/practical-sessions-conducted");
const practicalAttendances = require("../routes/practical-attendances");


const locationTracker = require("../routes/location-tracker");

const cors = require("cors");

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());

    app.use("/api/admin", admin);

    app.use("/api/colleges", colleges);

    app.use("/api/departments", departments);
    app.use("/api/academics-year", academicsYear);
    app.use("/api/semesters", semesters);
    app.use("/api/divisions", divisions);
    app.use("/api/batches", batches);

    app.use("/api/students", students);
    app.use("/api/student/:roll_number/courses", studentCourses);
    app.use("/api/student/:roll_number/current-lecture", studentCurrentLecture);
    app.use("/api/student/:roll_number/current-lecture-status", studentCurrentLectureStatus);
    app.use("/api/student/:roll_number/upcoming-lectures", studentUpcomingLectures);
    app.use("/api/student/:roll_number/today-attendance-statistics", studentTodayAttendanceStatistics);
    app.use("/api/student/:roll_number/course/:course_code/attendance-statistics", studentCourseAttendancesStatistics);
    app.use("/api/student/:roll_number/course/:course_code/recent-attendances", studentCourseRecentAttendances);
    app.use("/api/student/:roll_number/timetable", studentTimeTable);

    app.use("/api/active-divisions", activeDivisions);
    app.use("/api/active-batches", activeBatches);
    app.use("/api/faculty", faculty);

    app.use("/api/faculty/:fac_id/courses", facultyCourses);
    app.use("/api/faculty/:fac_id/upcoming-lectures", facultyUpcomingLectures);
    app.use("/api/faculty/:fac_id/timetable", facultyTimeTable);

    app.use("/api/course", course);
    app.use("/api/courses", courses);
    app.use("/api/course/:course_code/students", courseStudents);

    app.use("/api/theory-assigns", theoryAssigns);
    app.use("/api/theory-sessions", theorySessions);
    app.use("/api/theory-sessions-conducted", theorySessionsConducted);
    app.use("/api/theory-attendances", theoryAttendance);
    app.use("/api/practical-assigns", practicalAssigns);
    app.use("/api/practical-sessions", practicalSessions);
    app.use("/api/practical-sessions-conducted", practicalSessionsConducted);
    app.use("/api/practical-attendances", practicalAttendances);

    app.use("/api/auth/admin", authAdmin);
    app.use("/api/auth/student", authStudent);
    app.use("/api/auth/faculty", authFaculty);


    app.use("/api/location-tracker", locationTracker);

    app.use(error);
}