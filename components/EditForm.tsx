
"use client";

import React from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import { FieldGroup, FieldLabel,Field, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Employee } from "@/types/Employees";

const EditForm = ({employee}: {employee: Employee}) => {
    const formik = useFormik<Employee>({
        initialValues: {
            id: employee.id,
            fullname: employee.fullname,
            position: employee.position,
            age: String(employee.age),
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Required"),
            position: Yup.string().required("Required"),
            age: Yup.number().required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className="w-100">
            <form onSubmit={formik.handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                        <Input 
                            id="fullname"
                            name="fullname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullname}
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <FieldError>{formik.errors.fullname}</FieldError>
                        ) : null}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="position">Position</FieldLabel>
                        <Input 
                            id="position"
                            name="position"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.position}
                        />
                        {formik.touched.position && formik.errors.position ? (
                            <FieldError>{formik.errors.position}</FieldError>
                        ) : null}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="age">Age</FieldLabel>
                        <Input 
                            id="age"
                            name="age"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.age}
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <FieldError>{formik.errors.age}</FieldError>
                        ) : null}
                    </Field>
                </FieldGroup>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default EditForm;