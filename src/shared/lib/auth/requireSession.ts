import { getServerSession, type Session } from "next-auth";

import { authOptions } from "@/shared/lib/authOptions";
import { apiError } from "@/shared/lib/apiResponse";

export type AuthGuardResult =
    | { authorized: true; session: Session }
    | { authorized: false; response: Response };

export async function requireSession(): Promise<AuthGuardResult> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return {
            authorized: false,
            response: apiError("로그인이 필요합니다.", {
                status: 401,
                resultCode: "UNAUTHORIZED",
            }),
        };
    }

    return { authorized: true, session };
}

export async function requireAdmin(): Promise<AuthGuardResult> {
    const auth = await requireSession();

    if (!auth.authorized) {
        return auth;
    }

    if (auth.session.user.role !== "admin") {
        return {
            authorized: false,
            response: apiError("권한이 없습니다.", {
                status: 403,
                resultCode: "FORBIDDEN",
            }),
        };
    }

    return auth;
}
