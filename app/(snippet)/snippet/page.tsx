

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trpcServerCaller } from "@/utils/trpc";

export default async function SnippetPage() {
    const snippets = await trpcServerCaller({}).snippet.lists()
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Snippet</h1>
            <div className="grid grid-cols-2 gap-4 container">
                {snippets?.map(ele => (
                    <Card key={ele.id}>
                        <CardHeader>{ele.title}</CardHeader>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm" className="w-full">
                               <Link href={`/snippet/${ele.id}`}>View</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}