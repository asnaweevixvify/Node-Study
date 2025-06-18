
// ใช้งาน mongoose
const mongoose = require('mongoose')

// เชื่อมไปยัง mongodb
mongoose.connect('mongodb://localhost:27017/productDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// ออกแบบ schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// สร้าง model
let Product = mongoose.model("products",productSchema)

// ส่งออก model
module.exports = Product

// ออกแบบฟังก์ชันสำหรับบันทึกข้อมูล

module.exports.saveProduct = function(model,callback){
    model.save(callback)
}