const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");
const app = express();

const https = require("https");

app.use(express.static("public"));//it is just for the static fle just like the .css file and public is folder name that we have to add

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eml = req.body.email;

  const data = {
  members: [
    {
      email_address:eml,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jSONData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/1f7f311e06";

const options = {

  method: "POST" ,
  auth:"sachin1:52f6d8a996fe756f0628603b7408e120-us14"
}

const request = https.request(url,options,function(response){

  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else
  {
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jSONData);
request.end();

});

app.post("/failure",function(req,res){

  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});



// API KEY  52f6d8a996fe756f0628603b7408e120-us14

//list id  1f7f311e06.
