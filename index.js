
const express = require('express');
const  app = express();
const bodyParser = require('body-parser');
const firebase= require("firebase");

app.use(bodyParser.urlencoded({ extended: true })); 

// session setup
var expressSession = require('express-session');
app.set('port', process.env.PORT || 1142);
// Initialize Firebase
var config = {
  apiKey: "AIzaSyABfpbd-dGQ97txyD37v98jZAkr0Dj8Qic",
  authDomain: "issuetracker-cf5ed.firebaseapp.com",
  databaseURL: "https://issuetracker-cf5ed.firebaseio.com",
  projectId: "issuetracker-cf5ed",
  storageBucket: "issuetracker-cf5ed.appspot.com",
  messagingSenderId: "363562248700"
};
firebase.initializeApp(config);

var cookieParser = require('cookie-parser');
// must use cookieParser before expressSession
app.use(cookieParser());

app.use(expressSession({secret:'smilesh2o24Andela'}));
// set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));


//define route
app.post('/setsession', function(req,res){
		req.session.uid= req.body.uid;
		console.log('tst' + req.body.uid)
		req.session.save();
		let Userref = firebase.database().ref('ist/user');
		Userref.orderByChild("uid").equalTo(req.body.uid).once("value", function(snapshot) {
			if (snapshot){
				var value = snapshot.val();
				var keys = Object.keys(value);
				var userinfo =value[keys[0]];
				req.session.uname =userinfo.name;
				req.session.save();
				if (userinfo.role) {
	          req.session.department =userinfo.departments;
	          req.session.save();
	          //console.log(req.session);
	          if (req.session.department){
	          	res.send('success');
	          }
	          
	          console.log('after' + req.session.department);
	       } else{
	       	 res.send('success');
	       	}
				}
			
			//console.log(value[keys[0]].name);
			//res.render('openissue');
   });
  
});

app.get('/signout', function(req,res) {
		req.session.destroy();
		res.render('signin');
});
app.get('/signin', function(req,res){
	res.render('signin');
});

app.get('/signup', function(req,res){
	res.render('signup');
});
/**
var checksession=function(req, res, next){
	if(req.session.uid) return next();
		res.redirect('/signin');
}
**/
//check for user session
app.use(function(req,res,next){
	if(req.session.uid)  return next();
	console.log('uid' + req.session.uid);
	res.redirect('/signin');
});



app.get('/reportissue', function(req,res){
	if(req.session.department) {
		res.render('reportissue',{ layout: 'admin' ,'uid' : req.session.uid,'uname' :req.session.uname});
	} else {
		res.render('reportissue',{'uid' : req.session.uid,'uname' :req.session.uname});
	}
	
});

app.get('/profile', function(req,res){
	let Userref = firebase.database().ref('ist/user'),
			email,
			name,
			department,
			phone;
	Userref.orderByChild("uid").equalTo(req.session.uid).once("value", function(snapshot) {
      snapshot.forEach(function(data) {
        //console.log(data.val());
        email =data.val().email;
        name =data.val().name,
				department =(data.val().departments) ? data.val().departments : '' ,
				phone =(data.val().phone) ? data.val().phone : '' ;
				if(req.session.department) {
					res.render('profile',{ layout: 'admin' ,'uid' : req.session.uid,'name' :name,'department': department,'email' :email,'phone':phone});
				} else {
					res.render('profile',{'uid' : req.session.uid,'name' :name,'department': department,'email' :email,'phone':phone});
				}
				
      });
  });
  //console.log(email + '-' +	name + '-' +department + '-' +phone);
	//res.render('profile',{'uid' : req.session.uid,'name' :name,'department': department,'email' :email,'phone':phone});
});

app.get('/myqueue',function(req,res){
	if(req.session.department) {
		res.render('myqueue',{ layout: 'admin' ,'uid' : req.session.uid,'uname' :req.session.uname});
	} else {
		res.render('myqueue',{'uid' : req.session.uid,'uname' :req.session.uname});
	}
});

app.get('/myreport',function(req,res){
	if(req.session.department) {
		res.render('myreport',{ layout: 'admin' ,'uid' : req.session.uid,'uname' :req.session.uname});
	} else {
		res.render('myreport',{'uid' : req.session.uid,'uname' :req.session.uname});
	}
});

app.get('/',function(req,res){
	if(req.session.department) {
		res.render('myreport',{ layout: 'admin' ,'uid' : req.session.uid,'uname' :req.session.uname});
	} else {
		res.render('myreport',{'uid' : req.session.uid,'uname' :req.session.uname});
	}
});

var adminOnly=function(req, res, next){
	if(req.session.uid  && req.session.department) return next();

		//
		next('route');
}
app.get('/openissue',adminOnly, function(req,res){
	res.render('openissue',{ layout: 'admin','uid' : req.session.uid,'uname' :req.session.uname,'department':req.session.department});
});

app.get('/closeissue',adminOnly, function(req,res){
	res.render('closeissue',{ layout: 'admin' ,'uid' : req.session.uid,'uname' :req.session.uname,'department':req.session.department});
});



//email handle
const nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		auth: {
			user: "okorocelestine@gmail.com",
			pass: "smilesh2o"
		}
	});

//sms api
/** used nexmo, having whitelist error
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'b97aa1b5',
  apiSecret: 'a0536d3ec5721682'
});
**/
var Jusibe = require('jusibe');
var jusibe = new Jusibe("3e6c952a3ed703277c13ab9248fba485","d21ba021e2ab25139b7ff622d3b0b62a");
//var jusibe = new Jusibe("b033fe3cf30d7873f208a767d26054c0", "4e07476fa37923e1980b51f05b94747b");
app.post('/notify', function(req, res){


	let key =req.body.issueid,
			subject,
			notifymeans,
			notifyvalue,
			note;
	let Issueref = firebase.database().ref('ist/issue').child(key);
  Issueref.once('value', function(snapshot) {
		if( snapshot.val() != null ) {
			subject =snapshot.val().subject;
			note =snapshot.val().comment;
			notifymeans =snapshot.val().sendernotificationmeans;
			notifyvalue=snapshot.val().notificationvalue;

			if (notifymeans == 'email') {
				res.render('mail/notifymail',	{ layout: null, subject: subject ,note : note},
					function(err,html){
						if( err ) console.log('error in email template');

							mailTransport.sendMail({
									from: '"Issue Tracker ": okorocelestine@gmail.com',
									to: notifyvalue,
									subject: 'Your issue has been resolved',
									html: html,
									generateTextFromHtml: true
								}, function(err){
									if(err) console.error('Unable to send confirmation: '+ err.stack);
						});
					}
				);
			} else if (notifymeans == 'phone') {
				console.log(notifyvalue);
				let text = 'IST notification >> Your issue has been resolved.' +
									' SUBJECT : '+ subject 
									+ ' NOTE : ' + note;
				console.log(text);
				/** nexmo whitelist erro
				nexmo.message.sendSms(2348066112787, 2348027313450, text, {type: 'unicode'},
		    	(err, responseData) => {if (responseData) {console.log(responseData)}}
		  	);
				**/
				var payload = {
			    to: notifyvalue,
			    from: 'Issue Tracker',
			    message: text
			  };
			  console.log(payload);
			  jusibe.sendSMS(payload, function (err, res) {
			    if (res.statusCode === 200) {
			      console.log(res.body);
			    } else {
			      console.log(err);
			    }

			  });
			}

	  }
	});
	res.send('success');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('505');
});


app.listen(app.get('port'),function() {
    console.log('Issue Tracker running at  http://localhost:' + app.get('port'));
});