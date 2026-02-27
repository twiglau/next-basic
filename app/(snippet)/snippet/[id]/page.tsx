import { trpcServerCaller } from "@/utils/trpc"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DeleteButton from "./delete-button"


export default async function SnippetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const snippet = await trpcServerCaller({}).snippet.detail({ id })
    return (
        <div className="flex flex-col gap-4 container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{snippet?.title}</h1>
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" asChild>
                        <Link href={`/snippet/${snippet?.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteButton id={id} />
                </div>
            </div>
            <pre className="p-4 border rounded-lg bg-gray-50">
            <p>{snippet?.content}</p>
            </pre>
        </div>
    )
}


export async function generateStaticParams() {
    const snippets = await trpcServerCaller({}).snippet.lists()
    return snippets.map((snippet) => ({
        id: snippet.id.toString(),
    }))
}