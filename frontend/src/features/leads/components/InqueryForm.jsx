import { useState } from "react";
import { useLead } from "../hooks/useLead";

const initialState = {
  customerName: "",
  phone: "",
  email: "",
  travelers: 1,
  message: "",
};

const InquiryForm = ({
  packageId,
  source = "package_page",
  contactMode = "inquiry",
}) => {
  const [form, setForm] = useState(initialState);

  const { loading, error, success, submitLead } = useLead();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "travelers" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      packageId,
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      travelers: form.travelers,
      message: form.message.trim(),
      source,
      contactMode,
    };

    const result = await submitLead(payload);

    if (result.success) {
      setForm(initialState);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border-rounded border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">
        Plan Your Trip
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Full Name *
        </label>

        <input
          type="text"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          required
          className="w-full border-rounded border p-3 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone *
        </label>

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border-rounded border p-3 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border-rounded border p-3 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Travelers
        </label>

        <input
          type="number"
          min="1"
          name="travelers"
          value={form.travelers}
          onChange={handleChange}
          className="w-full border-rounded border p-3 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Message
        </label>

        <textarea
          rows={5}
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full border-rounded border p-3 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {error && (
        <div className="border-rounded bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="border-rounded bg-green-50 p-3 text-sm text-green-700">
          Thank you! Our travel expert will contact you shortly.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full border-rounded bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
};

export default InquiryForm;


// usage 

// <InquiryForm
//     packageId={packageItem.id}
//     source="package_page"
//     contactMode="inquiry"
// />