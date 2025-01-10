const express = require("express");
const router = express.Router();
const {postNotice,getNotice} = require("../Controller/NoticeController");

router.post("/postNotice",postNotice);
router.get("/getNotice",getNotice);




module.exports = router;