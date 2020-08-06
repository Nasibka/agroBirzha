const router = require('express').Router();
const url = require('url');
let Category = require('../models/category.model');
router.route('/').get((req,res)=>{
    Category.find({ parent: /^\/$/}, function (err, docs) {
        res.json(docs)
        })
})
router.route('/*').get((req,res)=>{
    var path = url.parse(req.url).pathname;
    path = path.slice(1);
    if(path.split('/').length<3){
    Category.find({ parent: new RegExp('^/' + path+'$' )}, function (err, docs) {
        res.json(docs)
        })
    }else{
    Category.findOne({ category: new RegExp('^/' + path+'$' )}, function (err, docs) {
        res.json(docs)
        })
    }
})
router.route('/addCategory').post((req,res)=>{
    const name = req.body.name;
    const category = req.body.category;
    const parent = req.body.parent
    const newCategory = new Category({name,parent,category})
            newCategory.save()
            .then(()=>res.json('category added'))
            .catch(err=>res.status(400).json('Error '+err))
})
// router.route('/addSubCategory').post((req,res)=>{
//     const name = req.body.name;
//     const category = req.body.categoryPath;
//     const parent = req.body.parentPath
//     const newCategory = new Category({name,parent,category})
//             newCategory.save()
//             .then(()=>res.json('category added'))
//             .catch(err=>res.status(400).json('Error '+err))
// })

module.exports = router