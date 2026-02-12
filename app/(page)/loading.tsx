import { Spinner } from "@/components/ui/spinner"


const PageLoading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Spinner />
            <span className="mt-2">page is loading...</span>
        </div>
    )
}

export default PageLoading