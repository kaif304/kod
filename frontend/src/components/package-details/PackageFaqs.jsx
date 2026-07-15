function PackageFaqs({ faqs }) {
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        FAQs
      </h2>

      <div className="mt-5 space-y-4">
        {faqs?.map((faq) => (
          <div
            key={faq.question}
            className="rounded-[1.5rem] bg-white/70 p-5"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {faq.question}
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageFaqs;