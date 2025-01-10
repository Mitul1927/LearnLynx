const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const crypto = require("crypto");
const User = require("../Models/user");
const Teacher = require("../Models/Teacher");
const Course = require("../Models/courses");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports.checkOut = async (req, res) => {
  try {
    var options = {
      amount: Number(req.body.ammount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error('Error occurred during order creation:', err);

    // Check if err.response exists and has a status property
    const statusCode = err.response ? err.response.status : 500; // Use 500 as default if err.response is undefined
    res.status(statusCode).json({
      success: false,
      message: err.response ? err.response.data : 'An error occurred while creating the order',
    });
  }
};
module.exports.paymentVerification = async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =req.body;
  const { auth } = req.query;
  const { id } = req.params;
  const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
  if (generated_signature == razorpay_signature) {
    const user = await User.findById(auth);
    const course = await Course.findById(id);
    const owner = course.owner._id;
    const teacher = await Teacher.findOne({ id: owner });

    if (!teacher.students.includes(auth)) {
      teacher.students.push(auth);
    }
    console.log(teacher);
    console.log(teacher.id);
    user.mylearning.push(id);
    course.students.push(auth);
    await user.save();
    await course.save();
    await teacher.save();
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } else {
    res.json({
      success: false,
    });
  }
};


