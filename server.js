const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    console.log(err);
  });
  next();
});
//app.use((req,res,next)=>{
//  res.render('maintanence.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to home page of some website'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    status:'bad',
    errorMessage:'unable to fullfill request'
  });
});
app.listen(3000,()=>{
  console.log('listining app on port 3000');
});
