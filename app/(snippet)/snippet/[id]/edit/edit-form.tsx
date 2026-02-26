"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Snippets } from "@/lib/generated/prisma"
import { Button } from "@/components/ui/button"

export default function EditForm({snippet}: {snippet: Snippets}) {
    const [code, setCode] = useState(snippet.content)
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{snippet.title}</h1>
                <Button variant="default">Save</Button>
            </div>
            <Editor
                height="40vh"
                defaultLanguage="javascript"
                defaultValue={code}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 24,
                    
                }}
                onChange={(value) => setCode(value || "")}
            />
        </div>
    )
}