var express = require('express');
var router = express.Router();


const db = require('../models');
const Product = db.products;
const User = db.users;
const Op = db.Sequelize.Op;

var bcrypt = require('bcryptjs');
const auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get all product
router.get('/product', function(req, res, next) {

  Product.findAll()
  .then(data => {
    res.render('product', { 
      title: 'Daftar Produk di Berita Saat ini',
      products: data,
     });
     //console.log(products);
  })
  
  .catch(err => {
    res.render('product', { 
      title: 'Daftar Produk',
      products: [],
     });
  })
});


  
//get detail by query id
router.get('/productdetail',auth, function(req, res, next) {
  const id = parseInt(req.query.id);

  Product.findByPk(id)
  .then(datadetail => {
    if(datadetail) {
      res.render('productdetail', { 
        title: 'Daftar Produk',
        products: datadetail,
       });

    } else {
      // http 404 not found
      res.render('productdetail', { 
        title: 'Daftar Produk',
        products: {},
       });
    }
  })
  .catch(err => {
    res.render('productdetail', { 
      title: 'Daftar Produk',
      products: {},
     });
  });
});


//detail by params
router.get('/detail/:id',auth, function(req, res, next) {
  const id = parseInt(req.params.id);

  Product.findByPk(id)
  .then(datadetail => {
    if(datadetail) {
      res.render('productdetail', { 
        title: 'Daftar Produk',
        products: datadetail,
       });

    } else {
      // http 404 not found
      res.render('productdetail', { 
        title: 'Daftar Produk',
        products: {},
       });
    }
  })
  .catch(err => {
    res.render('productdetail', { 
      title: 'Daftar Produk',
      products: {},
     });
  });
});

//addProduct
router.get('/addproduct',auth, function(req, res, next) {
  res.render('addProduct', { title: 'Tambah Product' });
});

//add products
router.post('/addproduct',auth, function(req, res, next) {
  var products = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  }
  Product.create(products)
  .then(addData => {
    res.redirect('/product')
   
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});


//delete produck
router.get('/deleteproduct/:id',auth, function(req, res, next) {
  var id = parseInt(req.params.id);

  Product.destroy({
    where: { id: id}
  })
  .then(num => {
    res.redirect('/product')
    // if(num>0) {
    //   res.redirect('/product')
    // } else {
    //   // http 404 not found
    //   res.status(404).send({
    //     message: "tidak ada ada id=" + id
    //   })
    // }
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});

//edit product
router.get('/editproduct/:id',auth, function(req, res, next) {
  const id = parseInt(req.params.id);

  Product.findByPk(id)
  .then(dataEdit => {
    if(dataEdit) {
      res.render('editProduct', { 
        title: 'EditProduk',
        products: dataEdit
      
       });

    } else {
      // http 404 not found
      res.redirect('/product')
    }
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});

router.post('/editproduct/:id',auth, function(req, res, next) {
  const id = parseInt(req.params.id);

  Product.update(req.body, {
    where: { id: id}
  })
  .then(num => {
    res.redirect('/product'); 
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    });
  });
});

//addUser
router.get('/register', function(req, res, next) {
  res.render('registerForm', { title: 'Register' });
});

//add User
router.post('/register', function(req, res, next) {
  
  var hashpass = bcrypt.hashSync(req.body.password, 10)
  var users = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashpass

  }
  User.create(users)
  .then(addData => {
    res.redirect('/login');
  })
  .catch(err => {
    res.redirect('/register');
  });
});

//login
router.get('/login', function(req, res, next) {
  res.render('loginForm', { title: 'Register' });
});
router.post('/login', function(req, res, next) {
	User.findOne({ where: { username: req.body.username } })
	.then(data => {
		console.log(loginValid);
		if(data) {
			var loginValid = bcrypt.compareSync(req.body.password, data.password);
			console.log(loginValid);
			if(loginValid) {

				// simpan session
        //console.log("req.session" + req.session)
				req.session.username = req.body.username;
				req.session.islogin = true;
        //console.log("req.session setelah diisi data:" + req.session)

				res.redirect('/product');
			}else{
				res.redirect('/login');
			}
		}else {
			res.redirect('/login');
		}
	})
	.catch(err => {
	  	res.redirect('/login');
	});	
});  

router.get('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/login');
});  

module.exports = router;
