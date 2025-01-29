/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useUserLoginMutation } from "../../../api/hooks/auth/index.ts";
import { useAuth } from "../../../utils/hooks/user-auth.ts";
import { errorToast, successToast } from "../../../utils/index.ts";
import { loginInitialValues } from "../../../utils/constants/auth.ts";
import { loginSchema } from "../../../utils/validation-schemas/auth.ts";



const Login = () => {
  const details = localStorage.getItem("loginDetails");
  const navigate = useNavigate();
  const auth = useAuth();
  const { mutateAsync } = useUserLoginMutation()
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: (loginInitialValues),
    resolver: yupResolver(loginSchema),
  });


  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data)
      const { token, findUser } = response.data;
      console.log(response.data);
      
      auth?.handleLogin({ token, findUser });
      localStorage.setItem('token', token)
      successToast(response.message);
      navigate('/admin-dashboard');
    } catch (error) {

        errorToast('Wrong Email or Password.');
    }
  }

  useEffect(() => {
    setValue("email", localStorage.getItem("email"));
    setValue("password", localStorage.getItem("password"));
  }, []);

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  return (
    <div>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <Link to="/job-list" className="btn btn-primary apply-btn">
              Apply Job
            </Link>
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="/admin-dashboard">
                  <img src={Applogo} alt="Dreamguy's Technologies" />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Email Address</label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              className={`form-control ${errors?.email ? "error-input" : ""
                                }`}
                              type="text"
                              defaultValue={localStorage.getItem("email")}
                              onChange={onChange}
                              value={value}
                              autoComplete="true"
                            />
                          )}
                        />

                        <span className="text-danger">
                          {" "}
                          {errors.email?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block mb-4">
                        <div className="row">
                          <div className="col">
                            <label className="col-form-label">Password</label>
                          </div>
                          <div className="col-auto">
                            <Link className="text-muted" to="/forgot-password">
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <input
                                className={`form-control ${errors?.password ? "error-input" : ""
                                  }`}
                                type={eye ? "password" : "text"}
                                defaultValue={localStorage.getItem("password")}
                                value={value}
                                onChange={onChange}
                              />
                            )}
                          />
                          <span
                            style={{
                              position: "absolute",
                              right: "5%",
                              top: "30%",
                            }}
                            onClick={onEyeClick}
                            className={`fa-solid ${eye ? "fa-eye-slash" : "fa-eye"
                              } `}
                          />
                        </div>
                        <span className="text-danger">
                          {" "}
                          {errors.password?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block text-center">
                        <button
                          className="btn btn-primary account-btn"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="account-footer">  
                      <p>
                        Don't have an account yet?{" "}
                        <Link to="/register">Register</Link>
                      </p>
                    </div>
                  </div>
                  {/* /Account Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
