const mongoose=require('mongoose')
const schema=mongoose.Schema;
const wishSchema=schema({
    wish:String
})
mongoose.model('Wishes',wishSchema)