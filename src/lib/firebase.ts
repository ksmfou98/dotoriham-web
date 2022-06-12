/* eslint-disable no-alert */
import { getMessaging, getToken } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyBQ2hhmKBy2S00dMIl1XTnGQbzKasSbVwY",
  authDomain: "dotoriham-dfee3.firebaseapp.com",
  projectId: "dotoriham-dfee3",
  storageBucket: "dotoriham-dfee3.appspot.com",
  messagingSenderId: "1055811077974",
  appId: "1:1055811077974:web:08286bc1990346256cb8f7",
  measurementId: "G-BZE4CWPKM3",
};

export const getFCMToken = async (): Promise<string> => {
  const messaging = getMessaging();
  return getToken(messaging, {
    vapidKey:
      "BB4rW8tHZBgipv_-mPt-l9HLoab-J05S_vWQSfMveQt6ua9kCvvN-LuBwIEH5wWWo1KAKTJq58rg4AeFu8_anEc",
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      }
      return "";
    })
    .catch(() => {
      return "";
    });
};
