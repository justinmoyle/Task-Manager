import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";

const Login = () => {
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      toast.success("Login Successful!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="w-screen h-screen min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] relative overflow-y-auto">
      <div className="login-container max-p-4 lg:w-[calc(100%-180px)] w-[calc(100%-20px)] md:w-[calc(100%-50px)] flex max-h-screen max-sm:gap-15 sm:gap-16 gap-0 md:gap-0 flex-col md:flex-row items-center justify-around">
        {/* left side */}
        <div className="w-full h-full p-4 sm:mt-10 md:p-1 flex flex-col justify-center items-center">
          <div className="w-full h-full  md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 p-1 px-3 rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-6xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container max-sm:mt-10 md:mt-10 max-sm:w-[calc(100%-180px)] sm:w-[calc(100%-200px)] md:w-[450px] flex flex-col gap-y-8 bg-white pt-14 pb-14 justify-center"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-700 ">
                Keep all your credential safe.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <TextBox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <TextBox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full input-none outline-none"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <div className="grid grid-cols-2 w-80">
                <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                  Forget Password?
                </span>
                {/* <div className="grid grid-cols-2 gap-px">
                  <span className="text-sm text-blue-600">New Here?</span>
                  <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                    Sign Up
                  </span>
                </div> */}
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  label="Submit"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
