"use client";

import { UserManagerPageProvider } from "./model/UserManagerContext";
import * as UserManagerLayer from "@/widgets/manager/user/ui";

export default function Panel() {
    return (
        <UserManagerPageProvider>
            <UserManagerLayer.UserManager />
            <UserManagerLayer.Modal />
        </UserManagerPageProvider>
    );
}
