const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController.js");
const { greetMail ,mailOtp} = require("../mail.js");
const passport = require("../utils/passport.js");
const { resolveContent } = require("nodemailer/lib/shared/index.js");

router.post("/signup", userController.signUp, greetMail);

router.post("/login", userController.loginIn);
router.get("/logout", userController.logOut);
router.post("/verifyEmail",userController.verifyEmail,mailOtp);
router.post("/resetPassword",userController.resetPassword);

router.get(
  "/auth/logingoogle",
  passport.PassPort.authenticate("google", { scope: ["profile", "email"] })
);

router.route("/auth/logingoogle/callback").get(
  passport.PassPort.authenticate("google", {
    failureRedirect: "http://localhost:3000/api/failed",
  }),
  async (req, res) => {
    const user = await req.user;

    await req.logout(() => {
      console.log("Logout successfull");
    });

    res.redirect("http://localhost:3001/googlesuccess?token=" + user);
  }
);

router.route("/failed").get(function (req, res) {
  res.send("Failed to Login with Google");
});
router.route("/success").get(function (req, res) {
  res.send({ token: req.query?.token });
});

router
  .route("/verifyusergoogle")
  .get(userController.VerifyToken, userController.VerifyUsergoogle);

router.get("/verifyUser", userController.verifyUser);
router.get("/mylearning", userController.mylearning);
router.get("/mystudents", userController.myStudent);

module.exports = router;
