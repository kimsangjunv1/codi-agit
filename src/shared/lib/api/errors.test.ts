import { describe, expect, it } from "vitest";

import { ApiFetchError, AUTH_EXPIRED_STATUSES, parseApiErrorMessage } from "@/shared/lib/api/errors";

describe("parseApiErrorMessage", () => {
    it("resultMessage를 우선 사용한다", () => {
        expect(parseApiErrorMessage({ resultMessage: "권한 없음", message: "ignored" })).toBe("권한 없음");
    });

    it("message 필드를 fallback으로 사용한다", () => {
        expect(parseApiErrorMessage({ message: "not found" })).toBe("not found");
    });

    it("알 수 없는 응답에는 fallback을 사용한다", () => {
        expect(parseApiErrorMessage(null, "기본 메시지")).toBe("기본 메시지");
    });
});

describe("ApiFetchError", () => {
    it("status와 data를 보존한다", () => {
        const error = new ApiFetchError("실패", 403, { resultCode: "FORBIDDEN" });

        expect(error.message).toBe("실패");
        expect(error.status).toBe(403);
        expect(error.data).toEqual({ resultCode: "FORBIDDEN" });
        expect(error.name).toBe("ApiFetchError");
    });
});

describe("AUTH_EXPIRED_STATUSES", () => {
    it("401과 419를 인증 만료로 취급한다", () => {
        expect(AUTH_EXPIRED_STATUSES.has(401)).toBe(true);
        expect(AUTH_EXPIRED_STATUSES.has(419)).toBe(true);
        expect(AUTH_EXPIRED_STATUSES.has(403)).toBe(false);
    });
});
