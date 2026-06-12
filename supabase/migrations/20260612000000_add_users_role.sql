ALTER TABLE public.users
    ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'
    CONSTRAINT users_role_check CHECK (role IN ('admin', 'user'));
