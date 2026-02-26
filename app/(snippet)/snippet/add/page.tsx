"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { snippetSchema, SnippetType } from "@/prisma/validate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { trpcClientReact } from "@/utils/api";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";


export default function AddSnippetPage() {

    const {mutate: createSnippet, isPending} = trpcClientReact.snippet.create.useMutation({
        onSuccess: () => {
            redirect("/snippet")
        }
    })
    const form = useForm<SnippetType>({
        resolver: zodResolver(snippetSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const onSubmit: SubmitHandler<SnippetType> = (data) => {
        createSnippet(data)
    };
    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Add Snippet</h1>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                               <FieldLabel>Title</FieldLabel>
                               <Input 
                               {...field} 
                               id="form-add-title"
                               aria-invalid={fieldState.invalid}
                               placeholder="Enter Snippet Title"
                               autoComplete="off"
                               />
                               {fieldState.invalid && (
                                   <FieldError errors={[fieldState.error]} />
                               )}
                           </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="content"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                               <FieldLabel>Content</FieldLabel>
                               <Textarea
                               {...field} 
                               id="form-add-content"
                               aria-invalid={fieldState.invalid}
                               placeholder="Enter Snippet Content"
                               autoComplete="off"
                               />
                               {fieldState.invalid && (
                                   <FieldError errors={[fieldState.error]} />
                               )}
                           </Field>
                        )}
                    />
                </FieldGroup>
                <Button className="w-full mt-4" type="submit" disabled={isPending}>
                    {isPending && <Spinner className="mr-2" />}
                    {isPending ? "Adding..." : "Add Snippet"}
                </Button>
            </form>
        </div>
    )
}