-- Create waitlist_users table
CREATE TABLE IF NOT EXISTS public.waitlist_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    primary_intent TEXT NOT NULL,
    key_constraint VARCHAR(100) NOT NULL, -- e.g., 'PDPA', 'Hallucination', 'Local-AI', 'Cost'
    infrastructure VARCHAR(100) NOT NULL, -- e.g., 'Docker', 'Kubernetes', 'Air-Gapped'
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- 'Pending', 'Approved', 'Rejected'
    tier VARCHAR(50) DEFAULT 'Developer' NOT NULL, -- 'Developer', 'Enterprise'
    locale VARCHAR(10) DEFAULT 'en' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexing for fast query routing by tier/status
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist_users(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_tier ON public.waitlist_users(tier);

-- Create waitlist table for newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    locale VARCHAR(10) DEFAULT 'en' NOT NULL,
    source VARCHAR(100) DEFAULT 'footer' NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexing for fast query routing by email
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

