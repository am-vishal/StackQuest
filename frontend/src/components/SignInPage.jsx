import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button, FormControl } from "@mui/material";
import axios from "axios";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigator = useNavigate();

  const onSubmit = async (data) => {
    // Cookies.set("cookieName", "cookieValue", { expires: 7 });
    // const cookieValue = Cookies.get("cookieName");
    // Cookies.remove("cookieName");
    axios({
      method: "post",
      url: "http://localhost:8000/signin",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        navigator("/bookings");
      })
      .catch((error) => {
        console.log(error?.response?.data); // handle errors here
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        sx={{
          width: "50%",
          border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          padding: "2em",
          margin: "2em auto",
          boxShadow: "0 0 10px rgba(0,0,0,.2)",
          backgroundColor: "#f6f6f6",
        }}
      >
        <TextField
          fullWidth
          sx={{ margin: "2em 0" }}
          label="Email"
          name="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is invalid",
            },
          })}
          error={errors.email?.message}
        />
        <TextField
          fullWidth
          sx={{ marginBottom: "2em" }}
          label="Password"
          name="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 2,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password?.message}
        />
        <Button variant="contained" color="primary" type="submit">
          Sign In
        </Button>
      </FormControl>
    </form>
  );
};

export default SignInPage;
