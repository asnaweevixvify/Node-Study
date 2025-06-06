const myModule = require('./modules/myModules.js')
const now = require('./modules/myModules.js').getCurrentTime

console.log(now());

console.log(myModule.add(5,10));

// อ่านไฟล์แบบ blocking (synchonus)
// fs.readFileSync("ตำแหน่งไฟล์" , "utf-8")
const fs = require('fs')
const data = fs.readFileSync('./myFiles/input.txt','utf-8')
console.log(data);
console.log("จบการทำงาน");

// เขียนไฟล์แบบ blocking
// fs.writeFileSync("ตำแหน่งที่จะสร้างไฟล์ใหม่",ค่าที่่จะเขียน)
const outputText =  `hello world \n ${data} \n ข้อมูลนี้ถูกเขียนเมื่อ ${now()}` //\n คือเว้นบรรทัด
fs.writeFileSync('./myFiles/output.txt',outputText) //สร้างไฟล์ใหม่ชื่อ output.text
console.log("เขียนไฟล์เรียบร้อย");

// อ่านไฟล์แบบ non-blocking (asynchonus)
// fs.readFile("ตำแหน่งไฟล์" , "utf-8" , callback)

// เขียนไฟล์แบบ non-blocking
// fs.writeFile("ตำแหน่งที่จะสร้างไฟล์ใหม่",ค่าที่่จะเขียน,callback)
// err คือข้อผิดพลากจากการอ่านไฟล์
// data คือค่าที่เก็บจากการอ่านไฟล์
fs.readFile('./myFiles/inputA.txt',"utf-8",(err,data)=>{
    if(err){
        return console.log("เกิดข้อผิดพลาด".err);
    }
    console.log(data);
    const textA = `${data} \n hello async`
    if(data){
        fs.writeFile('./myFiles/outputA.txt',textA,err=>{
            if(err){
                return console.log("เกิดข้อผิดพลาด".err);
            }
            else{
                "เขียนไฟล์เรียบร้อย"
            }
        })
    }
})