CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  form_level text,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  student_name text,
  message text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  position text NOT NULL,
  message text,
  cv_path text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.career_applications TO service_role;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.newsletter_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_signups TO service_role;
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.submission_attempts (
  id bigserial PRIMARY KEY,
  client_key text NOT NULL,
  kind text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX submission_attempts_lookup ON public.submission_attempts (client_key, kind, created_at DESC);
GRANT ALL ON public.submission_attempts TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.submission_attempts_id_seq TO service_role;
ALTER TABLE public.submission_attempts ENABLE ROW LEVEL SECURITY;