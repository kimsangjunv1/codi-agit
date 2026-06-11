-- post-images storage bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'post-images',
    'post-images',
    true,
    10485760,
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- public bucket object read
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'post_images_public_read'
    ) THEN
        CREATE POLICY "post_images_public_read"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'post-images');
    END IF;
END $$;
