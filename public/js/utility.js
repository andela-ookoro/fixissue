 
 $(document).ready(function(){  
    window.onload = function() {
      
        setactivelink();
        showusername();
        firebasenotification();
    };
});
function gettimestamp() {
    // for IE
    if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
    }
    return Date.now();
}

function todate(timestamp1) {
    let newdate = new Date(timestamp1);
    newdate.setHours(newdate.getHours()+1);
    let dateString =newdate.toUTCString();
    return dateString.slice(0,dateString.indexOf('G'))
}
function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 3 repetitions
    var letters = {};
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 3.0 / letters[pass[i]];
        console.log(score);
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    };

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    
    return parseInt(score);
    
}

var getdept = function(uid,cb) {
    let Userref = firebase.database().ref('ist/user'),
            department;
  Userref.orderByChild('uid').equalTo(uid).on("value", function(snapshot) {
     snapshot.forEach(function(data) {
        department = data.val().departments;
      //console.log(department);
       cb(department);
    });
  });
}

var showresult =function(text) {
    //console.log("showresult");
    $("#regTitle").html("<strong>Info!</strong> " + text + ".");
    
}

var showusername = function() {
    let username = $("#uname").val();
    $("#usernamet").text(username);
}

var setactivelink = function(){
    $("li").removeClass("activelink");
        let url = window.location.toString();
        if( url.includes("myreport")) {
            $('a[href$="\myreport"]').addClass('activelink');
        }else if( url.includes("myqueue")) {
            $('a[href$="\myqueue"]').addClass('activelink');
        }else if( url.includes("reportissue")) {
            $('a[href$="\reportissue"]').addClass('activelink');
        }else if( url.includes("openissue")) {
            $('a[href$="\openissue"]').addClass('activelink');
        }else if( url.includes("closeissue")) {
            $('a[href$="\closeissue"]').addClass('activelink');
        }else if( url.includes("profile")) {
            $('a[href$="\profile"]').addClass('activelink');
        }else if( url.includes("signout")) {
            $('a[href$="\signout"]').addClass('activelink');
        }
}

var firebasenotification =function() {
  firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      // Saving the Device Token to the datastore.
      let uid= $('#uid').val();
      if (uid) {
        firebase.database().ref('/fcmTokens').child(uid)
               .set(currentToken);
      }
      
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  }).catch(function(error) {
    console.error('Unable to get permission to notify.', error);
  });
}

var saveMessagingDeviceToken = function() {
  firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      // Saving the Device Token to the datastore.
      let uid= $('#uid').val();
      if (uid) {
        firebase.database().ref('/fcmTokens').child(uid)
               .set(currentToken);
      }
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  }).catch(function(error){
    console.error('Unable to get messaging token.', error);
  });
}
var requestNotificationsPermissions = function() {
  console.log('Requesting notifications permission...');
  firebase.messaging().requestPermission().then(function() {
    // Notification permission granted.
    saveMessagingDeviceToken();
  }).catch(function(error) {
    console.error('Unable to get permission to notify.', error);
  });
}

var synnotification = function() {
  /** function to notify user and update
  var issueRef = firebase.database().ref("ist/issue");

  issueRef.on("child_added", function(data, prevChildKey) {
     var issue = data.val();
     if( issue.assignto == $('#uid').val()) {
        //$('a[href$="\myqueue"]').addClass('activelink')
     } else
     console.log("name: " + newPlayer.name);
     console.log("age: " + newPlayer.age);
     console.log("number: " + newPlayer.number);
     console.log("Previous Player: " + prevChildKey);
  });
 **/
}

