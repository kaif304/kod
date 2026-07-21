export function validatePackage(form) {
  const errors = {};

  if (!form.title.trim()) {
    errors.title = 'Title is required.';
  }

  if (!form.slug.trim()) {
    errors.slug = 'Slug is required.';
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required.';
  }

  if (Number(form.price) <= 0) {
    errors.price = 'Price must be greater than 0.';
  }

  if (Number(form.duration) <= 0) {
    errors.duration = 'Duration must be greater than 0.';
  }

  if (!form.startingLocation.trim()) {
    errors.startingLocation = 'Starting location is required.';
  }

  if (!form.destination.trim()) {
    errors.destination = 'Destination is required.';
  }

  if (!form.coverImage.trim()) {
    errors.coverImage = 'Cover image is required.';
  }

  form.itinerary.forEach((item, index) => {
    if (!item.dayNumber) {
      errors[`dayNumber-${index}`] = 'Day number is required.';
    }

    if (!item.title.trim()) {
      errors[`title-${index}`] = 'Title is required.';
    }

    if (!item.description.trim()) {
      errors[`description-${index}`] = 'Description is required.';
    }
  });

  return errors;
}