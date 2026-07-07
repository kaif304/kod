-- =========================
-- DEFAULT ADMIN
-- =========================

INSERT INTO admins (
    name,
    email,
    mobile_number,
    password_hash
)
VALUES (
    'KOD Super Admin',
    'admin@kodtravel.com',
    '9876543210',
    crypt('Admin@12345', gen_salt('bf'))
)
ON CONFLICT (email) DO NOTHING;

-- =========================
-- PACKAGES
-- =========================

INSERT INTO packages (
    title,
    slug,
    description,
    price,
    duration,
    starting_location,
    destination,
    cover_image
)
VALUES

(
'Royal Kashmir Escape',
'royal-kashmir-escape',
'A premium Kashmir circuit with houseboat stay, Gulmarg experiences, and curated local dining.',
38999,
6,
'Delhi',
'Kashmir',
'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80'
),

(
'Bali Luxe Retreat',
'bali-luxe-retreat',
'Luxury Bali getaway with private villa, beach clubs and curated experiences.',
54999,
5,
'Mumbai',
'Bali',
'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
),

(
'Golden Triangle Signature',
'golden-triangle-signature',
'Delhi, Agra and Jaipur premium tour.',
27999,
4,
'Delhi',
'Delhi, Agra & Jaipur',
'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80'
)

ON CONFLICT (slug)
DO NOTHING;

-- =========================
-- ITINERARIES
-- =========================

INSERT INTO itineraries (
    package_id,
    day_number,
    title,
    description
)

SELECT
    p.id,
    itinerary.day_number,
    itinerary.title,
    itinerary.description

FROM packages p

JOIN (

VALUES

('royal-kashmir-escape',1,'Arrival in Srinagar','Airport pickup and Dal Lake stay.'),
('royal-kashmir-escape',2,'Gulmarg','Full-day Gulmarg excursion.'),
('royal-kashmir-escape',3,'Pahalgam','Sightseeing and leisure.'),
('royal-kashmir-escape',4,'Old Srinagar','Markets and local experiences.'),
('royal-kashmir-escape',5,'Leisure Day','Optional activities.'),
('royal-kashmir-escape',6,'Departure','Airport transfer.'),

('bali-luxe-retreat',1,'Arrival','Private villa check-in.'),
('bali-luxe-retreat',2,'Temple Tour','Visit iconic temples.'),
('bali-luxe-retreat',3,'Beach Club','Relaxation day.'),
('bali-luxe-retreat',4,'Ubud','Rice terraces and culture.'),
('bali-luxe-retreat',5,'Departure','Airport transfer.'),

('golden-triangle-signature',1,'Delhi','Arrival and sightseeing.'),
('golden-triangle-signature',2,'Agra','Taj Mahal visit.'),
('golden-triangle-signature',3,'Jaipur','Amber Fort.'),
('golden-triangle-signature',4,'Departure','Return journey.')

) AS itinerary(slug, day_number, title, description)

ON itinerary.slug = p.slug

WHERE NOT EXISTS (

    SELECT 1
    FROM itineraries i
    WHERE i.package_id = p.id
      AND i.day_number = itinerary.day_number

);

-- =========================
-- SAMPLE LEAD
-- =========================

INSERT INTO leads (

    package_id,
    customer_name,
    email,
    phone,
    travelers,
    message,
    contact_mode,
    source,
    status

)

SELECT

    p.id,
    'Riya Sharma',
    'riya@example.com',
    '9999988888',
    2,
    'Looking for a honeymoon package with airport pickup.',
    'inquiry',
    'website',
    'new'

FROM packages p

WHERE p.slug = 'royal-kashmir-escape'

ON CONFLICT DO NOTHING;




-- INSERT INTO admins (
--   name,
--   email,
--   mobile_number,
--   password_hash
-- )
-- VALUES (
--   'KOD Super Admin',
--   'admin@kodtravel.com',
--   '9876543210',
--   crypt('Admin@12345', gen_salt('bf', 10))
-- )
-- ON CONFLICT (email) DO NOTHING;


