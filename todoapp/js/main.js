<script type="module">
  // Import Firebase modules from CDN
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBQHKuVH6k_xFQ55VuegyQUkjVhoyBIDEg",
    authDomain: "todoapp-2586e.firebaseapp.com",
    projectId: "todoapp-2586e",
    storageBucket: "todoapp-2586e.firebasestorage.app",
    messagingSenderId: "795539002537",
    appId: "1:795539002537:web:7f676753760c30d9bb05b8",
    measurementId: "G-YP5DXLRE6C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Add Google sign-in function
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in user:", user);
      window.location.href = "index.html";
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Google sign-in failed: " + error.message);
    }
  }

  // Add logout function
  function logout() {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  }

  // Check auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user signed in");
    }
  });
  window.signInWithGoogle = signInWithGoogle;
  window.logout = logout;
</script>