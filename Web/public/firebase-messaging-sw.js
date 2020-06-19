importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

const config =  { 
    apiKey: "AIzaSyDaeJwtorHi3g-ytqU9bn5cjFhKO-2kbIE",
    authDomain: "maptest3-b3603.firebaseapp.com",
    databaseURL: "https://maptest3-b3603.firebaseio.com",
    projectId: "maptest3-b3603",
    storageBucket: "maptest3-b3603.appspot.com",
    messagingSenderId: "676243801867",
    appId: "1:676243801867:web:6f42292da369edb204c40e",
    measurementId: "G-DPDEPVDBG7"
}; 
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	const title  =  payload.notification.title;
	const options  = {
		body: payload.notification.body,
	};
	return self.registration.showNotification(title, options);
})