import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleAuthSchema, signupSchema } from "../schemas/auth.schema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function Signup() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validateData = signupSchema.safeParse({ username, email, password });

    if (!validateData.success) {
      console.error("Validation failed:", validateData.error);
      return;
    }

    // BE call to signup endpoint with validateData.data
    try {

      const res = await axios.post(`${backendUrl}/auth/signup`, validateData.data, { withCredentials: true });
      if (res.status === 200) {
        navigate("/features");
      }
      console.log("Signup successful:", res.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential received from Google");
      return;
    }
    console.log("Sending google auth request with data:", jwtDecode(credentialResponse.credential));
    const validateData = googleAuthSchema.safeParse({
      credential: credentialResponse.credential,
    });

    if (!validateData.success) {
      console.error("Validation failed:", validateData.error);
      return;
    }

    // BE call to Google auth endpoint with validateData.data
    // credential true for cookies to be set from BE response
    try {
    
      const res = await axios.post(`${backendUrl}/auth/google`, validateData.data, { withCredentials: true });
      if (res.status === 200) {
        navigate("/features");
      }
      console.log("Google auth successful:", res.data);
    } catch (error) {
      console.error("Google auth failed:", error);  
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account?
            </a>
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) =>
      
              handleGoogleLogin(credentialResponse)
            }
            onError={() => {
              console.log("Login Failed");
            }}
            text="continue_with"
          />
        </div>
      </form>
    </div>
  );
}
