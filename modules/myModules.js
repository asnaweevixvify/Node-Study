// สร้าง module ให้บริการเกี่ยวกับการทำงานต่างๆในโปรเจค 
// สร้าง และ export module เพื่อให้ไฟล์อื่นๆสามารถใช้งานฟังก์ชั่นนี้ได้

function getCurrentTime(){
    return new Date()
}

function add(x,y){
    return x+y
}

// ส่งออกคำสั่ง modules.exports.ตั้งชื่อโมดูล = ชื่อฟังก์ชั่น
module.exports.getCurrentTime = getCurrentTime
module.exports.add = add