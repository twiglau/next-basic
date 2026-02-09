import { StreamHeavyPage, StreamLightPage } from "@/components/Stream";
import { Suspense } from "react";


const StreamTestPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Light Loading...</div>}>
               <StreamLightPage />
            </Suspense>
            <hr className="border border-gray-200" />
            <Suspense fallback={<div>Heavy Loading...</div>}>
                <StreamHeavyPage />
            </Suspense>
        </div>
    );
};

export default StreamTestPage;