CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- ADMINS
-- =========================

CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- PACKAGES
-- =========================

CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(180) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,

    description TEXT NOT NULL,

    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),

    duration INTEGER NOT NULL CHECK (duration > 0),

    starting_location VARCHAR(120) NOT NULL,

    destination VARCHAR(120) NOT NULL,

    cover_image TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- ITINERARIES
-- =========================

CREATE TABLE IF NOT EXISTS itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    package_id UUID NOT NULL
        REFERENCES packages(id)
        ON DELETE CASCADE,

    day_number INTEGER NOT NULL CHECK (day_number > 0),

    title VARCHAR(180) NOT NULL,

    description TEXT NOT NULL
);

-- =========================
-- LEADS
-- =========================

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    package_id UUID
        REFERENCES packages(id)
        ON DELETE SET NULL,

    customer_name VARCHAR(120) NOT NULL,

    email VARCHAR(180),

    phone VARCHAR(20) NOT NULL,

    travelers INTEGER NOT NULL
        DEFAULT 1
        CHECK (travelers > 0),

    message TEXT,

    contact_mode VARCHAR(30)
        NOT NULL
        DEFAULT 'inquiry'
        CHECK (
            contact_mode IN (
                'inquiry',
                'call_request',
                'whatsapp_request',
                'book_now'
            )
        ),

    source VARCHAR(30)
        NOT NULL
        DEFAULT 'website'
        CHECK (
            source IN (
                'website',
                'package_page',
                'contact_page',
                'campaign'
            )
        ),

    status VARCHAR(30)
        NOT NULL
        DEFAULT 'new'
        CHECK (
            status IN (
                'new',
                'contacted',
                'quoted',
                'won',
                'lost'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- INDEXES
-- =========================

CREATE INDEX IF NOT EXISTS idx_itineraries_package_id
ON itineraries(package_id);

CREATE INDEX IF NOT EXISTS idx_leads_package_id
ON leads(package_id);

CREATE INDEX IF NOT EXISTS idx_leads_status
ON leads(status);




-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- CREATE TABLE IF NOT EXISTS admins (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

--     name VARCHAR(120) NOT NULL,
--     email VARCHAR(180) NOT NULL UNIQUE,
--     mobile_number VARCHAR(20) NOT NULL UNIQUE,

--     password_hash VARCHAR(255) NOT NULL,

--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS packages (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

--   title VARCHAR(180) NOT NULL,
--   slug VARCHAR(200) NOT NULL UNIQUE,

--   description TEXT NOT NULL,

--   price NUMERIC(12,2) NOT NULL CHECK (price >= 0),

--   duration INTEGER NOT NULL CHECK (duration > 0),

--   starting_location VARCHAR(120) NOT NULL,

--   destination VARCHAR(120) NOT NULL,

--   cover_image TEXT NOT NULL,

--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS itineraries (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

--   package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  
--   day_number INTEGER NOT NULL CHECK (day_number > 0),
--   title VARCHAR(180) NOT NULL,
--   description TEXT NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS leads (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

--   package_id UUID
--       REFERENCES packages(id)
--       ON DELETE SET NULL,

--   customer_name VARCHAR(120) NOT NULL,

--   email VARCHAR(180),

--   phone VARCHAR(20) NOT NULL,

--   travelers INTEGER NOT NULL
--       DEFAULT 1
--       CHECK (travelers > 0),

--   message TEXT,

--   status VARCHAR(30)
--       NOT NULL
--       DEFAULT 'new'
--       CHECK (
--           status IN (
--               'new',
--               'contacted',
--               'quoted',
--               'won',
--               'lost'
--           )
--       ),

--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- -- CREATE TABLE IF NOT EXISTS payments (
-- --   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
-- --   lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
-- --   amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
-- --   payment_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed', 'refunded')),
-- --   transaction_id VARCHAR(120) NOT NULL UNIQUE,
-- --   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- -- );

-- CREATE INDEX IF NOT EXISTS idx_itineraries_package_id
-- ON itineraries(package_id);

-- CREATE INDEX IF NOT EXISTS idx_leads_package_id
-- ON leads(package_id);

-- CREATE INDEX IF NOT EXISTS idx_leads_status
-- ON leads(status);
