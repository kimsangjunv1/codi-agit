CREATE TABLE IF NOT EXISTS "public"."likes" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid,
    "post_id" integer,
    "ip" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now()
);

ALTER TABLE "public"."likes" OWNER TO "postgres";

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "unique_like" UNIQUE ("post_id", "ip", "user_id");

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("idx");

ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE "public"."posts" ADD COLUMN IF NOT EXISTS "likes" integer DEFAULT 0;

GRANT ALL ON TABLE "public"."likes" TO "anon";
GRANT ALL ON TABLE "public"."likes" TO "authenticated";
GRANT ALL ON TABLE "public"."likes" TO "service_role";
