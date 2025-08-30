import React, { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import "./EnterpriseL.css";
import Magnet from "../../../components/Magnet.jsx";
import HoverBorderGradientDemo from "../../../components/HoverBorderGradientDemo";
import { theme } from "../../../theme.js";

function EnterpriseL() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const {
    currentStep,
    loading,
    error,
    successMessage,
    formData,
    setFormData,
    setError,
    clearMessages,
    sendOTP,
    registerAdmin,
    resetFlow,
    login,
  } = useAuthStore();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password");
      return;
    }

    console.log("Attempting login with:", {
      email: loginData.email,
      passwordLength: loginData.password.length,
      passwordFirstChar: loginData.password.charAt(0),
      passwordLastChar: loginData.password.charAt(
        loginData.password.length - 1
      ),
    });

    const success = await login(loginData.email.trim(), loginData.password);
    console.log("Login success result:", success);

    if (success) {
      console.log("Navigating to dashboard...");
      navigate("/enterprise/dashboard");
    } else {
      console.log("Login failed, staying on login page");
    }
  };

  const handleRegisterStep = async (e) => {
    e.preventDefault();
    clearMessages();

    if (currentStep === 1) {
      if (!formData.email) {
        setError("Please enter a valid email");
        return;
      }
      await sendOTP(formData.email.trim());
    } else if (currentStep === 2) {
      if (!formData.name || !formData.password || !formData.otp) {
        setError("Please fill in all fields");
        return;
      }
      await registerAdmin();
      const state = useAuthStore.getState();
      if (state.token) {
        navigate("/enterprise/dashboard");
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearMessages();
    resetFlow();
    setLoginData({ email: "", password: "" });
  };

  if (isLogin) {
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-black">
            Enterprise Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <div className="error-message">{error}</div>}
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base/6 font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                  disabled={loading}
                  placeholder="email@gmail.com"
                  autoComplete="email"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base/6 font-medium text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <Magnet
                padding={25}
                disabled={false}
                magnetStrength={5}
                wrapperClassName={"w-full"}
              >
                <HoverBorderGradientDemo
                  content={loading ? "Signing in..." : "Sign In"}
                />
              </Magnet>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              className="font-semibold"
              style={{ color: theme.colors.primary }}
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Registration flow
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-6 sm:py-0 lg:px-8">
      {currentStep===1 && (
      <div className=" mt-25 sm:mx-auto sm:w-full sm:max-w-sm">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}
        <h2 className="mt-5 text-center text-3xl/8 font-bold tracking-tight text-black">
          Enterprise Registration
        </h2>
        <p className="text-center pt-3 mb-3">
          Create your enterprise account - Step {currentStep} of 2
        </p>
      </div>

      )}
      {currentStep===2 && (
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}
        <h2 className="text-center text-3xl/8 font-bold tracking-tight text-black">
          Enterprise Registration
        </h2>
        <p className="text-center pt-3 ">
          Create your enterprise account - Step {currentStep} of 2
        </p>
      </div>

      )}

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegisterStep}>
          {currentStep === 1 && (
            <div>
              <label
                htmlFor="email"
                className="block text-base/6 font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData("email", e.target.value)}
                  required
                  disabled={loading}
                  placeholder="email@gmail.com"
                  autoComplete="email"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>

              <div className="flex justify-center items-center mt-3">
                <Magnet
                  padding={25}
                  disabled={false}
                  magnetStrength={5}
                  wrapperClassName={"w-full"}
                >
                  <HoverBorderGradientDemo
                    content={loading ? "Sending OTP..." : "Send OTP"}
                  />
                </Magnet>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <>
              <div className="marginremove">
                <label
                  htmlFor="email"
                  className="block text-base/6 font-medium text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="reg-email-display"
                    value={formData.email}
                    onChange={(e) => setFormData("email", e.target.value)}
                    required
                    disabled={loading}
                    placeholder="email@gmail.com"
                    className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="marginremove">
                <label
                  htmlFor="name"
                  className="block text-base/6 font-medium text-black"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData("name", e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter your full name"
                    className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="marginremove">
                <label
                  htmlFor="password"
                  className="block text-base/6 font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="reg-password-display"
                    value={formData.password}
                    onChange={(e) => setFormData("password", e.target.value)}
                    required
                    disabled={loading}
                    placeholder="********"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="block text-base/6 font-medium text-black"
                >
                  OTP
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    value={formData.otp}
                    onChange={(e) => setFormData("otp", e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter the OTP sent to your email"
                    className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center mt-3">

                  <Magnet
                    padding={1}
                    disabled={false}
                    magnetStrength={10}
                    wrapperClassName={"w-full"}
                  >
                    <HoverBorderGradientDemo
                      content="Create Account"
                    />
                  </Magnet>
                  <Magnet
                    padding={1}
                    disabled={false}
                    magnetStrength={10}
                    wrapperClassName={"w-full"}
                  >
                    <div className="w-60 " onClick={resetFlow}>
                      <HoverBorderGradientDemo content="Back to Email" />
                    </div>
                  </Magnet>

              </div>
            </>
          )}
        </form>

        <p className="mt-5 text-center text-sm/6 text-gray-400">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleMode();
            }}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
            style={{ color: theme.colors.primary }}
          >
            Signin
          </a>
        </p>
      </div>
    </div>
  );
}

export default EnterpriseL;