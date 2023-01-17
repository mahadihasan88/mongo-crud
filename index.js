const express=require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId=require('mongodb').ObjectId;

const app=express();
const port=3000;
// const username=mahadi-hasan;
// const password=mh413786;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const uri = "mongodb+srv://mahadi-hasan:mh413786@cluster0.2e7au1v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
  // perform actions on the collection object


app.post('/addProduct',(req,res)=>{
  const product=req.body;
  console.log(product);
  productCollection.insertOne(product)
  .then(result=> console.log("One New product Added"))
  res.redirect("/");


})


  //  app.post("/addProduct",(req,res)=>{
  //   const product=req.body;
  //   // console.log(product);
  //   productCollection.insertOne(product)
  //   .then(result =>{
  //     console.log('One Product Added');
      
  //   })
  //   res.send("successfully data send")
  //  })

///Data send from database to client

   app.get('/products',(req,res)=>{
     productCollection.find({})
      .toArray((err,documents)=>{
        res.send(documents);
      }) 
  })
  ///Get a single product from database
app.get('/product/:id',(req,res)=>{
  productCollection.find({_id:ObjectId(req.params.id)})
  .toArray((err,document)=>{
    res.send(document[0])
    
  })
 
})
///Update Information
app.patch('/update/:id',(req,res)=>{
productCollection.updateOne(
  {_id:ObjectId(req.params.id)},
  { $set:{price:req.body.price,brand:req.body.brand}
})
.then(result=>{
  res.send(result.modifiedCount>0)
})
})



  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then((result)=>{
      res.send(result.deletedCount>0);
    })

  })
 















 
  console.log("Database Connected");
  // client.close();
});


app.get('/',(req,res)=>{
    // res.send("Node Mongo application is awesome ");
    res.sendFile(__dirname + "/index.html" )
})

app.listen(port,()=>{
    console.log(`Application Running on Port ${port}`);
})