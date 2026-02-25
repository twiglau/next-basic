"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";


export default function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button 
        type="submit" 
        disabled={pending}>
           {pending && <Spinner className="mr-2" />}
           {pending ? "Submitting..." : "Submit"}
        </Button>
    )
}