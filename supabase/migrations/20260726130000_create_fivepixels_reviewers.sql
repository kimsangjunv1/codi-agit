-- fivepixels P3-auth: 리뷰어 publicKey 명단.
-- private_key 는 절대 저장하지 않는다. 각자 브라우저에만 보관한다.

CREATE TABLE IF NOT EXISTS "public"."fivepixels_reviewers" (
    "id" text NOT NULL,
    "project_id" text NOT NULL,
    "environment" text NOT NULL,
    "author_id" text NOT NULL,
    "author_name" text NOT NULL,
    "public_key" text NOT NULL,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "fivepixels_reviewers_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fivepixels_reviewers_scope_author_unique" UNIQUE ("project_id", "environment", "author_id"),
    CONSTRAINT "fivepixels_reviewers_public_key_prefix" CHECK ("public_key" LIKE 'stpub1.%')
);

ALTER TABLE "public"."fivepixels_reviewers" OWNER TO "postgres";

CREATE INDEX IF NOT EXISTS "fivepixels_reviewers_scope_active_idx"
    ON "public"."fivepixels_reviewers" ("project_id", "environment", "is_active");

-- 읽기·쓰기는 Route Handler(service role)만. anon 정책 없음.
ALTER TABLE "public"."fivepixels_reviewers" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."fivepixels_reviewers" TO "service_role";
