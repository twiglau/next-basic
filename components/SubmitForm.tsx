"use client";


import { useActionState } from "react";
import { Input } from "./ui/input";
import { addTodo } from "@/utils/actions";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import z from "zod";

interface FormState {
    message: string
}

const todoSchema = z.string().min(2, "至少输入两个字符").max(10, "最多输入十个字符");

export default function SubmitForm() {

    const initialState:FormState = {message:"开始添加"}

    const addForm = async (prevState:FormState, formData: FormData) => {
        const todoStr = formData.get("todo") as string;
        const result = todoSchema.safeParse(todoStr);
        if (!result.success) {
            return { message: result.error.flatten().formErrors.toString() }
        }
        prevState.message = "正在添加"
        await addTodo("test", formData)
        prevState.message = "添加成功"
        return prevState
    }

    const [state, formAction, isPending] = useActionState(addForm,initialState)
    return (
        <form className="p-4" action={formAction}>
            <Input type="text" name="todo" />
            <Button>
                {isPending && <Spinner />}
                {isPending ? "Submitting..." : "Submit"}
            </Button>
            {state.message}
        </form>
    )
}