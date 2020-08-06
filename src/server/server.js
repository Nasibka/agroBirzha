const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const fetch = require('node-fetch');
require('dotenv').config();
let Category = require('./models/category.model');
let Product = require('./models/product.model');

const app =express();
const port = process.env.port || 5000;

app.use (cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});

function getRandomInt(max,min) {
    return (Math.random() * (Math.floor(max)-Math.floor(min))+Math.floor(min)).toFixed(2);
  }
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connection is established successfully!')

    // var cdata=[]
    // fetch('https://api.binance.com/api/v3/klines?symbol=ETHEUR&interval=1m&limit=1000')
    // .then(res=>res.json())
    // .then(data=>{
    //   cdata = data.map(d=>{
    //     // console.log(d[0]/1000+" open:"+d[1]+" close:"+d[4])
    //     // console.log(new Date(d[0]))
    //     return {selectedDate:new Date(d[0]),cost:parseFloat(d[1]),volume:parseFloat(d[4])}
    //   })
    //   console.log(cdata.length)

    //   Product.findOne({"category":'/vegetables/potato/GLL'})
    //   .then(result => {
    //       if(result) {
    //           cdata.map(d=>{
    //               result.data.push(d)  
    //           })
    //           result.save()
    //               .then(()=>console.log('product updated'))
    //               .catch(err=>console.log('Error '+err))
    //       } 
    //   })
    // })
    // .catch(err=>console.log(err))

    var objects = []
    var cost=getRandomInt(1100,995)
    var time= 1595289600
    for (i = 0; i < 100; i++) {
        var volume = getRandomInt(getRandomInt(1100,995),getRandomInt(1100,995))
        const o ={
            cost:cost,
            selectedDate:new Date(time),
            volume:volume
        }
        objects.push(o)
        cost=volume
        time+=86400
    }

    //   Product.findOne({"category":'/fruits/citrus/GML'})
    //   .then(result => {
    //       if(result) {
    //           console.log('kek'+result)
    //         objects.map(d=>{
    //             result.data.push(d)  
    //         })
    //         result.save()
    //             .then(()=>console.log('product updated'))
    //             .catch(err=>console.log('Error '+err))
    //       } 
    //   })

   
    // Product.insertMany([ 
    //     { name: 'Картофель Голландский', parent: '/vegetables/potato', category: '/vegetables/potato/1' },
    //     { name: 'Картофель Молодой', parent: '/vegetables/potato', category: '/vegetables/potato/2' },
    //     { name: 'Картофель Королева Анна', parent: '/vegetables/potato', category: '/vegetables/potato/3' },

    //         // { name: 'Картофель (Костанай)', parent: '/vegetables/potato', category: '/vegetables/potato/KSN' }, 
    //         // { name: 'Картофель (Алматы)', parent: '/vegetables/potato', category: '/vegetables/potato/ALA' }, 
    //         // { name: 'Картофель (Караганда)', parent: '/vegetables/potato', category: '/vegetables/potato/KGF' },
    //         // { name: 'Помидор (Костанай)', parent: '/vegetables/tomato', category: '/vegetables/tomato/KSN' }, 
    //         // { name: 'Помидор (Алматы)', parent: '/vegetables/tomato', category: '/vegetables/tomato/ALA' }, 
    //         // { name: 'Помидор (Караганда)', parent: '/vegetables/tomato', category: '/vegetables/tomato/KGF' }, 

    //     ]).then(function(){ 
    //         console.log("Data inserted")  // Success 
    //     }).catch(function(error){ 
    //         console.log(error)      // Failure 
    //     }); 

})



// const userRoute = require('./routes/users')
const productRoute = require('./routes/products')
const categoryRoute = require('./routes/categories')
const signIn = require('./routes/signin')

// app.use('/users',userRoute)
app.use('/products',productRoute)
app.use('/categories',categoryRoute)
app.use('/users',signIn)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})