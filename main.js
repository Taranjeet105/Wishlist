const express=require('express')
const bodyParser=require('body-parser')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const {mongoUrl}=require('./config/keys')
const PORT= process.env.PORT || 5000
require('./models/User')  // routes will come after this, because we are using models in routes
require('./models/wishes')

const authRoutes=require('./routes/authRoutes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')  // views folder will contain ejs files which are nothing  but html
app.use(authRoutes)
app.use(express.static('public'))   // for serving static files from public folder

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(()=>{
    console.log("succes")
}).catch((e)=>{
    console.log("error in mongo db")
})

mongoose.connection.on('connected',()=>{
    console.log("mongoDB connected")
})

mongoose.connection.on('error',(err)=>{
    console.log("mongoDB not connected ",err)
})




app.listen(PORT,()=>{
    console.log("server running on PORT "+PORT)
})