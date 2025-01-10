const nodemailer = require("nodemailer");
const User=require('./Models/user.js');
const Course=require('./Models/courses.js');


module.exports.greetMail = (req, res) => {
  const { username, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "learnlynx9@gmail.com", // Your Gmail address
      pass: "iklv jzwv gfrs tbgl", // Your Gmail password or App Password
    },
  });

  // Setup email data
  const mailOptions = {
    from: "learnlynx9@gmail.com", // Sender's address
    to: `${email}`, // List of receivers
    subject: "Welcome To LearnLynx", // Subject line
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to LearnLynx</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to LearnLynx, ${username}!</h1>
        </div>
        <div class="content">
            <p>Dear ${username},</p>
            <p>Welcome to <strong>LearnLynx</strong>!</p>
            <p>We are thrilled to have you join our community of learners and innovators. At LearnLynx, our mission is to provide you with top-notch resources and tools to enhance your skills and achieve your goals.</p>
            <p>Here’s a quick overview of what you can expect:</p>
            <ul>
                <li><strong>Personalized Learning:</strong> Tailor your learning journey with our diverse range of courses and resources.</li>
                <li><strong>Interactive Platform:</strong> Engage with our interactive tools and features to make your learning experience effective and enjoyable.</li>
                <li><strong>Supportive Community:</strong> Connect with fellow learners and experts to exchange ideas and get support whenever needed.</li>
            </ul>
            <p>To get started, you can log in to your account using the following link:</p>
            <a href="[Login URL]" class="button">Log In</a>
            <p>If you have any questions or need assistance, our support team is here to help. Just reply to this email or visit our <a href="[Support Page URL]">Support Page</a>.</p>
            <p>Thank you for choosing LearnLynx. We look forward to supporting you on your learning journey!</p>
        </div>
        <div class="footer">
            <p>Best Regards,</p>
            <p>The LearnLynx Team<br>
        </div>
    </div>
</body>
</html>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    res.json("User Created Successfully");
  });
};

module.exports.courseMail = async(req, res) => {
    const {auth}=req.query;
    const user =await User.findById(auth);
    const id=req.params.id;
    const course=await Course.findById(id);
    console.log(id);
    console.log(auth)
    
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "learnlynx9@gmail.com", // Your Gmail address
        pass: "iklv jzwv gfrs tbgl", // Your Gmail password or App Password
      },
    });
  
    // Setup email data
    const mailOptions = {
      from: "learnlynx9@gmail.com", // Sender's address
      to: `${user.email}`, // List of receivers
      subject: "Welcome To LearnLynx", // Subject line
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Purchase</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #007bff;
      margin: 0;
    }
    .content {
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 0.9em;
      color: #666;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase!</h1>
    </div>
    <div class="content">
      <p>Dear Love,</p>
      <p>Thank you for purchasing the ${course.title}! We are excited to have you on board and look forward to helping you achieve your learning goals.</p>
      <p>Your course access details are as follows:</p>
      <p>If you have any questions or need assistance, please feel free to contact us at learnlynx9@gmail.com.</p>
      <p>Best regards,<br>The LearnLynx Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 LearnLynx. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      res.json("Course Succesully buyed");
    });
};

module.exports.teacherMail = async(req, res) => {
    const {auth}=req.query;
    const user =await User.findById(auth);
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "learnlynx9@gmail.com", // Your Gmail address
        pass: "iklv jzwv gfrs tbgl", // Your Gmail password or App Password
      },
    });
  
    // Setup email data
    const mailOptions = {
      from: "learnlynx9@gmail.com", // Sender's address
      to: `${user.email}`, // List of receivers
      subject: "Welcome To LearnLynx", // Subject line
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to [LMS Name]</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #007bff;
      margin: 0;
    }
    .content {
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 0.9em;
      color: #666;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to LearnLynx!</h1>
    </div>
    <div class="content">
      <p>Dear ${user.username},</p>
      <p>Thank you for registering as a teacher on LearnLynx! We are excited to have you join our platform and look forward to supporting you in delivering an exceptional learning experience.</p>
      <p>Here are a few things to get you started:</p>
      <p>If you need any assistance or have questions, feel free to reach out to our support team at learnlynx9@gmail.com.</p>
      <p>We are here to help you succeed!</p>
      <p>Best regards,<br>The LearnLynx Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 LearnLynx. All rights reserved.</p>
      <p><a href="[Unsubscribe Link]">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      res.json("Course Succesully buyed");
    });
};






module.exports.classScheduleMail = async (req, res) => {
  try {
    const { course } = req.query;
    const { date, time_start, time_to } = req.body;

    // Fetch course details
    const response = await Course.findById(course)
      .populate("owner students")
      .exec();

    if (!response) {
      return res.json({ error: "Course not found" });
    }

    const studentEmails = response.students.map((student) => student.email).join(",");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "learnlynx9@gmail.com", // Your Gmail address
        pass: "iklv jzwv gfrs tbgl", // Your Gmail App Password
      },
    });

    const mailOptions = {
      from: "learnlynx9@gmail.com", // Sender's address
      bcc: studentEmails, // List of receivers
      subject: "Class Scheduled - LearnLynx", // Subject line
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Class Scheduled Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: #007bff;
      color: #fff;
      padding: 15px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      margin-top: 0;
      color: #333;
    }
    .details {
      margin: 15px 0;
      padding: 15px;
      background: #f9f9f9;
      border-left: 4px solid #007bff;
    }
    .details p {
      margin: 5px 0;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #666;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Class Scheduled</h1>
    </div>
    <div class="content">
      <h2>Dear Students,</h2>
      <p>We are excited to inform you that your class has been successfully scheduled!</p>
      <div class="details">
        <p><strong>Course Name:</strong> ${response.title}</p>
        <p><strong>Scheduled By:</strong> ${response.owner.username}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time_start} - ${time_to}</p>
      </div>
      <p>Please make sure to join the class on time. If you have any questions, feel free to contact us.</p>
    </div>
    <div class="footer">
      <p>Thank you for being a part of our learning community!</p>
      <p>&copy; LearnLynx, All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`,
    };

    // Send email
   await transporter.sendMail(mailOptions);

    res.json(
     "Class schedule Successfully"
    );
  } catch (err) {
    console.error("Error scheduling class email:", err);
    res.json("Failed To Schedule Class");
  }
};


module.exports.mailOtp=async(req,res,next)=>{

  try{
  const otp= Math.floor(Math.random()*9000+100);
  const {email} = req.body
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "learnlynx9@gmail.com", // Your Gmail address
      pass: "iklv jzwv gfrs tbgl", // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: "learnlynx9@gmail.com", // Sender's address
    to: `${email}`, // List of receivers
    subject: "OTP Authorization", // Subject line
    text:`Your OTP is ${otp}`
  };
  await transporter.sendMail(mailOptions);

  res.json(otp);
  
  }
  catch(err){
    res.json("Failed to send OTP");
  }


}


