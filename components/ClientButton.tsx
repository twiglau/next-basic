"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";


export default function ClientButton(props: React.ComponentProps<"button"> ) {
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
            startTransition(async () => {
                await new Promise(resolve => setTimeout(resolve, 3000))
                // @ts-expect-error - props.onClick might be an async Server Action
                await props.onClick(e);
            });
        }
    };

    return (
        <Button 
            {...props}
            variant={'secondary'} 
            onClick={handleClick}
            disabled={isPending || props.disabled}
        >
            {isPending ? "Adding..." : props.children}
        </Button>
    )
}