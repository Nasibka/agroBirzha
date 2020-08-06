const router = require('express').Router();
const url = require('url');
let Product = require('../models/product.model');
router.route('/').get((req,res)=>{
    Product.find()
    .then(products=>res.json(products))
    .catch(err=>res.status(400).json('Error '+err))
})
router.route('/*').get((req,res)=>{
    var path = url.parse(req.url).pathname;
    path = path.slice(1);
    Product.find({ category: new RegExp('^/' + path )}, function (err, docs) {
        res.json(docs)
        })
})

router.route('/add').post((req,res)=>{
    const code = req.body.code;
    const name = req.body.name;
    const data = req.body.data;
    const category = req.body.category;
    //for update:
    Product.findOne({"category":category})
    .then(result => {
        if(result) {
            result.data.push(data)
            result.save()
            .then(()=>res.json('product updated'))
            .catch(err=>res.status(400).json('Error '+err))
        } 
        //if there is no product with code in database
        else {
            const newProduct = new Product({code,name,data,category})
            newProduct.save()
            .then(()=>res.json('product added'))
            .catch(err=>res.status(400).json('Error '+err))
        }
    })
})
module.exports = router