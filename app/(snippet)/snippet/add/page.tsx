import { snippetSchema, SnippetType } from "@/prisma/validate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export default function AddSnippetPage() {
    const form = useForm<SnippetType>({
        resolver: zodResolver(snippetSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });
    return (
        <div className="container mx-auto">
            <h1>Add Snippet</h1>
            <form>
                
            </form>
        </div>
    )
}