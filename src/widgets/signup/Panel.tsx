"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as SignupLayer from "@/widgets/signup/ui";

export default function Panel() {
    return (
        <PageFrame id="signup" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <SignupLayer.SignupForm />
        </PageFrame>
    );
}
