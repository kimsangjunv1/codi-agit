import type {
    CreateReportFeedbackPayload,
    ReportAuthor,
    ReportAuthorRole,
    ReportAuthProof,
    ReportCase,
    ReportFeedback,
    ReportIntegrations,
    ReportListAllResult,
    ReportPosition,
    ReportReply,
    ReportReviewerRequest,
    ReportStatus,
    ReportTargetType,
    UpdateReportFeedbackPayload,
} from "@fivepixels-js/react";

export type {
    CreateReportFeedbackPayload,
    CreateReviewerRequestPayload,
    RegisterReviewerPayload,
    ReportAuthor,
    ReportAuthorRole,
    ReportAuthProof,
    ReportFeedback,
    ReportListAllParams,
    ReportListAllResult,
    ReportReviewerRequest,
    ResolveReviewerRequestPayload,
    UpdateReportFeedbackPayload,
    UpdateReviewerPayload,
} from "@fivepixels-js/react";

/** 라이브러리가 배럴로 내보내지 않는 타입은 ReportFeedback 인덱스 접근으로 가져온다. */
export type FivepixelsCategory = ReportFeedback["category"];
export type FivepixelsFieldValues = ReportFeedback["field_values"];
export type FivepixelsReplySummary = NonNullable<ReportFeedback["latest_reply"]>;

/** fivepixels_feedbacks 테이블 row. jsonb 컬럼은 라이브러리 JSON 원형을 유지한다. */
export interface FivepixelsFeedbackRow {
    id: string;
    project_id: string;
    environment: string;
    app_version: string | null;
    pathname: string;
    report_id: string;
    report_type: ReportTargetType;
    target_selector: string | null;
    status: ReportStatus;
    fc_number: number;
    category: FivepixelsCategory;
    field_values: FivepixelsFieldValues;
    cases: ReportCase[];
    replies: ReportReply[];
    reply_count: number;
    latest_reply: FivepixelsReplySummary | null;
    position: ReportPosition;
    author_id: string | null;
    author_name: string | null;
    auth: ReportAuthProof | null;
    integrations: ReportIntegrations | null;
    created_at: string;
    updated_at: string;
}

/** project + env 스코프. 모든 조회/쓰기에 필수. */
export interface FivepixelsScope {
    projectId: string;
    environment: string;
}

export interface GetFeedbackListPayload extends FivepixelsScope {
    pathname: string;
}

export interface GetFeedbackListPagingPayload extends FivepixelsScope {
    limit: number;
    cursor?: string;
}

export interface SetFeedbackPayload extends FivepixelsScope {
    feedback: CreateReportFeedbackPayload;
}

export interface PatchFeedbackPayload extends FivepixelsScope {
    id: string;
    feedback: UpdateReportFeedbackPayload;
}

export interface DeleteFeedbackPayload extends FivepixelsScope {
    id: string;
}

export type GetFeedbackListResponse = ReportFeedback[];
export type GetFeedbackListPagingResponse = ReportListAllResult;
export type SetFeedbackResponse = ReportFeedback;
export type PatchFeedbackResponse = ReportFeedback;

/** fivepixels_reviewers 테이블 row. private_key 는 저장하지 않는다. */
export interface FivepixelsReviewerRow {
    id: string;
    project_id: string;
    environment: string;
    author_id: string;
    author_name: string;
    public_key: string;
    role: ReportAuthorRole;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/** fivepixels_reviewer_requests 테이블 row (승인 큐). */
export interface FivepixelsReviewerRequestRow {
    id: string;
    project_id: string;
    environment: string;
    author_id: string;
    author_name: string;
    public_key: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    resolved_at: string | null;
    resolved_by: string | null;
}

/**
 * 프론트 `team.reviewers` 에 주입하는 공개 명단 항목.
 * 라이브러리 `ReportAuthor` 형태(role/isActive 포함)를 그대로 쓴다.
 */
export type FivepixelsReviewerItem = ReportAuthor;

export type GetFeedbackReviewerListPayload = FivepixelsScope;
export type GetFeedbackReviewerListResponse = FivepixelsReviewerItem[];
export type GetFeedbackReviewerRequestListResponse = ReportReviewerRequest[];
