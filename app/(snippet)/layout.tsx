import { Button } from "@/components/ui/button";
import { TrpcProvider } from "@/providers/trpc-provider";
import Link from "next/link";


export default function SnippetLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto p-4 flex flex-col gap-5">
            <nav className="flex gap-2">
                <Button asChild variant="outline">
                    <Link href="/snippet" prefetch={true}>Snippet</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/snippet/add" prefetch={true}>Add Snippet</Link>
                </Button>
            </nav>
            <TrpcProvider>
                {children}
            </TrpcProvider>
        </div>
    )
}