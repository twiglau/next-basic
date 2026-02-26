
import { trpcServerCaller } from "@/utils/trpc"

export default async function EditSnippetPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const snippet = await trpcServerCaller({}).snippet.detail({ id })
    return (
        <div>
            <h1>Edit Snippet {snippet?.title}</h1>
        </div>
    )
}