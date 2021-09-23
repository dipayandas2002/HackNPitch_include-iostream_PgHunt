const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require("axios");
const sheetdb = require('sheetdb-node');

let config = {
    address: 'ieid2rcsjsktv',
};
let client = sheetdb(config);
let mess = []
let messowner;
let student;


// https://sheetdb.io/api/v1/ieid2rcsjsktv




const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://dipu:dipayandas2002@cluster0.74p0f.mongodb.net/originalDB", { useNewUrlParser: true, useUnifiedTopology: true });
const newSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    countryCode: String,
    phone: String,
    jobtitle: String,
    password: String,
    passwordConfirmation: String

})
const Form = new mongoose.model('Form', newSchema);

const app = express();

app.listen(process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    res.render("intro")
})

app.get('/login', function (req, res) {
    res.render("login",{issues :null});


})

app.get('/register', function (req, res) {
    res.render("register", { issue: "" });


})

app.post('/register', (req, res) => {
    // console.log(req.body);

    if (req.body.password === req.body.passwordConfirmation) {

        bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
            //    console.log(hash); //hashed password
            let newperson = new Form({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                countryCode: req.body.countryCode,
                phone: req.body.phone,
                jobtitle: req.body.jobtitle,
                password: hash,
                passwordConfirmation: req.body.passwordConfirmation
            })

            newperson.save();
        });
        // res.send("akdm ok ache");
        res.render("login",{issues : null})
    }
    else {
        res.render("register", { issue: "passwords are not same" })
    }
})


app.post("/login", (req, res) => {

    Form.findOne({ email: req.body.email }, (err, data) => {
        if (data !== null) {
            // console.log(data);
            bcrypt.compare(req.body.password, data.password).then(function (result) {
                if (result === true) {
                    //    res.send(data) //rendering the data
                    // console.log(mess);

                    if (data.jobtitle === "messowner") {
                        messowner = data.email;
                        client.read({
                            limit: 1,
                            search: { 'Email': data.email },
                        }).then(function (data1) {

                            // console.log(data1.length);


                            if (data1.length === 2) {

                                // res.send("no pg")
                                client.create({ Email:messowner , Name : data.firstname+" "+data.lastname}).then(function(data) {
                                    // console.log(data);
                                  }, function(err){
                                    console.log(err);
                                  });
                                res.redirect("/addpg")
                            }
                            else {

                                let json = JSON.parse(data1)
                                res.render("profile", {
                                    fname: data.firstname, lname: data.lastname, email: data.email, phonenumber: data.phone, element: json[0]

                                })
                                messowner = data.email;
                                // console.log(json);
                                // messdata = data1;
                            }
                        }, function (err) {
                            console.log(err);
                        });
                        // console.log(messdata)
                    }
                    else {
                        axios.get('https://sheetdb.io/api/v1/ieid2rcsjsktv')
                            .then(function (response) {
                                //   console.log(response.data);
                                mess = response.data;
                                student = data;
                                res.render("index", { mess: mess, sname: student.firstname + " " + student.lastname, semail: student.email, snumber: student.phone })
                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                            })
                    }
                }
                else{ res.render("login",{issues :"Wrong Password"}) }
            });

        }
        // else res.send("no user exists")
       else{ res.render("login",{issues :" No user Exists"}) }
        // JSAlert.alert("Your files have been saved successfully.", "Files Saved", "Got it");
        // console.log(data);
    })

})


app.post("/index", (req, res) => {

    axios.get('https://sheetdb.io/api/v1/ieid2rcsjsktv')
        .then(function (response) {
            //   console.log(response.data);
            mess = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    // console.log(req.body);
    let { gender, parking, food, occupancy } = req.body

    let newfilter = mess.filter((element, index) => {
        let { Gender, Parking, Food, Occupancy } = element



        if ((food === "none" || food === Food) && (gender === "none" || gender === Gender) && (parking === "none" || parking === Parking) && (occupancy === "none" || occupancy === Occupancy)) {
            return true;
        };


    });

    if (req.body.sort === "price") {
        newfilter.sort((a, b) => {
            return a.Price - b.Price;
        });
    }
    else if (req.body.sort === "rating") {
        newfilter.sort((a, b) => {
            return a.Rating - b.Rating;
        });
    }

    // res.send(req.body)
    res.render('index', { mess: newfilter, sname: student.firstname + " " + student.lastname, semail: student.email, snumber: student.phone })

})


app.post("/messowner", (req, res) => {
    // console.log(req.body);

    let { Description, Location, Highlight, Food, Gender, Occupancy, Parking, Notice, Distance, Availability, Eastablished, Deposit, Price, Contact } = req.body

    let array = ["Description", "Location", "Highlight", "Food", "Gender", "Occupancy", "Parking", "Notice", "Distance","Availability", "Eastablished", "Deposit", "Price", "Contact"]

    let arraydata = [Description, Location, Highlight, Food, Gender, Occupancy, Parking, Notice, Distance,Availability, Eastablished, Deposit, Price, Contact]

    // let object = {
    //     id: '',
    //     Name: '',
    //     Highlight: '',
    //     Location: '',
    //     Contact: '',
    //     Gender: '',
    //     Occupancy: '',
    //     Description: '',
    //     Distance: '',
    //     Rating: '',
    //     Price: '',
    //     Images: '',
    //     Deposit: '',
    //     Notice: '',
    //     Food: '',
    //     Parking: '',
    //     Eastablished: ''
    // }
    let object1 = {}
    for (let i = 0; i < array.length; i++) {
        if (arraydata[i] !== "") {

            object1[array[i]] = arraydata[i]
        }

    }
    // console.log(object1);

    client.update(
        'Email', // column name
        messowner, // value to search for
         object1 // object with updates
        
      ).then(function(data) {
        // console.log(data);
        res.redirect("/messowner")
      }, function(err){
        console.log(err);
      });
})


app.get("/messowner", (req, res) => {
    client.read({
        limit: 1,
        search: { 'Email': messowner },
    }).then(function (data2) {

        let json1 = [{
            id: '',
            Name: '',
            Highlight: '',
            Location: '',
            Contact: '',
            Gender: '',
            Occupancy: '',
            Description: '',
            Distance: '',
            Rating: '',
            Price: '',
            Images: '',
            Deposit: '',
            Notice: '',
            Food: '',
            Parking: '',
            Eastablished: ''
        }];

        json1 = JSON.parse(data2)
        res.render("profile", {
            fname: json1[0].Name, lname: "", email: messowner, phonenumber: json1[0].Contact, element: json1[0]

        })
        // messowner = data.firstname;
        // console.log(json1);
        // messdata = data1;
    }, function (err) {
        console.log(err);
    });
})


app.get("/addpg", (req, res) => {
    Form.findOne({email : messowner},(err , data)=>{

        res.render("addpg", { fname:data.firstname, lname: data.lastname, email: messowner, phonenumber: data.phone, element: "" })
    })
})

