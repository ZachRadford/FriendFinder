

// require("../routing/apiRoutes.js")
// require("../routing/htmlroutes.js")

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



var guessppl = {
		'kickingass@gmail.com':{
            name: 'Duke Nukem',
            email: 'kickingass@gmail.com',
            picture: 'http://duke.a-13.net/boxart.jpg',
            answers: {
                question1: "1",
                question2: "3",
                question3: "5",
                question4: "1",
                question5: "3",
                question6: "1",
                question7: "1",
                question8: "1",
                question9: "3",
                question10: "5"
            }
        }, 
        'MGS2@gmail.com': {
            name: 'Raiden',
            email: 'MGS2@gmail.com',
            picture: 'http://moarpowah.com/wp-content/uploads/2013/03/MGS2-TRAVIS-6.jpg',
            answers: {
                question1: "2",
                question2: "5",
                question3: "2",
                question4: "5",
                question5: "5",
                question6: "2",
                question7: "2",
                question8: "1",
                question9: "2",
                question10: "3"
            }
        }, 
        'heylisten@gmail.com': {
            name: 'Navi',
            email: 'heylisten@gmail.com',
            picture: 'http://cdn-www.cracked.com/articleimages/wong/annoyingg/navi.jpg',
            answers: {
                question1: "3",
                question2: "1",
                question3: "1",
                question4: "4",
                question5: "5",
                question6: "3",
                question7: "5",
                question8: "1",
                question9: "3",
                question10: "5"
            }
        }
    }

//display homepage on root
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});


//display survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});



app.get("/api/new", function(req, res){
	res.json(guessppl)
	// console.log(guessppl)
})



app.post("/api/new", function(req, res) {
  var newUser = req.body;

  guessppl[newUser.email] = newUser;
  
  // console.log(guessppl)
  var bestFriend = compareUsers(guessppl, newUser)

  //find bestfirend object
  res.json(guessppl[bestFriend])



});



function compareUsers(guessppl, newUser){
	var compMap = {}
	Object.keys(guessppl).forEach(function(email){
		if (newUser.email === email){
			return;
		}
		console.log(newUser.answers, "newuser.answers")

		var total = 0

		//This can be done with .reduce, explain this to me
		var compArr = Object.keys(newUser.answers).map(function(questionName){
			
			var threeve = parseInt(newUser.answers[questionName]) - parseInt(guessppl[email].answers[questionName])

			threeve = Math.abs(threeve)
			
			return threeve;
		});

		compArr.forEach(function(num){
			total += num
		})

		compMap[email] = total
	})
	
	var lowestNum = 666
	var bestFriend 
	Object.keys(compMap).forEach(function(email){
		if (compMap[email] < lowestNum){
			lowestNum = compMap[email]
			bestFriend = email
		}
	})
	
	return bestFriend;
}


