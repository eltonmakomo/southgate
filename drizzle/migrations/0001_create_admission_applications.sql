CREATE TABLE public.admission_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  parent_first_name text NOT NULL,
  parent_last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  relationship text NOT NULL,
  child_first_name text NOT NULL,
  child_last_name text NOT NULL,
  date_of_birth date NOT NULL,
  current_school text,
  form_applying text NOT NULL,
  admission_year text NOT NULL,
  admission_term text NOT NULL,
  boarding_option text,
  heard_from text,
  message text,
  consent boolean NOT NULL DEFAULT true
);
GRANT ALL ON public.admission_applications TO service_role;
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;