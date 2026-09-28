import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setMessage("Account created successfully!");

        if (onLogin) {
          onLogin(userCredential.user);
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        setMessage("Login successful!");

        if (onLogin) {
          onLogin(userCredential.user);
        }
      }
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered. Please login.");
      } else if (error.code === "auth/invalid-credential") {
        setMessage("Invalid email or password.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Password must be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Unable to complete the request. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h1>

        <p>
          {isRegistering
            ? "Create your AI Diet Planner account"
            : "Login to your AI Diet Planner account"}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isRegistering ? "Create Account" : "Login"}
          </button>
        </form>

        {message && <p>{message}</p>}

        <button
            type="button"
            className="auth-switch-button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage("");
            }}
          >
          {isRegistering
            ? "Already have an account? Login"
            : "New user? Create an account"}
        </button>
      </div>
    </div>
  );
}

export default Login;