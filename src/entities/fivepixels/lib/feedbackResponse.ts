import { NextResponse } from "next/server";

import { resolveRouteError } from "@/shared/lib/apiResponse";

/**
 * fivepixels 계약은 공통 `apiSuccess` 래핑(result/resultCode) 없이
 * `ReportFeedback` 원형 JSON을 그대로 요구하므로 전용 응답 헬퍼를 둔다.
 */
export const FEEDBACK_SCOPE_REQUIRED_MESSAGE = "project, env 쿼리가 필요합니다.";
export const FEEDBACK_NOT_FOUND_MESSAGE = "피드백을 찾을 수 없습니다.";

export function feedbackError(message: string, status: number) {
    return NextResponse.json({ message }, { status });
}

/** Supabase 에러 원문은 서버 로그로만 남기고 클라이언트에는 일반 메시지를 준다. */
export function feedbackErrorFrom(error: unknown, fallback: string) {
    console.error("[fivepixels]", error);

    const { message, status } = resolveRouteError(error, fallback);

    return feedbackError(message, status);
}
