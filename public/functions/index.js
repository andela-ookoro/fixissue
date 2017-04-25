var functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendNotifications = functions.database.ref('/ist/issue/').onWrite(event => {
  const snapshot = event.data;
  // Only send a notification when a message has been created.
  if (snapshot.previous.val()) {
    return;
  } 

  if (snapshot.val().status == 'Closed') {
    //get userid
    let tokenRef = firebase.database().ref('/fcmTokens');
    const reporterId = snapshot.val().raisedby;
    // get get report token
    let reporttoken;
    tokenRef.once("value", function(snapshot) {
      var value = snapshot.val();
      reporttoken =value[reporterId];  
    });

    // Notification details.
    const text = snapshot.val().comment;
    const payload = {
      notification: {
        title: ` Your ticket ${snapshot.val().subject} has been resolved`,
        body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
        icon: snapshot.val().photoUrl || '/img/Resolved.png',
        click_action: 'https://issuetrackerh20.herokuapp.com/'
      }
    };

    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(reporttoken, payload).then(response => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
             error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(allTokens.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
   });

  }
  
});
