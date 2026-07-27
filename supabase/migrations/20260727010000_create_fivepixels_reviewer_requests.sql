-- fivepixels P3-auth: 리뷰어 등록 승인 큐.
-- 팀원이 앱에서 키를 발급하면 pending 요청이 쌓이고, admin/sub_admin 이 패널에서 승인/거절한다.
-- private_key 는 절대 저장하지 않는다. public_key 만 보관한다.

CREATE TABLE IF NOT EXISTS "public"."fivepixels_reviewer_requests" (
    "id" text NOT NULL,
    "project_id" text NOT NULL,
    "environment" text NOT NULL,
    "author_id" text NOT NULL,
    "author_name" text NOT NULL,
    "public_key" text NOT NULL,
    "status" text NOT NULL DEFAULT 'pending',
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "resolved_at" timestamp with time zone,
    "resolved_by" text,
    CONSTRAINT "fivepixels_reviewer_requests_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fivepixels_reviewer_requests_status_check"
        CHECK ("status" IN ('pending', 'approved', 'rejected')),
    CONSTRAINT "fivepixels_reviewer_requests_public_key_prefix"
        CHECK ("public_key" LIKE 'stpub1.%')
);

ALTER TABLE "public"."fivepixels_reviewer_requests" OWNER TO "postgres";

-- 스코프별 동일 author 의 pending 중복만 막는다 (approved/rejected 는 여러 건 허용).
CREATE UNIQUE INDEX IF NOT EXISTS "fivepixels_reviewer_requests_scope_author_pending_idx"
    ON "public"."fivepixels_reviewer_requests" ("project_id", "environment", "author_id")
    WHERE "status" = 'pending';

CREATE INDEX IF NOT EXISTS "fivepixels_reviewer_requests_scope_status_idx"
    ON "public"."fivepixels_reviewer_requests" ("project_id", "environment", "status", "created_at");

-- 읽기·쓰기는 Route Handler(service role)만. anon 정책 없음.
ALTER TABLE "public"."fivepixels_reviewer_requests" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."fivepixels_reviewer_requests" TO "service_role";
