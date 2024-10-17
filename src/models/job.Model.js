export default class JobModel {
  // Retrieve all jobs
  static getAllJobs() {
    return jobs;
  }

  // Retrieve a job by its ID
  static getJobById(jobId) {
    return jobs.find((job) => job.id === parseInt(jobId));
  }

  // Add a new job to the list
  static addJob(job) {
    jobs.push(job);
  }

  // Delete a job by its ID
  static deleteJob(id) {
    const index = jobs.findIndex((job) => job.id === parseInt(id));
    if (index !== -1) {
      jobs.splice(index, 1);
    }
  }

  // Add an applicant to a job
  static addApplicant(id, applicant) {
    const job = jobs.find((job) => job.id === parseInt(id));
    if (!job) {
      throw new Error("Job not found.");
    }

    const newApplicant = {
      id: job.applicants.length + 1, // Auto-generate a new applicant ID
      name: applicant.name,
      email: applicant.email,
      contact: applicant.contact,
      resumePath: applicant.resumePath,
    };

    job.applicants.push(newApplicant);
  }

  // Placeholder for future functionality
  static getApplicant(id) {
    // Implementation needed
  }
}

// Initial job data
const jobs = [
  {
    id: 1,
    category: "Software Development Engineer (SDE)",
    title: "Frontend Developer",
    location: "San Francisco, CA",
    companyname: "Tech Solutions Inc.",
    salary: "$110,000 - $130,000",
    applyby: "2024-09-15",
    skillsrequired: ["JavaScript", "React", "HTML", "CSS"],
    numberofopenings: 3,
    jobposted: "8/24/2024, 7:26:18 PM",
    applicants: [
      {
        name: "John Doe",
        id: 101,
        email: "john.doe@example.com",
        contact: "123-456-7890",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
      {
        name: "Jane Smith",
        id: 102,
        email: "jane.smith@example.com",
        contact: "098-765-4321",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 2,
    category: "Software Development Engineer (SDE)",
    title: "Backend Developer",
    location: "New York, NY",
    companyname: "DataWorks",
    salary: "$100,000 - $120,000",
    applyby: "2024-09-30",
    skillsrequired: ["Node.js", "Express", "MongoDB", "REST APIs"],
    numberofopenings: 2,
    jobposted: "8/23/2024, 4:15:10 PM",
    applicants: [
      {
        name: "Emily Clark",
        id: 103,
        email: "emily.clark@example.com",
        contact: "321-654-9870",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 3,
    category: "Software Development Engineer (SDE)",
    title: "Full Stack Developer",
    location: "Los Angeles, CA",
    companyname: "Creative Media",
    salary: "$120,000 - $140,000",
    applyby: "2024-09-25",
    skillsrequired: ["JavaScript", "Node.js", "React", "SQL"],
    numberofopenings: 1,
    jobposted: "8/22/2024, 9:00:00 AM",
    applicants: [
      {
        name: "Michael Brown",
        id: 104,
        email: "michael.brown@example.com",
        contact: "987-654-3210",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
      {
        name: "Sarah Johnson",
        id: 105,
        email: "sarah.johnson@example.com",
        contact: "456-789-0123",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 4,
    category: "Software Development Engineer (SDE)",
    title: "Mobile App Developer",
    location: "Chicago, IL",
    companyname: "Appify Corp.",
    salary: "$105,000 - $125,000",
    applyby: "2024-10-01",
    skillsrequired: ["Kotlin", "Swift", "Flutter", "Firebase"],
    numberofopenings: 1,
    jobposted: "8/21/2024, 3:30:45 PM",
    applicants: [
      {
        name: "Lisa White",
        id: 106,
        email: "lisa.white@example.com",
        contact: "654-321-0987",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 5,
    category: "Software Development Engineer (SDE)",
    title: "DevOps Engineer",
    location: "Boston, MA",
    companyname: "DeploySys LLC",
    salary: "$115,000 - $135,000",
    applyby: "2024-09-20",
    skillsrequired: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    numberofopenings: 2,
    jobposted: "8/20/2024, 8:45:00 AM",
    applicants: [
      {
        name: "Tom Wilson",
        id: 107,
        email: "tom.wilson@example.com",
        contact: "789-012-3456",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 6,
    category: "Software Development Engineer (SDE)",
    title: "Frontend Developer",
    location: "Dallas, TX",
    companyname: "Global Tech",
    salary: "$110,000 - $130,000",
    applyby: "2024-09-10",
    skillsrequired: ["JavaScript", "Angular", "CSS", "HTML"],
    numberofopenings: 4,
    jobposted: "8/19/2024, 2:55:10 PM",
    applicants: [
      {
        name: "Nancy Davis",
        id: 108,
        email: "nancy.davis@example.com",
        contact: "890-123-4567",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
      {
        name: "Steve Harris",
        id: 109,
        email: "steve.harris@example.com",
        contact: "901-234-5678",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 7,
    category: "Software Development Engineer (SDE)",
    title: "Cloud Engineer",
    location: "Houston, TX",
    companyname: "Cloudify Solutions",
    salary: "$120,000 - $140,000",
    applyby: "2024-09-05",
    skillsrequired: ["Azure", "Terraform", "Python", "Networking"],
    numberofopenings: 1,
    jobposted: "8/18/2024, 1:30:00 PM",
    applicants: [
      {
        name: "Mark Anderson",
        id: 110,
        email: "mark.anderson@example.com",
        contact: "234-567-8901",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 8,
    category: "Software Development Engineer (SDE)",
    title: "Machine Learning Engineer",
    location: "Seattle, WA",
    companyname: "AI Innovations",
    salary: "$130,000 - $150,000",
    applyby: "2024-10-05",
    skillsrequired: ["Python", "TensorFlow", "Scikit-learn", "Data Analysis"],
    numberofopenings: 5,
    jobposted: "8/17/2024, 4:45:18 PM",
    applicants: [
      {
        name: "Mark Thompson",
        id: 111,
        email: "mark.thompson@example.com",
        contact: "345-678-9012",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
      {
        name: "Lisa White",
        id: 112,
        email: "lisa.white@example.com",
        contact: "456-789-0123",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 9,
    category: "Software Development Engineer (SDE)",
    title: "Software Architect",
    location: "Miami, FL",
    companyname: "Innovate Tech",
    salary: "$140,000 - $160,000",
    applyby: "2024-09-15",
    skillsrequired: [
      "Java",
      "Microservices",
      "Architecture Design",
      "Spring Boot",
    ],
    numberofopenings: 3,
    jobposted: "8/16/2024, 11:15:00 AM",
    applicants: [
      {
        name: "Mark Robinson",
        id: 113,
        email: "mark.robinson@example.com",
        contact: "567-890-1234",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
      {
        name: "Emily Clark",
        id: 114,
        email: "emily.clark@example.com",
        contact: "678-901-2345",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
  {
    id: 10,
    category: "Software Development Engineer (SDE)",
    title: "Backend Developer",
    location: "Orlando, FL",
    companyname: "CodeCraft",
    salary: "$115,000 - $135,000",
    applyby: "2024-09-20",
    skillsrequired: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
    numberofopenings: 2,
    jobposted: "8/15/2024, 8:00:00 AM",
    applicants: [
      {
        name: "Mark Lewis",
        id: 115,
        email: "mark.lewis@example.com",
        contact: "789-012-3456",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
      {
        name: "Nancy Taylor",
        id: 116,
        email: "nancy.taylor@example.com",
        contact: "890-123-4567",
        resumePath: "/public/resume/1724770464438-Shubham Kumar Singh.pdf",
      },
    ],
  },
];
