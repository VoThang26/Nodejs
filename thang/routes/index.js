var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
 
// ket noi du lieu
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employees',
  password: '123456',
  port: 5432,
})
 
/* GET home page. */
router.get('/', function(req, res, next) {

  pool.query('SELECT * FROM employees ORDER BY id ASC', (err, dulieu) => {
  res.render('index', { title: 'Express', data:dulieu.rows });
  })
});

// them du lieu - get
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Add Product' });
});
// them du lieu - post
router.post('/them', function(req, res, next) {
  // lay du lieu
  var name_pro = req.body.name_pro , price_pro = req.body.price_pro, my_img = req.body.my_img;
  pool.query('INSERT INTO  employees (name_pro,price_pro,my_img) VALUES ($1,$2,$3)',[name_pro,price_pro,my_img], (err, res) => {  })
  res.render('them', { title: 'Add Product' });
});
// xem du lieu
router.get('/xem', function(req, res, next) {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (err, dulieu) => {
    res.render('xem',{ title: 'Product View', data:dulieu.rows});

  })
});

// xoa du lieu
router.get('/xoa/:id', function(req, res, next) {
  var idcanxoa = req.params.id;
  pool.query('DELETE FROM employees WHERE id = $1',[idcanxoa], (err, dulieu) => {

    res.redirect("/xem")
  })
});

// sua du lieu-get
router.get('/sua/:id', function(req, res, next) {
  var idcanxoa = req.params.id;
  pool.query('SELECT * FROM employees WHERE id = $1 ',[idcanxoa], (err, dulieu) => { 
    res.render('sua',{ title: 'Product Repair',data:dulieu.rows });
  })
});
// sua du lieu - post
router.post('/sua/:id', function(req, res, next) {
  var idcanxoa = req.params.id;
  var name_pro = req.body.name_pro , price_pro = req.body.price_pro, my_img = req.body.my_img;
  pool.query('UPDATE employees SET name_pro = $1, price_pro = $2, my_img = $3 WHERE id = $4 ',[name_pro,price_pro,my_img,idcanxoa], (err, res) => {  })
  res.redirect("/xem");
});
//xem chi tiet san pham
router.get('/detailsProduct/:id', function(req, res, next) {
  var idcanxoa = req.params.id;
  pool.query('SELECT * FROM employees WHERE id = $1 ',[idcanxoa], (err, dulieu) => { 
    res.render('detailsProduct',{ title: 'Detail Product',data:dulieu.rows });
  })
});

module.exports = router;
