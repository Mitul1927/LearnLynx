const express=require('express');
const paymentController=require('../Controller/paymentController.js');
const sendMail=require('../mail.js')
const router=express.Router();
const {newInstructor,paymentVerification,upDateStudent} =require('../middleware.js');


router.route('/checkout').post(paymentController.checkOut);

router.post('/paymentverification/:id',paymentVerification,upDateStudent,sendMail.courseMail);

router.post('/teacherVerification',paymentVerification,newInstructor,sendMail.teacherMail);

module.exports=router;

