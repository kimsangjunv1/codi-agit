"use client";

import PageFrame from "@/widgets/layout/PageFrame";

import * as LoginLayer from "@/widgets/login/ui";

export default function Panel() {
    return (
        <PageFrame id="login" className={{ inner: "flex flex-col gap-[2.4rem]", container: "" }}>
            <LoginLayer.LoginForm />
        </PageFrame>
    );
}
