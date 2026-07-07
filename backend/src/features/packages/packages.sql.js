export const packagesSql = {
  selectAll: `
    SELECT
      p.*,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'id', i.id,
            'dayNumber', i.day_number,
            'title', i.title,
            'description', i.description
          )
          ORDER BY i.day_number
        )
        FROM itineraries i
        WHERE i.package_id = p.id
      ), '[]'::json) AS itinerary
    FROM packages p
  `,
  countAll: `
    SELECT COUNT(*)::int AS total
    FROM packages p
  `,
  selectBySlug: `
    SELECT
      p.*,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'id', i.id,
            'dayNumber', i.day_number,
            'title', i.title,
            'description', i.description
          )
          ORDER BY i.day_number
        )
        FROM itineraries i
        WHERE i.package_id = p.id
      ), '[]'::json) AS itinerary
    FROM packages p
    WHERE p.slug = $1
    LIMIT 1
  `,
  selectById: `
    SELECT
      p.*,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'id', i.id,
            'dayNumber', i.day_number,
            'title', i.title,
            'description', i.description
          )
          ORDER BY i.day_number
        )
        FROM itineraries i
        WHERE i.package_id = p.id
      ), '[]'::json) AS itinerary
    FROM packages p
    WHERE p.id = $1
    LIMIT 1
  `,
  insertPackage: `
    INSERT INTO packages (
      title,
      slug,
      description,
      price,
      duration,
      starting_location,
      destination,
      cover_image,
      gallery_images,
      category,
      highlights,
      inclusions,
      exclusions,
      faqs,
      is_featured,
      token_amount,
      status
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9::jsonb, $10, $11::jsonb, $12::jsonb, $13::jsonb, $14::jsonb,
      $15, $16, $17
    )
    RETURNING id
  `,
  updatePackage: `
    UPDATE packages
    SET
      title = $2,
      slug = $3,
      description = $4,
      price = $5,
      duration = $6,
      starting_location = $7,
      destination = $8,
      cover_image = $9,
      gallery_images = $10::jsonb,
      category = $11,
      highlights = $12::jsonb,
      inclusions = $13::jsonb,
      exclusions = $14::jsonb,
      faqs = $15::jsonb,
      is_featured = $16,
      token_amount = $17,
      status = $18
    WHERE id = $1
  `,
  deletePackage: `
    DELETE FROM packages
    WHERE id = $1
  `,
  deleteItineraryByPackageId: `
    DELETE FROM itineraries
    WHERE package_id = $1
  `,
  insertItineraryItem: `
    INSERT INTO itineraries (package_id, day_number, title, description)
    VALUES ($1, $2, $3, $4)
  `,
};
