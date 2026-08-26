-- ==============================================================================
-- Muhammad Daniyal Khan Portfolio — Supabase Database & Storage Schema
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Portfolio Categories Table
CREATE TABLE IF NOT EXISTS public.portfolio_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    overview TEXT,
    category_id UUID REFERENCES public.portfolio_categories(id) ON DELETE SET NULL,
    video_url TEXT,
    video_storage_path TEXT,
    thumbnail_url TEXT,
    thumbnail_storage_path TEXT,
    duration TEXT,
    editing_style TEXT,
    challenge TEXT,
    result_summary TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ
);

-- 4. Project Services Table (e.g. "Footage Curation", "Motion Graphics", "Sound Design")
CREATE TABLE IF NOT EXISTS public.project_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Project Deliverables Table (Repeatable list items)
CREATE TABLE IF NOT EXISTS public.project_deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
    item TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Project Approach Table (Structured case-study approach components)
CREATE TABLE IF NOT EXISTS public.project_approach (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL UNIQUE REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
    pacing_and_structure TEXT,
    b_roll_and_visuals TEXT,
    sound_and_color TEXT,
    retention_tactics TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_active ON public.portfolio_categories(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_slug ON public.portfolio_categories(slug);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status ON public.portfolio_projects(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON public.portfolio_projects(featured, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON public.portfolio_projects(category_id);

CREATE INDEX IF NOT EXISTS idx_project_services_project_id ON public.project_services(project_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_deliverables_project_id ON public.project_deliverables(project_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_approach_project_id ON public.project_approach(project_id);

-- 8. Updated At Triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.portfolio_categories;
CREATE TRIGGER set_categories_updated_at
BEFORE UPDATE ON public.portfolio_categories
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.portfolio_projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_project_approach_updated_at ON public.project_approach;
CREATE TRIGGER set_project_approach_updated_at
BEFORE UPDATE ON public.project_approach
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. Automatic published_at timestamp management
CREATE OR REPLACE FUNCTION public.handle_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') AND NEW.published_at IS NULL THEN
        NEW.published_at = now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_project_published_at ON public.portfolio_projects;
CREATE TRIGGER set_project_published_at
BEFORE INSERT OR UPDATE ON public.portfolio_projects
FOR EACH ROW EXECUTE FUNCTION public.handle_published_at();

-- ==============================================================================
-- TRUSTED ADMIN ROLE HELPER FUNCTION
-- ==============================================================================

-- Helper function to check if the caller is an authenticated admin via app_metadata
-- Uses SECURITY INVOKER with a single canonical condition: app_metadata.role = 'admin'
-- Note: auth.jwt() -> 'app_metadata' is trusted and CANNOT be edited by end users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
AS $$
  SELECT
    auth.role() = 'authenticated'
    AND auth.jwt() -> 'app_metadata' ->> 'role' = 'admin';
$$;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES — STRICTLY HARDENED
-- ==============================================================================

ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_approach ENABLE ROW LEVEL SECURITY;

-- 9.1 Categories Policies
-- Public (Anon & non-admin authenticated users) can only view active categories
DROP POLICY IF EXISTS "Public can view active categories" ON public.portfolio_categories;
DROP POLICY IF EXISTS "Admin full access on categories" ON public.portfolio_categories;

CREATE POLICY "Public can view active categories"
ON public.portfolio_categories FOR SELECT
USING (active = true OR public.is_admin());

CREATE POLICY "Admins can insert categories"
ON public.portfolio_categories FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update categories"
ON public.portfolio_categories FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete categories"
ON public.portfolio_categories FOR DELETE
TO authenticated
USING (public.is_admin());

-- 9.2 Projects Policies
-- Public (Anon & non-admin authenticated users) can only view published projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admin full access on projects" ON public.portfolio_projects;

CREATE POLICY "Public can view published projects"
ON public.portfolio_projects FOR SELECT
USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admins can insert projects"
ON public.portfolio_projects FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update projects"
ON public.portfolio_projects FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete projects"
ON public.portfolio_projects FOR DELETE
TO authenticated
USING (public.is_admin());

-- 9.3 Project Services Policies
DROP POLICY IF EXISTS "Public can view services of published projects" ON public.project_services;
DROP POLICY IF EXISTS "Admin full access on project services" ON public.project_services;

CREATE POLICY "Public can view services of published projects"
ON public.project_services FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.portfolio_projects p
        WHERE p.id = project_services.project_id AND (p.status = 'published' OR public.is_admin())
    )
);

CREATE POLICY "Admins can insert project services"
ON public.project_services FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update project services"
ON public.project_services FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete project services"
ON public.project_services FOR DELETE
TO authenticated
USING (public.is_admin());

-- 9.4 Project Deliverables Policies
DROP POLICY IF EXISTS "Public can view deliverables of published projects" ON public.project_deliverables;
DROP POLICY IF EXISTS "Admin full access on project deliverables" ON public.project_deliverables;

CREATE POLICY "Public can view deliverables of published projects"
ON public.project_deliverables FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.portfolio_projects p
        WHERE p.id = project_deliverables.project_id AND (p.status = 'published' OR public.is_admin())
    )
);

CREATE POLICY "Admins can insert project deliverables"
ON public.project_deliverables FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update project deliverables"
ON public.project_deliverables FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete project deliverables"
ON public.project_deliverables FOR DELETE
TO authenticated
USING (public.is_admin());

-- 9.5 Project Approach Policies
DROP POLICY IF EXISTS "Public can view approach of published projects" ON public.project_approach;
DROP POLICY IF EXISTS "Admin full access on project approach" ON public.project_approach;

CREATE POLICY "Public can view approach of published projects"
ON public.project_approach FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.portfolio_projects p
        WHERE p.id = project_approach.project_id AND (p.status = 'published' OR public.is_admin())
    )
);

