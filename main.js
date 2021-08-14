const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')
const {mongoUrl}=require('./config/keys')
const PORT= process.env.PORT || 3000
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
    useUnifiedTopology:true
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