"use client";


import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";


type Props = {
    children: React.ReactNode;
}

export default function BackableDialog(props: Props) {
    const router = useRouter();
    return (
        <Dialog open onOpenChange={() => {
            router.back();
        }}>
            {props.children}
        </Dialog>
    );
}