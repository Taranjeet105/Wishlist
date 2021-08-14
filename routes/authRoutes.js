const express=require('express')
const mongoose = require('mongoose')
const router=express.Router()
const User=mongoose.model('User')
const Wish=mongoose.model('Wishes')

router.get("/",(req,res)=>{        
  // sending html  files
    Wish.find({}).then(item=>{
        console.log(item)
        res.render("home",{data:item})
    }).catch(err=>{
        res.send(err)
    })
      // __dirname=something../routes dirctor of auth routes
})


router.post("/signup",(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    const user=new User({email,password})
    user.save()
    res.send('hello there')
})

router.get('/profile/:id',(req,res)=>{
     
    res.send("user id is "+req.params.id)
})

router.get('/about',(req,res)=>{
    
    res.render("about")
})

router.post('/wishlist',(req,res)=>{
    const userWish=req.body.wish
    console.log(userWish)
    const  wish=new Wish({wish:userWish})
    wish.save()
   
})

router.delete('/delete/:id',(req,res)=>{

  Wish.findOneAndRemove({wish:req.params.id}).then(item=>{
      console.log("deleted")
      res.send(item)
  }).catch(err=>{
      res.send(err)
  })

})


module.exports=router