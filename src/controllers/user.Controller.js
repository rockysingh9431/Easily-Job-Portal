import UserModel from "../models/user.Model.js";
import JobModel from "../models/job.Model.js";

export default class UserController {
  // Handles the login process for a user
  loginUser(req, res) {
    const { email, password } = req.body; // Extract email and password from request body

    // Check if the user exists and the password matches
    const user = UserModel.getUser(email, password);
    if (!user) {
      // If user is not found or password doesn't match, redirect to login with an error message
      return res.redirect({ errors: ["Invalid Credentials"] }, "/login");
    }

    // If user is authenticated, save user info in session
    req.session.user = user;

    // Fetch all jobs to display on the jobs page
    const jobs = JobModel.getAllJobs();

    // Render the jobs page with the list of jobs and user info
    res.redirect("jobs");
  }

  // Renders the login form
  renderLoginForm(req, res) {
    // Render login page and pass user info from session (if any)

    res.render("login", {
      user: req.session.user,
      errors: req.validationErrors,
    });
  }

  // Handles user logout process
  logoutUser(req, res) {
    req.session.destroy(() => {
      // Destroy the session and redirect to home page
      res.clearCookie("lastVisit");
      res.redirect("/");
    });
  }

  // Handles user registration process
  registerUser(req, res) {
    const { name, email, password } = req.body; // Extract user details from request body

    // Check if a user with the provided email already exists
    const existingUser = UserModel.getUser(email);
    if (!existingUser) {
      // If the user does not exist, add the new user
      UserModel.addUser(name, email, password);
    }

    // Redirect to login page after registration
    res.redirect("/login");
  }
}
