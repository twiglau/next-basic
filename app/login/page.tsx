"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserType } from "@/server/db";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const LoginPage = () => {
    const searchParams = useSearchParams();
    const page_type = searchParams.get("type");
    const router = useRouter();

    const formik = useFormik<Pick<UserType, "email" | "password">>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values: Pick<UserType, "email" | "password">) => {
            handleSubmit(values);
        },
    });
    const handleSubmit = async (values: Pick<UserType, "email" | "password">) => {
        if(page_type === "register"){
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if(data.error){
                alert(data.error);
            }else{
                alert("Login success");
            }
        }else{
            await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: "/dashboard",
            });
        }
    }
    const handleToggle = () => {
        if(page_type === "register"){
            router.push("/login?type=login");
        }else{
            router.push("/login?type=register");
        }
    }
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <h1 className="text-center text-2xl font-bold mb-4">{page_type === "register" ? "Register" : "Login"}</h1>
            <form className="w-md mx-auto flex flex-col gap-2" onSubmit={formik.handleSubmit}>
                <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input type="email" {...formik.getFieldProps("email")} />
                    {formik.touched.email && formik.errors.email ? (
                      <FieldError>{formik.errors.email}</FieldError>
                    ) : null}
                </Field>
                <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input type="password" {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password ? (
                        <FieldError>{formik.errors.password}</FieldError>
                    ) : null}
                </Field>
                <Field className="mt-2">
                    <Button className="w-full" type="submit">{page_type === "register" ? "Register" : "Login"}</Button>
                    <Button className="w-full" type="button" variant="outline" onClick={handleToggle}>{page_type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}</Button>
                </Field>
            </form>
        </div>
    );
};

export default LoginPage;