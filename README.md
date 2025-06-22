# 🧑‍💼 Employee Management System (Angular + Firebase)

This is a full-featured **Employee Management System** built using **Angular 15+**, **Angular Material**, and **Firebase (Firestore + Hosting)**. It supports adding, editing, deleting, filtering, sorting, and paginating employee records in real-time.

### 🔗 Live App: [https://employee-app-4eec9.web.app](https://employee-app-4eec9.web.app)

---

## 📦 Features

- ✅ Add, edit, and delete employees
- ✅ Auto-incrementing `employeeId`
- ✅ Firestore real-time sync
- ✅ Step-by-step form validation
- ✅ Filtering and sorting by name, ID, phone, email
- ✅ Pagination using Angular Material
- ✅ Responsive UI using Angular Material and Tailwind/Bootstrap
- ✅ Firebase Hosting

---

## 🚀 Technologies Used

- [Angular 15+](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- RxJS & Angular Reactive Forms

---

## 🛠️ Setup Instructions
npm install
ng serve

**To configure your own Firebase backend:**

-Go to Firebase Console

-Create a new project

-Enable Cloud Firestore

-Replace the firebaseConfig in src/environments/environment.ts with your own config 

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "xxxxxxx",
    appId: "1:xxxxxxxx:web:xxxxxx"
  }
};

Firebase Deployment

ng build --configuration=production
firebase deploy
