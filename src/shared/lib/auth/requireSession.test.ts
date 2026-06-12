import type { Session } from "next-auth";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getServerSession } from "next-auth";

import { requireAdmin, requireSession } from "@/shared/lib/auth/requireSession";

vi.mock("next-auth", () => ({
    getServerSession: vi.fn(),
}));

vi.mock("@/shared/lib/authOptions", () => ({
    authOptions: {},
}));

const mockGetServerSession = vi.mocked(getServerSession);

function createSession(role: "admin" | "user"): Session {
    return {
        user: {
            id: "user-1",
            email: "user@example.com",
            name: "Test User",
            role,
        },
        expires: "2099-01-01T00:00:00.000Z",
    };
}

describe("requireSession", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("세션이 없으면 401을 반환한다", async () => {
        mockGetServerSession.mockResolvedValue(null);

        const result = await requireSession();

        expect(result.authorized).toBe(false);
        if (!result.authorized) {
            expect(result.response.status).toBe(401);
            const body = await result.response.json();
            expect(body.resultCode).toBe("UNAUTHORIZED");
        }
    });

    it("유효한 세션이면 authorized를 반환한다", async () => {
        const session = createSession("user");
        mockGetServerSession.mockResolvedValue(session);

        const result = await requireSession();

        expect(result).toEqual({ authorized: true, session });
    });
});

describe("requireAdmin", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("일반 사용자는 403을 반환한다", async () => {
        mockGetServerSession.mockResolvedValue(createSession("user"));

        const result = await requireAdmin();

        expect(result.authorized).toBe(false);
        if (!result.authorized) {
            expect(result.response.status).toBe(403);
            const body = await result.response.json();
            expect(body.resultCode).toBe("FORBIDDEN");
        }
    });

    it("admin 세션이면 authorized를 반환한다", async () => {
        const session = createSession("admin");
        mockGetServerSession.mockResolvedValue(session);

        const result = await requireAdmin();

        expect(result).toEqual({ authorized: true, session });
    });
});