-- WITH inserted_packages AS (
--   INSERT INTO packages (
--     title,
--     slug,
--     description,
--     price,
--     duration,
--     starting_location,
--     destination,
--     cover_image,
--     category
--   )
--   VALUES
--   (
--     'Royal Kashmir Escape',
--     'royal-kashmir-escape',
--     'A premium Kashmir circuit with houseboat stay, Gulmarg experiences, and curated local dining for couples and families.',
--     38999,
--     6,
--     'Delhi',
--     'Kashmir',
--     'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80',
--   ),
--   (
--     'Bali Luxe Retreat',
--     'bali-luxe-retreat',
--     'An elegant Bali itinerary with private villa comfort, beach club evenings, and handcrafted day tours for relaxed luxury.',
--     54999,
--     5,
--     'Mumbai',
--     'Bali',
--     'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
--   ),
--   (
--     'Golden Triangle Signature',
--     'golden-triangle-signature',
--     'A polished North India route for first-time explorers covering Delhi, Agra, and Jaipur with premium storytelling and guided pace.',
--     27999,
--     4,
--     'Delhi',
--     'Delhi, Agra, Jaipur',
--     'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
--   )
--   ON CONFLICT (slug) DO UPDATE SET (
--     description = EXCLUDED.description,
--     price = EXCLUDED.price,
--     duration = EXCLUDED.duration,
--     cover_image = EXCLUDED.cover_image,
--     category = EXCLUDED.category;
--   )
-- )


-- INSERT INTO itineraries (package_id, day_number, title, description)
-- SELECT id, day_number, title, description
-- FROM (
--   SELECT id, slug FROM inserted_packages
-- ) p
-- JOIN (
--   VALUES
--     ('royal-kashmir-escape', 1, 'Arrival in Srinagar', 'Airport pickup, Dal Lake check-in, and a slow shikara ride to settle into the valley.'),
--     ('royal-kashmir-escape', 2, 'Gulmarg Highlights', 'Full-day excursion with gondola assistance and scenic meadow time.'),
--     ('royal-kashmir-escape', 3, 'Pahalgam Leisure Day', 'Riverside sightseeing with room for pony rides and café stops.'),
--     ('royal-kashmir-escape', 4, 'Old Srinagar and Crafts', 'Local market immersion, kahwa tasting, and curated shopping.'),
--     ('royal-kashmir-escape', 5, 'Free Day for Custom Add-ons', 'Optional photography, snow play, or premium dining planned by your manager.'),
--     ('royal-kashmir-escape', 6, 'Departure', 'Smooth checkout and airport drop.'),
--     ('bali-luxe-retreat', 1, 'Villa Arrival', 'Private transfer, welcome setup, and relaxed evening near Seminyak.'),
--     ('bali-luxe-retreat', 2, 'Temple and Swing Trail', 'Designer day trip across iconic Bali viewpoints and cultural stops.'),
--     ('bali-luxe-retreat', 3, 'Beach Club and Leisure', 'Open day with optional watersports and sunset dining.'),
--     ('bali-luxe-retreat', 4, 'Ubud Discovery', 'Rice terraces, craft villages, and a mindful pace through Ubud.'),
--     ('bali-luxe-retreat', 5, 'Departure Day', 'Final shopping window and airport transfer.'),
--     ('golden-triangle-signature', 1, 'Delhi Arrival', 'Airport pickup and introductory capital city drive.'),
--     ('golden-triangle-signature', 2, 'Delhi to Agra', 'Heritage stops en route and sunset at the Taj precinct.'),
--     ('golden-triangle-signature', 3, 'Agra to Jaipur', 'Fort and palace immersion with handpicked regional dining.'),
--     ('golden-triangle-signature', 4, 'Jaipur Wrap-up', 'Amber and city palace highlights before departure.')
-- ) itinerary(slug, day_number, title, description)
-- ON itinerary.slug = p.slug
-- ON CONFLICT DO NOTHING;


-- INSERT INTO leads (
--     package_id,
--     customer_name,
--     email,
--     phone,
--     travelers,
--     message,
--     status
-- )
-- SELECT
--     p.id,
--     'Riya Sharma',
--     'riya@example.com',
--     '9999988888',
--     2,
--     'Looking for a honeymoon room upgrade and airport assistance.',
--     'new'
-- FROM packages p
-- WHERE p.slug = 'royal-kashmir-escape';
-- ON CONFLICT DO NOTHING;
