//Router parameter เป็นการกำหนดพารามิเตอร์หรือตัวแปรส่งไปพร้อมกับ path ใช้เครื่องหมาย : กำกับไว้หน้าพารามิเตอร์ เช่น product/:catagory:id 
// การรับค่า request.params["ชื่อ"] หรือ request.params.ชื่อ
//req.params.ชื่อparameter จะเก็บค่า parameter ไว้
//redirect เปลี่ยนเส้นทางการแสดงผลให้ เช่น เมื่อยังไม่ล็อคอิน หรือ ระบุ path ผิด ให้เปลี่ยนการแสดงผลไปหน้าอื่นให้
// res.redirect("path")
// static file เช่น ไฟล์ html ไฟล์ รูป วิดิโอ  ถ้าโปรเจคใหญ่จะเก็บไว้ในโฟลเดอร์ public
//ส่งข้อมูลไป template res.render('index.ejs',{props:value})
//การแสดงผล <%= ชื่อ props %>
//<%-ชื่อ props %> ส่ง html
// if =>  <% if(condition){%><%}%>
//else => <% }else{%>
//lopp for =>  <%for(i=1,i<10,i++){%><%}%>
//index in products ใน for loop หมายถึงนำค่า index ของ array products มาใช้ในการทำซ้ำ

const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    const name = "asnawee" 
    const age = 14
    const products = ["เสื้อ","พัดลม","หูฟัง","คีย์บอร์ด"]
    const productsObj = [
    {name:"laptop",price:22500,image:"images/products/product1.png"},
    {name:"shirt",price:2000,image:"images/products/product2.png"},
    {name:"earphone",price:30000,image:"images/products/product3.png"}] 

    res.render('index.ejs',{name:name,age:age,products:products,productsObj:productsObj})
})

router.get('/addform',(req,res)=>{
    res.render('form.ejs')
})
router.get('/manage',(req,res)=>{
    res.render('manage.ejs')
})
router.post('/insert',(req,res)=>{
    console.log(req.body); // จะได้ object ที่เก็บข้อมูลจากฟอร์ม
    res.render('form.ejs')
})

module.exports = router
