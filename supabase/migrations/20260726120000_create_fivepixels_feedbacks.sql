-- fivepixels(@fivepixels-js/react) P0+P1 API 계약용 단일 테이블.
-- cases / replies / field_values / position 은 라이브러리 JSON 원형을 그대로 보존한다.

CREATE TABLE IF NOT EXISTS "public"."fivepixels_feedbacks" (
    "id" text NOT NULL,
    "project_id" text NOT NULL,
    "environment" text NOT NULL,
    "app_version" text,
    "pathname" text NOT NULL,
    "report_id" text NOT NULL,
    "report_type" text NOT NULL,
    "target_selector" text,
    "status" text NOT NULL,
    "fc_number" integer NOT NULL,
    "category" text,
    "field_values" jsonb NOT NULL DEFAULT '{}'::jsonb,
    "cases" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "replies" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "reply_count" integer NOT NULL DEFAULT 0,
    "latest_reply" jsonb,
    "position" jsonb NOT NULL,
    "author_id" text,
    "author_name" text,
    "auth" jsonb,
    "integrations" jsonb,
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "fivepixels_feedbacks_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fivepixels_feedbacks_fc_unique" UNIQUE ("project_id", "environment", "fc_number"),
    CONSTRAINT "fivepixels_feedbacks_report_type_check" CHECK ("report_type" IN ('group', 'item')),
    CONSTRAINT "fivepixels_feedbacks_status_check" CHECK ("status" IN ('open', 'git_issued', 'resolved', 'archived')),
    CONSTRAINT "fivepixels_feedbacks_field_values_obj" CHECK (jsonb_typeof("field_values") = 'object'),
    CONSTRAINT "fivepixels_feedbacks_cases_arr" CHECK (jsonb_typeof("cases") = 'array'),
    CONSTRAINT "fivepixels_feedbacks_replies_arr" CHECK (jsonb_typeof("replies") = 'array'),
    CONSTRAINT "fivepixels_feedbacks_position_obj" CHECK (jsonb_typeof("position") = 'object')
);

ALTER TABLE "public"."fivepixels_feedbacks" OWNER TO "postgres";

CREATE INDEX IF NOT EXISTS "fivepixels_feedbacks_scope_path_created_idx"
    ON "public"."fivepixels_feedbacks" ("project_id", "environment", "pathname", "created_at" DESC);

CREATE INDEX IF NOT EXISTS "fivepixels_feedbacks_scope_created_idx"
    ON "public"."fivepixels_feedbacks" ("project_id", "environment", "created_at" DESC);

-- 읽기·쓰기 모두 Route Handler(service role)만 수행한다.
-- anon / authenticated 정책은 두지 않으므로 브라우저 직접 접근은 기본 거부된다.
-- 팀 인증 설계 후 필요하면 별도 마이그레이션으로 정책을 추가한다.
ALTER TABLE "public"."fivepixels_feedbacks" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."fivepixels_feedbacks" TO "service_role";
