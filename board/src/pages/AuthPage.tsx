import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import API from "../config/axiosConfig";
import toast from "react-hot-toast";

const AuthPage = () => {
  // console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const navigate = useNavigate();
  const handleSuccess = async (response: any) => {
    const token = response.credential;

    try {
      const user = await API.post(`/auth/google`, { token });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      toast.error("can not log in");
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3A7EB5] via-[#9EB5E6] to-[#A5A6D3]  px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center space-y-6">
        <h2 className="text-3xl font-semibold">Login to WhatWatch</h2>
        <p className="text-sm">Continue with your Google account</p>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Error")}
          useOneTap
        />
      </div>
    </div>
  );
};

export default AuthPage;
