"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { TsignupSchema, signSchema } from "../constants/ZodTypes";
import { useRouter } from "next/navigation";
import { UseDispatch, useDispatch } from "react-redux";
import { login } from "../app/state/auth/authsclice";
import { signIn } from "next-auth/react";

function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<TsignupSchema>({
    resolver: zodResolver(signSchema),
  });

  const onSUbmit: SubmitHandler<TsignupSchema> = async (data) => {
    const { confirmPassword, ...withoutconfirmPassword } = data;
    const res = await axios.post("/api/register", withoutconfirmPassword);

    console.log(res);
    const user = res.data.user;

    if (res) {
      const loginUser = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: withoutconfirmPassword.password,
      });
      if (!loginUser?.ok) {
        console.log("something went wrong");
        return;
      }

      dispatch(login(user));
    }

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSUbmit)}>
      <input type="text" {...register("name")} placeholder="enter name" />
      <input type="text" {...register("email")} placeholder="enter email" />
      <input
        type="text"
        {...register("password")}
        placeholder="enter password"
      />
      <input
        type="text"
        {...register("confirmPassword")}
        placeholder="enter confirm Passoword"
      />
      <button>click</button>
    </form>
  );
}

export default SignupForm;
