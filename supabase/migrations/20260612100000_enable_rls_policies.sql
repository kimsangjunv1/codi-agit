-- 페이즈 2: public 테이블 RLS 활성화 및 anon/authenticated 최소 권한 정책
-- NextAuth Credentials 기반이므로 write·민감 read는 API에서 service role로 처리한다.

-- ---------------------------------------------------------------------------
-- RLS 활성화
-- ---------------------------------------------------------------------------
ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 공개 read 정책 (anon / authenticated)
-- ---------------------------------------------------------------------------
CREATE POLICY "category_public_select"
    ON public.category
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "comments_public_select"
    ON public.comments
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "posts_public_select"
    ON public.posts
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "views_public_select"
    ON public.views
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "likes_public_select"
    ON public.likes
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- users, invite_codes: anon/authenticated 정책 없음 → 기본 거부

-- ---------------------------------------------------------------------------
-- anon / authenticated write 권한 제거 (테이블)
-- ---------------------------------------------------------------------------
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.category FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.comments FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.posts FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.users FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.views FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.likes FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.invite_codes FROM anon, authenticated;

-- SELECT는 RLS 정책으로 제어; users·invite_codes는 정책 없어 SELECT도 거부
REVOKE ALL ON TABLE public.users FROM anon, authenticated;
GRANT SELECT ON TABLE public.users TO service_role;

REVOKE ALL ON TABLE public.invite_codes FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.invite_codes TO service_role;

-- 공개 테이블: SELECT만 유지
REVOKE ALL ON TABLE public.category FROM anon, authenticated;
GRANT SELECT ON TABLE public.category TO anon, authenticated;

REVOKE ALL ON TABLE public.comments FROM anon, authenticated;
GRANT SELECT ON TABLE public.comments TO anon, authenticated;

REVOKE ALL ON TABLE public.posts FROM anon, authenticated;
GRANT SELECT ON TABLE public.posts TO anon, authenticated;

REVOKE ALL ON TABLE public.views FROM anon, authenticated;
GRANT SELECT ON TABLE public.views TO anon, authenticated;

REVOKE ALL ON TABLE public.likes FROM anon, authenticated;
GRANT SELECT ON TABLE public.likes TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- 시퀀스: anon/authenticated INSERT 불가 → USAGE 제거
-- ---------------------------------------------------------------------------
REVOKE ALL ON SEQUENCE public.category_idx_seq FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.comments_idx_seq FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.posts_idx_seq FROM anon, authenticated;

-- invite_codes.id SERIAL
REVOKE ALL ON SEQUENCE public.invite_codes_id_seq FROM anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.invite_codes_id_seq TO service_role;

-- ---------------------------------------------------------------------------
-- increment_view: 앱에서 미사용 — anon 실행 권한 제거
-- ---------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.increment_view(integer, uuid, text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_view(integer, uuid, text) TO service_role;
