"use client";

import { useState } from "react";
import Main from "@/widgets/layout/Main";

const Page = () => {
    const [renderTarget] = useState(() => (typeof window === "undefined" ? "서버 렌더링" : "클라이언트 렌더링"));

    return (
        // <Main
        //     id="post-detail"
        //     className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}
        // >
        //     <p>hydration mismatch 예제: {renderTarget}</p>
        // </Main>
        <div>
            <p>hydration mismatch 예제: {renderTarget}</p>
        </div>
    );
};

export default Page;
