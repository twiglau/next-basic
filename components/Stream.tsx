

export const StreamLightPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <div>
            <h1>Stream Light Page</h1>
            <p>This is a stream light page.</p>
        </div>
    );
}
export const StreamHeavyPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return (
        <div>
            <h1>Stream Heavy Page</h1>
            <p>This is a stream heavy page.</p>
        </div>
    );
}