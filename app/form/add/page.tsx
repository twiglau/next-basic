"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addEmployee } from "@/utils/actions";


const AddFormPage = () => {
    const [state, action, isPending] = React.useActionState(addEmployee,undefined);
    return (
        <div>
            <h1>Add Form Page</h1>
            <form className="container flex flex-col gap-4" action={action}>
                <Input name="fullname" placeholder="Full Name" />
                <Input name="position" placeholder="Position" />
                <Input name="age" placeholder="Age" />
                <Button type="submit" disabled={isPending}>Submit</Button>
            </form>
            <div>
                {state?.success && <p className="text-blue-500">{state.message}</p>}
                {!state?.success && <p className="text-red-500">{state?.message}</p>}
            </div>
        </div>
    );
};

export default AddFormPage;