// mailer.js
import nodemailer from "nodemailer";

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service provider
  auth: {
    user: "ashurajpoot1103@gmail.com",
    pass: "dhhycyoyapohamzt",
  },
});

export const sendApplicationEmail = async (req, res, next) => {
  const { name, email, contact } = req.body;
  const jobId = req.body.jobId; // assuming jobId is sent in the request body

  // Define email options
  const mailOptions = {
    from: "ashurajpoot1103@gmail.com",
    to: email, // recipient's email
    subject: "Thank you for Applying",
    html: `

      <p>Thank you for applying. we will reach you soon with update</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Resume:</strong> <a href="http://localhost:3500/job/applicant/${jobId}">View Resume</a></p>
      
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email.");
  }
};