CREATE POLICY "Admins can insert project approach"
ON public.project_approach FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update project approach"
ON public.project_approach FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete project approach"
ON public.project_approach FOR DELETE
TO authenticated
USING (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS & STRICT ADMIN POLICIES
-- ==============================================================================

-- Create Storage Buckets if not existing
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('portfolio-videos', 'portfolio-videos', true, 524288000, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
    ('portfolio-thumbnails', 'portfolio-thumbnails', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage Policies for portfolio-videos and portfolio-thumbnails
DROP POLICY IF EXISTS "Public can read portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete portfolio media" ON storage.objects;

-- Public can read assets from both public buckets
CREATE POLICY "Public can read portfolio media"
ON storage.objects FOR SELECT
USING (bucket_id IN ('portfolio-videos', 'portfolio-thumbnails'));

-- Only users with app_metadata.role = 'admin' can upload objects
CREATE POLICY "Admins only can upload portfolio media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id IN ('portfolio-videos', 'portfolio-thumbnails') AND
    public.is_admin()
);

-- Only users with app_metadata.role = 'admin' can update/replace objects
CREATE POLICY "Admins only can update portfolio media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id IN ('portfolio-videos', 'portfolio-thumbnails') AND
    public.is_admin()
)
WITH CHECK (
    bucket_id IN ('portfolio-videos', 'portfolio-thumbnails') AND
    public.is_admin()
);

-- Only users with app_metadata.role = 'admin' can delete objects
CREATE POLICY "Admins only can delete portfolio media"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id IN ('portfolio-videos', 'portfolio-thumbnails') AND
    public.is_admin()
);

-- ==============================================================================
-- INITIAL DEFAULT CATEGORIES (Seeds)
-- ==============================================================================
INSERT INTO public.portfolio_categories (name, slug, description, sort_order)
VALUES
    ('YouTube', 'youtube', 'Long-form narrative, essays, tech, and educational video editing.', 1),
    ('Faceless / Cash Cow', 'faceless-cash-cow', 'Automated stock footage assembly, kinetic typography, and sound design.', 2),
    ('Shorts & Reels', 'shorts-reels', 'Vertical 9:16 high-impact hooks and dynamic subtitle cutdowns.', 3),
    ('Documentary', 'documentary', 'Atmospheric pacing, archival photo animation, and score layering.', 4),
    ('Commercial', 'commercial', 'Product commercials, rhythm-locked cuts, and kinetic branding.', 5),
    ('Motion Graphics', 'motion-graphics', 'Vector animations, UI explainers, lower thirds, and titles.', 6)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- INSTRUCTIONS TO PROMOTE AN AUTHENTICATED USER TO ADMIN
-- ==============================================================================
-- To promote an authenticated user to admin, run this SQL in Supabase SQL Editor:
--
-- UPDATE auth.users
-- SET raw_app_meta_data =
--   COALESCE(raw_app_meta_data, '{}'::jsonb)
--   || '{"role": "admin"}'::jsonb
-- WHERE email = 'danikhan5510@gmail.com';
--
-- IMPORTANT:
-- After changing app_metadata, sign out and sign back in, or refresh the
-- Supabase session, so the JWT token contains the updated {"role": "admin"}.
--
-- Note: Setting app_metadata.role = 'admin' directly via SQL is tamper-proof
-- and cannot be modified by end users through client-side API requests.

