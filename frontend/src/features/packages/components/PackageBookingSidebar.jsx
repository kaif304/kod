import FormField from "../../../components/common/FormField.jsx";
import { formatCurrency } from "../../../utils/format.js";

function PackageBookingSidebar({
  packageItem,
  siteConfig,
  leadForm,
  handleLeadChange,
  handleInquirySubmit,
  submitState,
  formMessage,
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div className="glass-panel rounded-[2rem] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          Starting price
        </p>

        <p className="mt-4 text-4xl font-bold text-cyan-800">
          {formatCurrency(packageItem.price)}
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Final confirmation, hotel selection, and package customizations are
          handled manually by the KOD operations team.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={`tel:${siteConfig.managerPhoneRaw}`}
            className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Call Manager
          </a>

          <a
            href={`https://wa.me/${siteConfig.whatsappRaw}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cyan-800 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Inquiry & Booking Desk
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Share your details, request a callback, or reserve this package with a
          token amount.
        </p>

        <div className="mt-5 grid gap-4">
          <FormField
            label="Full Name"
            placeholder="Your name"
            value={leadForm.customerName}
            onChange={(event) =>
              handleLeadChange("customerName", event.target.value)
            }
          />

          <FormField
            label="Mobile Number"
            placeholder="9876543210"
            value={leadForm.phone}
            onChange={(event) =>
              handleLeadChange("phone", event.target.value)
            }
          />

          <FormField
            label="Email"
            placeholder="Optional email"
            value={leadForm.email}
            onChange={(event) =>
              handleLeadChange("email", event.target.value)
            }
          />

          <FormField
            label="Travelers"
            type="number"
            min="1"
            value={leadForm.travelers}
            onChange={(event) =>
              handleLeadChange("travelers", event.target.value)
            }
          />

          <FormField
            label="Message"
            as="textarea"
            rows="4"
            placeholder="Tell us your dates, room preference, or any custom request."
            value={leadForm.message}
            onChange={(event) =>
              handleLeadChange("message", event.target.value)
            }
          />
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={() => handleInquirySubmit("inquiry")}
            disabled={Boolean(submitState)}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitState === "inquiry"
              ? "Sending inquiry..."
              : "Send Inquiry"}
          </button>

          <button
            type="button"
            onClick={() => handleInquirySubmit("call_request")}
            disabled={Boolean(submitState)}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 disabled:opacity-60"
          >
            {submitState === "call_request"
              ? "Requesting callback..."
              : "Request Callback"}
          </button>

          {/* <button
            type="button"
            onClick={() => handleInquirySubmit("book_now")}
            disabled={Boolean(submitState)}
            className="rounded-full bg-cyan-800 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitState === "book_now"
              ? "Creating token order..."
              : `Reserve with ${formatCurrency(packageItem.tokenAmount)} token`}
          </button> */}
        </div>

        {formMessage ? (
          <p className="mt-4 text-sm text-cyan-900">
            {formMessage}
          </p>
        ) : null}

        {/* {paymentOrder ? (
          <div className="mt-6 rounded-[1.5rem] bg-white/75 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Token payment reference
            </p>

            <p className="mt-3 text-lg font-bold text-slate-900">
              {paymentOrder.transactionId}
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Share this order reference with the customer while collecting the
              token online. Once paid, store their bank or UPI transaction
              reference below.
            </p>

            <div className="mt-4 grid gap-3">
              <FormField
                label="Customer transaction reference"
                placeholder="UPI / bank reference"
                value={paymentReference}
                onChange={(event) =>
                  setPaymentReference(event.target.value)
                }
              />

              <button
                type="button"
                onClick={handlePaymentConfirmation}
                disabled={submitState === "payment"}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {submitState === "payment"
                  ? "Confirming..."
                  : "Confirm Token Submitted"}
              </button>
            </div>

            {paymentConfirmation ? (
              <p className="mt-4 text-sm text-cyan-900">
                {paymentConfirmation}
              </p>
            ) : null}
          </div>
        ) : null} */}
        
      </div>
    </aside>
  );
}

export default PackageBookingSidebar;