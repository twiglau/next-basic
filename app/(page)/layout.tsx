import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import {NavigationEvents} from "@/components/NavigationEvents";


export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto my-5">
            <nav className="flex gap-2">
                <Button asChild variant="outline">
                    <Link href="/news" prefetch={true}>News</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/sports" prefetch={true}>Sports</Link>
                </Button>
            </nav>
            <div className="mt-5">
                {children}
            </div>
            {/* refresh, 缓存失效 */}
            <Suspense fallback={null}>
                <NavigationEvents />
            </Suspense>
        </div>
    )
}