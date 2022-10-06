var express = require("express");
var router = express.Router();

const db = require("../models");
const News = db.news;
const Comment = db.comments;
const Op = db.Sequelize.Op;

//get komentar
router.get("add/:id", function (req, res, next) {
  let id = parseInt(req.params.id);

  News.findByPK(id)
    .then((data) => {
      res.render("addComments", {
        pageTitle: "Komentar",
        comments: data,
      });
    })

    .catch((err) => {
      res.render("newsDetail", {
        pageTitle: "Komentar",
        comments: [],
      });
    });
});

//addKomentar
// router.get("/add/:id", function (req, res, next) {
//   res.render("newDetails", { title: "Tambah Komentar" });
// });

//add Komentar
router.post("/add/:id", function (req, res, next) {
  let id = parseInt(req.params.id);

  var comments = {
    name: req.body.name,
    comment: req.body.comment,
    newsId : id,
  };
  Comment.create(comments)
    .then((addData) => {
      res.redirect("/detail/" + id);
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

module.exports = router;
