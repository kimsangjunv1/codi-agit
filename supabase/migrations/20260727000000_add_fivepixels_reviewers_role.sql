-- fivepixels P3-auth: 리뷰어 권한 등급(role) 컬럼 추가.
-- admin > sub_admin > member 순의 rank 로 팀 관리 API 권한을 강제한다.
-- 기존 마이그레이션(20260726130000)이 이미 적용됐을 수 있으므로 IF NOT EXISTS 로 안전 처리.

ALTER TABLE "public"."fivepixels_reviewers"
    ADD COLUMN IF NOT EXISTS "role" text NOT NULL DEFAULT 'member';

-- 기존 row 를 명시적으로 member 로 백필 (컬럼 추가 시 default 로 채워지지만 방어적 처리)
UPDATE "public"."fivepixels_reviewers"
    SET "role" = 'member'
    WHERE "role" IS NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fivepixels_reviewers_role_check'
    ) THEN
        ALTER TABLE "public"."fivepixels_reviewers"
            ADD CONSTRAINT "fivepixels_reviewers_role_check"
            CHECK ("role" IN ('admin', 'sub_admin', 'member'));
    END IF;
END $$;
