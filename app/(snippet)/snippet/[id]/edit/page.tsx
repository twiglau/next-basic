
import { trpcServerCaller } from "@/utils/trpc"
import EditForm from "./edit-form"

export default async function EditSnippetPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const snippet = await trpcServerCaller({}).snippet.detail({ id })
    return (
        <div>
            <EditForm />
        </div>
    )
}