import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'
import nodemailer from 'nodemailer';
var app = express();
var jsonParser = bodyParser.json()


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions))
app.post('/sendEmail', jsonParser , async (req, res) => {
    try {
        var message = req.body.message;
        var name = req.body.name;

        var date = new Date(Date.now()).toDateString()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'merisrnn@gmail.com',
              pass: process.env.PASSWORD
            }
          });
          
          var mailOptions = {
            from: 'merisrnn@gmail.com',
            to: 'meri.saarinen@protonmail.com',
            subject: `Website message sent at ${date}`,
            text: `Message sent through merisaarinen.tech website. \nSent by: ${name? name:"No name."} \nMessage: ${message}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(400).json({ status: 400, message: `Something went wrong. ${err}` });
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.sendStatus(200);
    } catch (err) {
        res.status(400).json({ status: 400, message: `Something went wrong. ${err}` });
    }
});

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});