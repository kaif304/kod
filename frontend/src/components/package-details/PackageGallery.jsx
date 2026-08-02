function PackageGallery({ gallery, title }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
      <img
        src={gallery[0]}
        alt={title}
        className="h-[400px] w-full border-rounded object-cover"
      />

      <div className="grid gap-4">
        {gallery.slice(1, 3).map((image) => (
          <img
            key={image}
            src={image}
            alt={title}
            className="h-[192px] w-full border-rounded object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default PackageGallery; 