"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { trpcClientReact, trpcPureClient } from "@/utils/api";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export default function DeleteButton(props: { id: string }) {
    const {mutate: deleteSnippet1, isPending:isLoading1} = trpcClientReact.snippet.delete.useMutation({
        onSuccess: () => {
            redirect("/snippet")
        }
    })
    const [isPending, startTransition] = useTransition();

    const deleteSnippet = () => {
        startTransition(async () => {
            await trpcPureClient.snippet.delete.mutate({ id: props.id })    
            redirect("/snippet")
        })
    }
    return (
        <Button onClick={deleteSnippet} disabled={isPending}>
            {isPending && <Spinner className="mr-2" />}
            {isPending ? "Deleting..." : "Delete"}
        </Button>
    )
}