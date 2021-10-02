const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req, res){
     res.sendFile(__dirname + "/index.html");
 });

 app.post("/", function(req, res){

    const name = req.body.name;
    const mobile = req.body.mobile;
    const email= req.body.email;

     const data = {
         members: [
             {
                 email_address: email,
                 status: "subscribed",
                 merge_fields: {
                    FNAME: name,
                    PHONE: mobile
                 }
             }
         ]
     };
     const jsonData = JSON.stringify(data);
     const url = "https://us5.api.mailchimp.com/3.0/lists/c43bfcd4bd";
     const options = {
         method: "POST",
         auth: "alphao7:596387d1670444233800100f6978b58a-us5"
     }

     const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
     })

     request.write(jsonData);
     request.end();

 });

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is Running on Port 3000.");
});



//APIs key.
//596387d1670444233800100f6978b58a-us5

//List ID.
//c43bfcd4bd