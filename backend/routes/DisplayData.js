const express=require("express")
const router=express.Router()

router.post('/foodData',(req,res)=>{
    try {
        console.log([global.collection1])
        res.send([global.collection1,global.foodCateg])
    } catch (error) {
        console.error(error.message)
        console.log("server error")
    }
})
module.exports=router