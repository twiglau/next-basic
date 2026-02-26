"use client";

import React, { PropsWithChildren } from "react";
import { trpcClientReact, trpcPureClient } from "@/utils/api";
import { QueryClient } from "@tanstack/react-query";

export const TrpcProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const queryClient = new QueryClient();
    return (
        <trpcClientReact.Provider client={trpcPureClient} queryClient={queryClient}>
            {children}
        </trpcClientReact.Provider>
    );
};