import React from "react";

type Props = {
    children: React.ReactNode;
    intercepting: React.ReactNode;
}

export default function DashboardLayout(props: Props) {
    return (
        <>
            {props.children}
            {props.intercepting}
        </>
    );
}