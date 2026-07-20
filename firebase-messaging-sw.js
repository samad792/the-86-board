/* The 86 - Firebase Cloud Messaging service worker.
   Displays push notifications when the app is closed or in the
   background, and focuses/reopens the board when one is tapped.
   This file replaces the old sw.js - delete sw.js from the repo. */

importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCe1Y0C63z57hHB2iB-DA-fXXxRkaiOI5s",
  authDomain: "the-86-board.firebaseapp.com",
  projectId: "the-86-board",
  storageBucket: "the-86-board.firebasestorage.app",
  messagingSenderId: "1041988989337",
  appId: "1:1041988989337:web:1f32563c4567be0e556308"
});

// initialising messaging is enough: pushes sent with a `notification`
// payload are displayed automatically in the background
firebase.messaging();

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ("focus" in c) return c.focus();
      }
      return self.clients.openWindow("./");
    })
  );
});
