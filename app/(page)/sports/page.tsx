

export default async function SportsPage() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return (
        <div className="container mx-auto my-5">
            <h1 className="text-2xl font-bold">Sports Page</h1>
            <p>{new Date().toLocaleString()}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
    )
}