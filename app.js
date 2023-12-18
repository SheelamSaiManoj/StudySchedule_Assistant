const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const mongoose=require("mongoose")
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://localhost:27017/timetable_app")

const studentsSchema={
    name:String,
    roll_no:String,
    section:String,
    year:String,
    interest:[String,String]
}

const Student=mongoose.model("Student",studentsSchema);

const student1=new Student({
    name:"manoj",
    roll_no:"1602-20-748-034",
    section:"CSE-AIML",
    year:"4",
    interest:["RL","NLP"]
})

const timetableSchema = new mongoose.Schema({
    day: String,
    subjects: [
      {
        subjectName:String,
        startTime: String,
        endTime: String,
      },
      {
        subjectName:String,
        startTime: String,
        endTime: String,
      },
      {
        subjectName:String,
        startTime: String,
        endTime: String,
      }
    ]
    });
    
const Timetable = mongoose.model('Timetable', timetableSchema);
    
const timetable1=new Timetable({
      day:"Monday",
      subjects: [
        {
          subjectName: "UAV",
          startTime:"9:40",
          endTime:"10:40"
          },
        {
            subjectName: "DSCC",
            startTime: "10:40",
            endTime: "11.40"
            },
        {
          subjectName:"CS",
          startTime: "11:40",
          endTime:"12.40",
        }
            
        ]
})

const timetable2=new Timetable({
    day: "Tuesday",
    subjects: [
        {
            subjectName: "RL",
            startTime:"9:40",
            endTime:"10:40"
            },
      {
          subjectName:"NLP",
          startTime:"10:40",
          endTime:"11.40"
          },
          {
        subjectName:"CS",
        startTime:"11:40",
        endTime:"12.40",
        },
          
            ]
})

const timetable3=new Timetable({
    day: "Wednesday",
    subjects: [
        {
            subjectName: "UAV",
            startTime:"9:40",
            endTime:"10:40"
            },
      {
          subjectName:"CS",
          startTime:"10:40",
          endTime:"11.40",
          },
          {
        subjectName:"NLP",
        startTime:"11:40",
        endTime:"12.40"
        },
          
            ]
})

const timetable4=new Timetable({
    day: "Thursday",
    subjects: [
        {
            subjectName: "NLP",
            startTime:"9:40",
            endTime:"10:40"
            },
      {
          subjectName:"RL",
          startTime:"10:40",
          endTime: "11.40"
        },
          {
        subjectName:"DSCC",
        startTime:"11:40",
        endTime:"12.40",
        },
          
            ]
})

const timetable5=new Timetable({
    day: "Friday",
    subjects: [
        {
            subjectName: "CS",
            startTime:"9:40",
            endTime:"10:40"
            },
      {
          subjectName:"DSCC",
          startTime:"10:40",
          endTime:"11.40",
          },
          {
        subjectName:"RL",
        startTime:"11:40",
        endTime:"12.40",
        }
          
    ]
})

const timetable6=new Timetable({
    day: "Saturday",
    subjects: [
        {
            subjectName: "NLP",
            startTime:"9:40",
            endTime:"10:40"
            },
      {
          subjectName:"RL",
          startTime:"10:40",
          endTime: "11.40"
          },
          {
        subjectName:"DSCC",
        startTime:"11:40",
        endTime:"12.40"
        },
          
            ]
})


// Timetable.insertMany([timetable1,timetable2,timetable3,timetable4,timetable5,timetable6])

// Student.insertMany([student1])

app.get("/",function(req,res){
    res.render("home")
})

app.post("/student_page",function(req,res){
    const passkey=req.body.password;

    if (passkey==="1234"){

        Student.find({}).then(function(foundPersons){
            res.render("student_page",{personsList:foundPersons})
        });
    }
    else{
        res.render("error")
    }

})


app.post("/todays_schedule",function(req,res){

    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayDayName = daysOfWeek[dayOfWeek];

    Timetable.find({}).then(function(foundTable){
        res.render("todays_schedule",{tableList:foundTable,todayDayName:todayDayName})
    });

})

app.post("/slots",function(req,res){

    res.render("slots")
})

app.post("/final_schedule",function(req,res){
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayDayName = daysOfWeek[dayOfWeek];

    Timetable.find({}).then(function(foundTable){
        res.render("final_schedule",{tableList:foundTable,todayDayName:todayDayName})
    });
})





app.listen(3000,function(req,res){
    console.log("server started!")
})


