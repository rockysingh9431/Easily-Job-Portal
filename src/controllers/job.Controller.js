import JobModel from "../models/job.Model.js";

export default class JobController {
  // Render Home Page
  renderHomePage = (req, res) => {
    res.render("home", { user: req.session.user, errors: undefined });
  };
  renderError = (req, res) => {
    res.render("error", { user: req.session.user });
  };

  // Render Post Job Page
  renderCreateJobPage = (req, res) => {
    console.log("hello");
    const user = req.session.user;
    if (!user) {
      res.redirect("/error");
    } else {
      res.render("createJob", { user });
    }
  };

  // Fetch and Display All Jobs with Pagination
  fetchAllJobs = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
      const jobs = JobModel.getAllJobs();
      const totalJobs = jobs.length;
      const totalPages = Math.ceil(totalJobs / pageSize);
      const offset = (page - 1) * pageSize;
      const paginatedJobs = jobs.slice(offset, offset + pageSize);

      res.render("jobs", {
        jobs: paginatedJobs,
        user: req.session.user,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(500).send("Error fetching jobs.");
    }
  };

  // Fetch and Display Job by ID
  fetchJobById = (req, res) => {
    try {
      const { id } = req.params;
      const job = JobModel.getJobById(id);
      if (!job) {
        return res.status(404).send("Job not found.");
      }
      res.render("jobDetails", {
        job,
        user: req.session.user,
        errors: undefined,
      });
    } catch (error) {
      res.status(500).send("Error fetching job details.");
    }
  };

  // Fetch and Display Applicants for a Specific Job
  fetchApplicantsByJobId = (req, res) => {
    const { id } = req.params;
    const job = JobModel.getJobById(id);
    if (!job) {
      return res.status(404).send("Job not found.");
    }
    if (req.session.user) {
      const applicants = job.applicants || [];
      res.render("applicants", { applicants, user: req.session.user, job });
    } else {
      res.redirect("/error");
    }
  };

  // Handle Job Creation
  handleCreateJob = (req, res) => {
    const jobs = JobModel.getAllJobs();

    const newJob = req.body;
    const job = {
      id: jobs.length + 1, // Auto-generate a new job ID
      category: newJob.category,
      title: newJob.title,
      location: newJob.location,
      companyname: newJob.companyname,
      salary: newJob.salary,
      applyby: newJob.applyby,
      skillsrequired: newJob.skillsrequired,
      numberofopenings: newJob.numberofopenings,
      jobposted: new Date().toLocaleString(), // Set job posted date
      applicants: [], // Initialize empty applicants array
    };
    JobModel.addJob(job);
    res.redirect("/jobs?page=1"); // Redirect to the first page of jobs
  };

  // Render Update Job Form
  renderUpdateForm(req, res) {
    const { id } = req.params;
    const job = JobModel.getJobById(id);
    res.render("updateJob", {
      job,
      user: req.session.user,
      errors: undefined,
    });
  }

  // Handle Job Update
  handleUpdateJob(req, res) {
    const { id } = req.params;
    const updatedJob = req.body;
    const job = JobModel.getJobById(id);
    if (!job) {
      return res.status(404).send("Job not found.");
    }

    // Update job fields
    job.category = updatedJob.category;
    job.title = updatedJob.title;
    job.location = updatedJob.location;
    job.companyname = updatedJob.companyname;
    job.salary = updatedJob.salary;
    job.applyby = updatedJob.applyby;
    job.skillsrequired = updatedJob.skillsrequired;
    job.numberofopenings = updatedJob.numberofopenings;

    res.render("jobDetails", {
      job,
      user: req.session.user,
      errors: undefined,
    });
  }

  // Handle Job Deletion
  handleDeleteJob(req, res) {
    const { id } = req.params;
    const job = JobModel.getJobById(id);
    if (!job) {
      return res.status(404).send("Job not found.");
    }
    JobModel.deleteJob(id);
    res.redirect("/jobs?page=1"); // Redirect to the first page of jobs after deletion
  }

  // Handle Job Application
  applyToJob(req, res) {
    const { _id, name, email, contact } = req.body;
    const resumePath = "/public/resume/" + req.file.filename; // Set the resume file path

    const applicant = {
      name,
      email,
      contact,
      resumePath,
    };

    // Add the applicant to the job
    JobModel.addApplicant(_id, applicant);
    res.redirect(`/job/${_id}`); // Redirect to job details page after applying
  }

  // Get and Display Resume PDF
  getResume = (req, res) => {
    const { jobId, applicantId } = req.params;

    // Find the job by ID
    const job = JobModel.getJobById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }

    // Find the applicant by ID within the job
    const applicant = job.applicants.find(
      (applicant) => applicant.id == applicantId
    );

    if (!applicant) {
      return res.status(404).send("Applicant not found");
    }

    // Assuming resumePath is the path to the PDF file
    const resumePath = applicant.resumePath;

    // Serve the PDF file
    res.sendFile(resumePath, { root: "." });
  };

  // Fetch Filtered Jobs with Pagination
  fetchFilteredJobs = (req, res) => {
    const { search, page = 1 } = req.query;
    const pageSize = 8;

    if (search === "") {
      return res.redirect("/jobs?page=1");
    }

    try {
      const jobs = JobModel.getAllJobs();
      const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );

      const totalJobs = filteredJobs.length;
      const totalPages = Math.ceil(totalJobs / pageSize);
      const offset = (page - 1) * pageSize;
      const paginatedJobs = filteredJobs.slice(offset, offset + pageSize);

      res.render("jobs", {
        jobs: paginatedJobs,
        user: req.session.user,
        currentPage: parseInt(page),
        totalPages,
      });
    } catch (error) {
      res.status(500).send("Error fetching jobs.");
    }
  };
}
