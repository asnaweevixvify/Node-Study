// สร้าง server ใช้ http.createServer()
// รับค่าสองค่า
// req(request) รับข้อมูลจากผู้ใช้
// req(response) ส่งข้อมูลจาก server ไปหาผู้ใช้
//response.write() เขียนผลลัพธ์ตอบหลับหาผู้ใช้ เป็นข้อความหรือ html ก็ได้
//response.end() กำหนดจุดสิ้นสุดการรับส่งข้อมูลหรือระบุการตอบกลับไปหาผู้ใช้งาน
//listen(3000,hostname) สั่งให้ web server เรื่มรันแล้วเชื่อมต่อที่ port เลข 3000
// หากมีการเปลี่ยนข้อมูล ต้องทำการ restart เพื่ออัพเดตข้อมูลใหม่
// กด ctrl+c เพื่อปิด server
//หากต้องการที่จะเปลี่ยนแปลงการทำงานแล้วไม่อยาก restart ต้องใช้ Nodemon
// npm install nodemon
// รันแอพโดนใช้ npx nodemon index.js
// ctrl c เพื่อหยุุดการทำงาน
// req.url จะได้ path ของหน้าเว็บปัจจุบัน เช่น / , /home
// writeHead ไว้สำหรับส่ง status code ไปหาผู้ใช้ เช่น res.writeHead(404) ต้องเขียนบนสุดเสมอ
// หากต้องการ response หน้าเว็บ html ไปหาผู้ใช้ ต้องใช้ fs.readFile มาเพื่อโชว์หน้าเว็บ
// __dirname คือการเข้าถึงโฟลเดอร์ด้านนอก คือโฟลเดอร์ที่เราทำงานอยู่ คือโฟลเดอร์ที่จัดเก็บไฟล์ index.js = NODEJS STUDY
// module url ใช้แสดง url ตามที่ผู้ใช้ส่ง request มา

const http = require('http')
const fs = require('fs')
const url = require('url')

console.log(__dirname); //D:\code\nodejs study


const indexPage = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8')
const productPage1 = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')
const productPage2 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')
const productPage3 = fs.readFileSync(`${__dirname}/templates/product3.html`,'utf-8')

const server =  http.createServer((req,res)=>{

    // req.url ผลที่ได้จะเป็น path เต็ม ของ หน้าเว็บปัจจุบัน
    const urlParse = url.parse(req.url,true) //url.parse() คือใช้ แยกข้อมูลใน URL ออกเป็นส่วน ๆ ผลที่ได้จะเป็น object
    const pathname = urlParse.pathname
    const query = urlParse.query

    //pathname จะได้เป็น path ส่วนหน้าเท่านั้น ของ หน้าเว็บปัจจุบัน
    //query.id จะได้เป็น id ที่ระบุใน path เช่น http://localhost:8080/product?id=1 แสดงว่า id=1

    if(pathname === '/' || pathname === '/home'){   
        res.write(indexPage)
    }
    else if(pathname === '/product'){
        if(query.id === '1'){ 
            res.write(productPage1)
        }
        else if(query.id === '2'){
            res.write(productPage2)
        }
        else if(query.id === '3'){
            res.write(productPage3)
        }
        else{
            res.writeHead(404)
            res.write('not found')
        }
    }
    else{
        res.writeHead(404)
        res.write('not found')
    }
    res.end()
    // หรือ res.end(สิ่งที่จะเขียน) ก็ได้
})

server.listen(8080,"localhost",()=>{
    console.log("start server in port 8080");
})

// http status code
// 200  ดำเนินการเสร็จสมบูรณ์
// 400 server ไม่เข้าใจว่า request เกี่ยวกับอะไร
// 404 หาข้อมูลที่เรียกไม่เจอ
// 500 request ถูกต้องแต่ผิดพลาดที่ server