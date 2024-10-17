import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";

import JobController from "./src/controllers/job.Controller.js";
import UserController from "./src/controllers/user.controller.js";

import { auth } from "./src/middlewares/auth.middleware.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import { sendApplicationEmail } from "./src/middlewares/sendMail.middleware.js";

const app = express();

// Middleware Configuration
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Partition: Middleware Configuration End

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Partition: View Engine Setup End

// Custom Middleware
app.use(setLastVisit);

// Partition: Custom Middleware End

const jobController = new JobController();
const userController = new UserController();

// Job Routes
app.get("/", jobController.renderHomePage);
app.get("/jobs", jobController.fetchAllJobs);
app.get("/createJob", jobController.renderCreateJobPage);
app.post("/createJob", auth, jobController.handleCreateJob);
app.get("/job/:id", jobController.fetchJobById);
app.get("/job/update/:id", auth, jobController.renderUpdateForm);
app.post("/job/update/:id", auth, jobController.handleUpdateJob);
app.post("/job/delete/:id", auth, jobController.handleDeleteJob);

// Partition: Job Routes End

// Application Routes
app.post(
  "/apply",
  uploadFile.single("resumePath"),
  sendApplicationEmail,
  jobController.applyToJob
);
app.get("/job/applicants/:id", jobController.fetchApplicantsByJobId);
app.get("/job/:jobId/applicant/:applicantId", jobController.getResume);

// Partition: Application Routes End

// Auth Routes
app.post("/register", userController.registerUser);
app.get("/login", userController.renderLoginForm);
app.post("/login", setLastVisit, userController.loginUser);
app.get("/logout", userController.logoutUser);

// Partition: Auth Routes End

// Additional task search Functionality
app.get("/error", jobController.renderError);
app.get("/searchjob", jobController.fetchFilteredJobs);

// Start Server
app.listen(3500, () => {
  console.log("Server is listening on port " + 3500);
});

// Partition: Server Setup End
