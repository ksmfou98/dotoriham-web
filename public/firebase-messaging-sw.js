/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBQ2hhmKBy2S00dMIl1XTnGQbzKasSbVwY",
  authDomain: "dotoriham-dfee3.firebaseapp.com",
  projectId: "dotoriham-dfee3",
  storageBucket: "dotoriham-dfee3.appspot.com",
  messagingSenderId: "1055811077974",
  appId: "1:1055811077974:web:08286bc1990346256cb8f7",
  measurementId: "G-BZE4CWPKM3",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
