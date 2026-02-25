import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function SnippetLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto p-4">
            <nav className="flex gap-2">
                <Button asChild variant="outline">
                    <Link href="/snippet" prefetch={true}>Snippet</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/snippet/add" prefetch={true}>Add Snippet</Link>
                </Button>
            </nav>
            <div className="mt-5">
                {children}
            </div>
        </div>
    )
}