

export default async function NewsPage() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <div className="container mx-auto my-5">
            <h1 className="text-2xl font-bold">News Page</h1>
            <p>{new Date().toLocaleString()}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
    )
}