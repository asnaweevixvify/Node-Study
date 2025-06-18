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
// ส่งค่าจาก form โดยใช้ method POST และกำหนด action เป็น ชื่อpathที่ต้องการ
// กำหนด name ให้กับ input แต่ละตัว
//รับค่าโดยการใช้ router.post('/pathที่ตั้งไว้',(req,res)=>{
//req.body จะได้ข้อมูลจากฟอร์ม
//เชื่อมmongodb
//mongoose.connect('mongodb://hostname:port/database',{useNewUrlParser:true,useUnifiedTopology:true}).catch(err=>console.log(err)) หากไม่พบชื่อ database จะถูกสร้างให้อัตโนมัติ
//การสร้าง schema (โครงสร้างการเก็บข้อมูล)
//mongoose.Schema({field:type,field:type})
//การสร้าง model  (ส่วนที่ใช้จัดการข้อมูล) มีลักษณะเป็น class ตั้งชื่อเป็นตัวแรกพิมใหญ่
//mongoose.model('ชื่อcollection',schema)
//เช่น let Product = mongoose.model("ชื่อcol,product")
//module.exports = Product //export ออกไปใช้งาน
// บันทึกข้อมูล let doc = new Product({field:name})
// multer ใช้สำหรับอัพโหลดไฟล์
//enctype="multipart/form-data" ใน form เป็นการตั้งค่าให้สามารถอัพโหลดไฟล์ได้

const express = require('express')
const router = express.Router()

const Product = require('../models/products')

// อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({ //เก็บไฟล์ลงในเครื่อง
    destination:function(req,file,cb){ //ตำแหน่งที่จะจัดเก็บไฟล์
        cb(null,'./public/images/products')
    },
    filename:function(req,file,cb){ //ชื่อไฟล์
        cb(null,Date.now()+".jpg") 
    }
})

const upload = multer({
    storage:storage
})


router.get('/',(req,res)=>{
    Product.find().then((doc)=>{
        res.render('index.ejs',{products:doc}) // ส่งข้อมูลไปแสดงผล
    })
})

router.get('/addform',(req,res)=>{
    res.render('form.ejs')
})

router.get('/manage',(req,res)=>{
    Product.find().then((doc)=>{
        res.render('manage.ejs',{products:doc}) // ส่งข้อมูลไปแสดงผล
    })
})
router.get('/:id',(req,res)=>{
    const productId = req.params.id
    Product.findOne({_id:productId}).then((doc)=>{ //หาสินค้าตัวที่ต้องการที่จะดู
        res.render('product.ejs',{product:doc})
    })
})

router.get('/delete/:id',(req,res)=>{
    console.log(req.params.id); // ได้ id ที่ส่งมาจากหน้า manage รับผ่านพารามิเตอร์ :id
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{ // ลบข้อมูล
        if(err){
            console.log(err);
        }
        res.redirect('/manage')
    })
})

router.post('/insert',upload.single("image"),(req,res)=>{
    console.log(req.body); // จะได้ object ที่เก็บข้อมูลจากฟอร์ม

    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    Product.saveProduct(data,(err)=>{ //ส่งข้อมูลไปทำงานในโมดูล saveproduct
        if(err){
            console.log(err);
        }
        res.redirect('/')
    })
})

router.post('/edit',(req,res)=>{
    const edit_id = req.body.product_id
    Product.findOne({_id:edit_id}).then((doc)=>{
        res.render('edit.ejs',{product:doc}) // นำข้อมูลเดิมที่ต้องการแก้ไขไปแสดงในแบบฟอร์ม
    })
})


module.exports = router
