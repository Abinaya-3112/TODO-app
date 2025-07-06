const firebaseConfig = {
  apiKey: "AIzaSyBQHKuVH6k_xFQ55VuegyQUkjVhoyBIDEg",
  authDomain: "todoapp-2586e.firebaseapp.com",
  projectId: "todoapp-2586e",
  storageBucket: "todoapp-2586e.firebasestorage.app",
  messagingSenderId: "795539002537",
  appId: "1:795539002537:web:7f676753760c30d9bb05b8",
  measurementId: "G-YP5DXLRE6C"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 1. Email/Password Login (Keep if needed)
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = 'index.html')
    .catch((error) => alert(error.message));
});

// 2. Only Google Auth (Remove Facebook & GitHub)
document.querySelector('.google-btn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => window.location.href = 'index.html')
    .catch((error) => alert(error.message));
});

// 3. Remove Facebook & GitHub buttons from HTML
//    (Delete these elements from your HTML file)

// 4. Auth State Listener (Redirect if already logged in)
auth.onAuthStateChanged((user) => {
  if (user) window.location.href = 'index.html';
});