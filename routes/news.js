var express = require("express");
var router = express.Router();

const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");
const auth = require("../auth");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//get all news
// router.get("/", function (req, res, next) {
//   News.findAll()
//     .then((data) => {
//       res.render("news", {
//         title: "Daftar Berita Saat ini",
//         news: data,
//       });
//     })
//     .catch((err) => {
//       res.render("news", {
//         title: "Daftar Berita Saat ini",
//         news: [],
//       });
//     });
// });

//get all news
router.get("/", function (req, res, next) {
  News.findAll()
    .then((data) => {
      res.render("news", {
        title: "Daftar Berita Saat ini",
        news: data,
      });
    })

    .catch((err) => {
      res.render("news", {
        title: "Daftar Berita Saat ini",
        news: [],
      });
    });
});

// //get detail by query id
// router.get('/detail', function(req, res, next) {
//   const id = parseInt(req.query.id);

//   News.findByPk(id)
//   .then(datadetail => {
//     if(datadetail) {
//       res.render('newsDetail', {
//         title: 'Berita Saat ini',
//         news: datadetail,
//        });

//     } else {
//       // http 404 not found
//       res.render('newsDetail', {
//         title: 'Berita Saat ini',
//         news: {},
//        });
//     }
//   })
//   .catch(err => {
//     res.render('newsDetail', {
//       title: 'Berita Saat ini',
//       news: {},
//      });
//   });
// });

//detail by params
router.get("/detail/:id", function (req, res, next) {
  const id = parseInt(req.params.id);

  News.findByPk(id)
    .then((datadetail) => {
      if (datadetail) {
        res.render("newsDetail", {
          title: "Berita Saat ini",
          news: datadetail,
        });
      } else {
        // http 404 not found
        res.render("newsDetail", {
          title: "Daftar Produk",
          news: {},
        });
      }
    })
    .catch((err) => {
      res.render("newsDetail", {
        title: "Daftar Produk",
        news: {},
      });
    });
});

//add Berita

router.get("/addnews", auth, function (req, res, next) {
  res.render("addNews", {
    pageTitle: 'Tambah Berita',
    path: 'addnews',
    editing: false,
    hasError: false,
    errorMessage: null,
    // validationErrors: []
  });
});

//add Berita
router.post("/addnews", auth, function (req, res, next) {
  var news = {
    title: req.body.title,
    image: req.file,
    berita: req.body.berita,
  };
  console.log("news image: " + news.image)
  if (!news.image) {
    return res.status(422).render("addNews", {
      pageTitle: 'Tambah Berita',
      path: 'addnews',
      editing: false,
      hasError: true,
      news : {
        title: req.body.title,
        berita: req.body.berita,
      },
      errorMessage: 'file yang dikirim bukan gambar, harus format png/jpeg/jpg',
      // validationErrors: []
    });
  }
  var image = news.image.path
  var image2 = image.replace(/\\/g, "/")

  news = {
    title: req.body.title,
    image: image2,
    berita: req.body.berita,
  };
  News.create(news)
    .then((addData) => {

      res.redirect("/");
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

// //delete berita
// router.get('/deleteberita/:id', function(req, res, next) {
//   var id = parseInt(req.params.id);

//   News.destroy({
//     where: { id: id}
//   })
//   .then(num => {
//     res.redirect('/')
//     // if(num>0) {
//     //   res.redirect('/')
//     // } else {
//     //   // http 404 not found
//     //   res.status(404).send({
//     //     message: "tidak ada ada id=" + id
//     //   })
//     // }
//   })
//   .catch(err => {
//     res.json({
//       info: "Error",
//       message: err.message
//     });
//   });
// });

//edit berita
router.get("/editnews/:id", function (req, res, next) {
  const id = parseInt(req.params.id);

  News.findByPk(id)
    .then((dataEdit) => {
      if (dataEdit) {
        res.render("editNews", {
          title: "Edit Berita",
          news: dataEdit,
        });
      } else {
        // http 404 not found
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

router.post("/editnews/:id", function (req, res, next) {
  const id = parseInt(req.params.id);

  News.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

module.exports = router;
