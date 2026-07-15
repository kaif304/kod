function AdminPageLayout({ top, children }) {
  return (
    <div className="flex h-full flex-col">
      {/* Fixed section */}
      {top && <div>{top}</div>}

      {/* Scrollable section */}
      <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default AdminPageLayout