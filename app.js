const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("public"))

app.get("/",function(req,res){
    res.render("index")
})

app.post("/",function(req,res){
    const exp = req.body.exp
    const age = req.body.age
    const r_age = req.body.r_age
    const inflation = req.body.inflation
    const fireage = req.body.fireage
    const year_exp = exp*12
    const year_exp_retire = year_exp*(1+inflation)^(r_age-age)
    const lean_fire = year_exp_retire*20
    const fire = year_exp_retire*25
    const fat_fire = year_exp_retire*50
    const coast_fire = fire/(1.1)^(r_age-fireage)
    res.render("res",{lean_fire:lean_fire,fire:fire,fat_fire:fat_fire,coast_fire:coast_fire})

})
app.listen(port,function(){
    console.log("Server started on port" + port)
})