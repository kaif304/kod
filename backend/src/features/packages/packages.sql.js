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

  selectPublished: `
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
    WHERE p.status = 'published'
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
      status
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
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
      status = $10
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
