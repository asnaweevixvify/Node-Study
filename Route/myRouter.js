//Router parameter เป็นการกำหนดพารามิเตอร์หรือตัวแปรส่งไปพร้อมกับ path ใช้เครื่องหมาย : กำกับไว้หน้าพารามิเตอร์ เช่น product/:catagory:id 
// การรับค่า request.params["ชื่อ"] หรือ request.params.ชื่อ
//req.params.ชื่อparameter จะเก็บค่า parameter ไว้
//redirect เปลี่ยนเส้นทางการแสดงผลให้ เช่น เมื่อยังไม่ล็อคอิน หรือ ระบุ path ผิด ให้เปลี่ยนการแสดงผลไปหน้าอื่นให้
// res.redirect("path")

const express = require('express')
const path  = require('path')

const router = express.Router()

const indexPage = path.join(__dirname,'../templates/index.html')  // ใช้ ..  เพื่อออกจากโฟลเดอร์ Route ก่อน
const productPage1 = path.join(__dirname,'../templates/product1.html')
const productPage2 = path.join(__dirname,'../templates/product2.html')
const productPage3 = path.join(__dirname,'../templates/product3.html')


router.get('/',(req,res)=>{
    res.sendFile(indexPage)
    res.status(200)
})

router.get('/product/:id',(req,res)=>{
    const productID = req.params.id
    if(productID === '1'){
        res.sendFile(productPage1)
    }
    else if(productID === '2'){
        res.sendFile(productPage2)
    }
    else if(productID === '3'){
        res.sendFile(productPage3)
    }
    else{
       res.redirect('/')
    }
})

module.exports = router
