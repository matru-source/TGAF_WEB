"use client";

import { useState, useRef } from "react";

type GrievanceType = "grievance" | "review" | "feedback";

const PRODUCTS_LIST = [
  "Hot Peppe Powder (5g / 100g)",
  "Hot Peppe Powder (Supa Pack)",
  "Atarodo Peppe Powder (8g)",
  "Cameroon Peppe Powder (3g / 50g / 100g)",
  "Ose Di Oku Fiery Blend (8g)",
  "Turmeric Powder (100g)",
  "Ginger Powder (100g)",
  "B2B Bulk Spices (Chilli / Ginger / Turmeric)",
  "General / Other",
];

const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Kano",
  "Rivers",
  "Oyo",
  "Anambra",
  "Enugu",
  "Delta",
  "Ogun",
  "Kaduna",
  "Edo",
  "Akwa Ibom",
  "Abia",
  "Imo",
  "Plateau",
  "Ondo",
  "Other State / Region",
];

const RATING_LABELS: Record<number, string> = {
  1: "1 Star - Unsatisfactory",
  2: "2 Stars - Needs Improvement",
  3: "3 Stars - Average",
  4: "4 Stars - Very Good",
  5: "5 Stars - Excellent / Authentic Heat!",
};

const SAMPLE_REVIEWS = [
  {
    name: "Mrs. Amaka Okoye",
    location: "Ikeja, Lagos",
    product: "Ose Di Oku (8g)",
    rating: 5,
    title: "The real taste of native soups",
    body: "The aroma of Ose Di Oku in my Ofe Owerri was unmatched. No sand, no artificial colour, just fresh fiery peppe like home.",
    date: "October 2026",
  },
  {
    name: "Alhaji Bello Danjuma",
    location: "Kano Central",
    product: "Hot Peppe Powder",
    rating: 5,
    title: "Consistent heat for our catering business",
    body: "We buy Goodearth Hot Peppe in cartons for our commercial kitchen. Pungency is steady every single batch.",
    date: "September 2026",
  },
  {
    name: "Chef Tunde Balogun",
    location: "Port Harcourt",
    product: "Cameroon Peppe Powder",
    rating: 5,
    title: "Smoky and pungent",
    body: "The smokiness is deep and intense. Gives pepper soup that authentic Nigerian village aroma without any harsh additives.",
    date: "August 2026",
  },
];

const FAQS = [
  {
    q: "Where do I locate the batch number on my Goodearth sachet?",
    a: "The batch code (e.g., BN-240901) and Best Before date are embossed along the top crimped seal or printed on the back panel of every sachet and pouch.",
  },
  {
    q: "What is your turnaround time for resolving quality complaints?",
    a: "Every submission receives an immediate reference tracking ticket. Our quality assurance team acknowledges grievances within 24 hours, tests retention counter-samples from that batch, and delivers a full report and resolution within 48 to 72 business hours.",
  },
  {
    q: "Are defective or damaged products eligible for immediate replacement?",
    a: "Yes. In the rare event of a packaging puncture or seal defect, our nearest distribution partner will provide a fresh complimentary replacement upon verification.",
  },
  {
    q: "Can I also share positive reviews and recipe suggestions?",
    a: "Absolutely! We love hearing how Nigerian chefs, families, and caterers use Goodearth spices. Positive reviews and culinary suggestions are featured and shared with our product development team.",
  },
];

export default function CustomerGrievance() {
  const [activeTab, setActiveTab] = useState<GrievanceType>("grievance");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [copied, setCopied] = useState<boolean>(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCopyTicketDetails() {
    const text = `To: Info@taggrifarms.com\nSubject: Goodearth Consumer Ticket #${ticketId}\n\nHello Goodearth Consumer Care,\nI have submitted ticket #${ticketId} on the website regarding my recent product purchase.\nPlease keep me updated on the resolution.\nThank you.`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const state = String(formData.get("state") || "").trim();
    const product = String(formData.get("product") || "").trim();
    const batchNo = String(formData.get("batchNo") || "").trim();
    const store = String(formData.get("store") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const details = String(formData.get("details") || "").trim();

    if (!name) {
      setStatus("error");
      setErrorMessage("Please provide your Full Name.");
      return;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid Email Address (e.g. adebayo@example.com).");
      return;
    }
    if (!subject) {
      setStatus("error");
      setErrorMessage("Please provide a Grievance Title / Nature of Issue.");
      return;
    }
    if (!details) {
      setStatus("error");
      setErrorMessage("Please provide a Detailed Description of your grievance or feedback.");
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedTicket = `GE-${activeTab.toUpperCase().slice(0, 3)}-2026-${randomNum}`;

    const companyInfo = `Tel: ${phone || "N/A"} | State: ${state || "N/A"}`;
    const interestInfo = `[${activeTab.toUpperCase()}] ${product} | Rating: ${rating}★${batchNo ? ` | Batch: ${batchNo}` : ""}${store ? ` | Store: ${store}` : ""}`;
    const fullMessage = `TICKET REF: ${generatedTicket}
TYPE: ${activeTab.toUpperCase()}
SUBJECT: ${subject}

PRODUCT: ${product}
BATCH / EXPIRY: ${batchNo || "Not provided"}
PURCHASE LOCATION: ${store || "Not provided"}
RATING: ${rating} of 5 Stars
ATTACHMENT: ${fileName !== "No file chosen" ? fileName : "None"}

DETAILS:
${details}
`;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          name,
          email,
          company: companyInfo.slice(0, 160),
          interest: interestInfo.slice(0, 160),
          message: fullMessage,
        }),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok) {
        if (resData?.issues?.email) {
          throw new Error("Please enter a valid email address (e.g. yourname@example.com).");
        }
        if (resData?.issues?.name) {
          throw new Error("Please enter your full name.");
        }
        if (resData?.issues?.message) {
          throw new Error("Please fill out the description message.");
        }
        throw new Error(resData?.error || "Failed to submit ticket.");
      }

      setTicketId(generatedTicket);
      setStatus("success");
      form.reset();
      setFileName("No file chosen");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "";
      setErrorMessage(
        msg || "Unable to submit your ticket. Please check your internet connection or email our Consumer Relations desk directly at Info@taggrifarms.com."
      );
    }
  }

  return (
    <div className="grievance-page-wrap">
      {/* MAIN GRIEVANCE SECTION */}
      <section className="section grievance-main-section">
        <div className="container">
          {/* Top Category Tabs */}
          <div className="grievance-tabs-bar" role="tablist">
            <button
              type="button"
              className={`g-tab-btn ${activeTab === "grievance" ? "g-tab-btn--active-grievance" : "g-tab-btn--inactive"}`}
              onClick={() => {
                setActiveTab("grievance");
                setStatus("idle");
              }}
              role="tab"
              aria-selected={activeTab === "grievance"}
            >
              <svg className="g-tab-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.5l8.5 14.5H3.5L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
              </svg>
              <span>Report Grievance / Defect</span>
            </button>

            <button
              type="button"
              className={`g-tab-btn ${activeTab === "review" ? "g-tab-btn--active-review" : "g-tab-btn--inactive"}`}
              onClick={() => {
                setActiveTab("review");
                setStatus("idle");
              }}
              role="tab"
              aria-selected={activeTab === "review"}
            >
              <span className="g-tab-icon-gold">⭐</span>
              <span>Share Product Review</span>
            </button>

            <button
              type="button"
              className={`g-tab-btn ${activeTab === "feedback" ? "g-tab-btn--active-feedback" : "g-tab-btn--inactive"}`}
              onClick={() => {
                setActiveTab("feedback");
                setStatus("idle");
              }}
              role="tab"
              aria-selected={activeTab === "feedback"}
            >
              <span className="g-tab-icon-gold">💬</span>
              <span>General Feedback</span>
            </button>
          </div>

          {/* 1. FULL-WIDTH FORM CARD */}
          <div className="grievance-card grievance-form-box grievance-full-box">
            {/* Green Consumer Protection Banner */}
            <div className="consumer-protection-banner">
              <div className="cp-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="cp-text">
                <h4 className="cp-title">Consumer Protection</h4>
                <p className="cp-desc">
                  {activeTab === "grievance" &&
                    "Please include your sachet batch number and purchase location below so our lab can trace your pack immediately."}
                  {activeTab === "review" &&
                    "Share your authentic cooking experience with Goodearth spices to inspire Nigerian home cooks and caterers."}
                  {activeTab === "feedback" &&
                    "We welcome suggestions on new pack sizes, regional distribution, and recipe suggestions."}
                </p>
              </div>
            </div>

            {status === "success" ? (
              <div className="grievance-success-box">
                <div className="success-icon-circle">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <h3>Ticket Registered Successfully!</h3>
                <div className="ticket-badge">
                  Tracking ID: <strong>{ticketId}</strong>
                </div>
                <p>
                  Our QA and Consumer Relations desk has received your ticket. A representative will contact you within 24 to 48 hours with investigation findings and resolution.
                </p>

                {/* Direct Support & Reference Box */}
                <div className="ticket-support-box">
                  <div className="tsb-item">
                    <span className="tsb-label">Consumer Care Desk:</span>
                    <strong className="tsb-val">Info@taggrifarms.com</strong>
                  </div>
                  <div className="tsb-item">
                    <span className="tsb-label">Tracking Reference:</span>
                    <span className="tsb-ref">Quote ticket <strong>#{ticketId}</strong> in your subject</span>
                  </div>
                </div>

                <div className="success-btn-row">
                  {/* 1. Open in Gmail Webmail (Opens directly in browser, never creates empty tab) */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=Info@taggrifarms.com&su=${encodeURIComponent(
                      `Goodearth Consumer Ticket #${ticketId}`
                    )}&body=${encodeURIComponent(
                      `Hello Goodearth Consumer Care,\n\nI have submitted ticket #${ticketId} on the website regarding my recent product purchase.\n\nPlease keep me updated on the resolution.\n\nThank you.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-email"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Open in Gmail
                  </a>

                  {/* 2. Copy Email & Ticket Details Button */}
                  <button
                    type="button"
                    onClick={handleCopyTicketDetails}
                    className="btn-pill-copy"
                  >
                    {copied ? (
                      <>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={{ color: "#15803d" }}>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        <span>Copy Email &amp; Ticket</span>
                      </>
                    )}
                  </button>

                  {/* 3. Open in Default App (mailto without target="_blank") */}
                  <a
                    href={`mailto:Info@taggrifarms.com?subject=${encodeURIComponent(
                      `Goodearth Consumer Ticket #${ticketId}`
                    )}&body=${encodeURIComponent(
                      `Hello Goodearth Consumer Care,\n\nI have submitted ticket #${ticketId} on the website regarding my recent product purchase.\n\nPlease keep me updated on the resolution.\n\nThank you.`
                    )}`}
                    className="btn-pill-ghost"
                  >
                    Default Mail App
                  </a>

                  {/* 4. Reset Form */}
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn-pill-ghost"
                  >
                    Submit Another Ticket
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* STEP 1: Customer Information (4 columns horizontal row) */}
                <div className="form-step-heading">
                  <span className="step-num-badge">1</span>
                  <span className="step-title-text">Customer Information</span>
                </div>

                <div className="field-row-four">
                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-name">
                      Full Name <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        id="gf-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Adebayo Ogunlesi"
                        required
                        className="text-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-email">
                      Email Address <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <input
                        id="gf-email"
                        name="email"
                        type="email"
                        placeholder="adebayo@example.com"
                        required
                        className="text-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-phone">
                      Phone Number (Optional)
                    </label>
                    <div className="input-with-icon">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <input
                        id="gf-phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. +234 801 234 5678"
                        className="text-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-state">
                      State / City <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon select-wrapper">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <select id="gf-state" name="state" defaultValue="Lagos" className="select-input">
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <svg className="select-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Product Details (3 columns horizontal row) */}
                <div className="form-step-heading" style={{ marginTop: "18px" }}>
                  <span className="step-num-badge">2</span>
                  <span className="step-title-text">Product Details</span>
                </div>

                <div className="field-row-three">
                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-product">
                      Select Product <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon select-wrapper">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m7.5 4.27 9 5.15" />
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                      </svg>
                      <select id="gf-product" name="product" defaultValue={PRODUCTS_LIST[0]} className="select-input">
                        {PRODUCTS_LIST.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <svg className="select-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-batch">
                      Batch No. / Expiry Date <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <input
                        id="gf-batch"
                        name="batchNo"
                        type="text"
                        placeholder="e.g. BN-2410-02"
                        className="text-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="gf-store">
                      Store / Market of Purchase (Optional)
                    </label>
                    <div className="input-with-icon">
                      <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                        <path d="M2 7h20" />
                      </svg>
                      <input
                        id="gf-store"
                        name="store"
                        type="text"
                        placeholder="e.g. Mile 12 Market, Lagos"
                        className="text-input"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 3: Experience, Details & Evidence (Compact 2-Column Grid) */}
                <div className="form-step-heading" style={{ marginTop: "18px" }}>
                  <span className="step-num-badge">3</span>
                  <span className="step-title-text">Your Experience &amp; Description</span>
                </div>

                <div className="field-row-exp-details">
                  {/* Left Column: Rating + Subject + File Upload */}
                  <div className="experience-col-left">
                    {/* Experience Rating Box */}
                    <div className="experience-rating-box">
                      <div className="er-label">Rate Your Experience</div>
                      <div className="er-stars-row" onMouseLeave={() => setHoverRating(null)}>
                        <div className="stars-flex">
                          {[1, 2, 3, 4, 5].map((s) => {
                            const isLit = (hoverRating ?? rating) >= s;
                            return (
                              <button
                                key={s}
                                type="button"
                                className={`star-symbol-btn ${isLit ? "star-symbol-lit" : ""}`}
                                onClick={() => setRating(s)}
                                onMouseEnter={() => setHoverRating(s)}
                                aria-label={`Rate ${s} star`}
                              >
                                ★
                              </button>
                            );
                          })}
                        </div>
                        <div className="rating-pill-badge">
                          {RATING_LABELS[hoverRating ?? rating]}
                        </div>
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="input-group">
                      <label className="input-label" htmlFor="gf-subject">
                        {activeTab === "grievance"
                          ? "Grievance Title / Nature of Issue *"
                          : activeTab === "review"
                          ? "Review Title / Headline *"
                          : "Subject *"}
                      </label>
                      <div className="input-with-icon">
                        <svg className="field-inner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        </svg>
                        <input
                          id="gf-subject"
                          name="subject"
                          type="text"
                          placeholder="e.g. Packaging seal / Purity concern / Flavour note"
                          required
                          className="text-input"
                        />
                      </div>
                    </div>

                    {/* Evidence File Upload */}
                    <div className="upload-evidence-card">
                      <div className="upload-left-side">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                        <span className="upload-title-text">
                          Upload Photo / Evidence{" "}
                          <span className="upload-subtext">(Optional, up to 5MB)</span>
                        </span>
                      </div>

                      <div className="upload-btn-row">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="choose-file-btn"
                        >
                          Choose File
                        </button>
                        <span className="file-name-label">{fileName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description Textarea + Consent + Submit */}
                  <div className="experience-col-right">
                    <div className="input-group">
                      <label className="input-label" htmlFor="gf-details">
                        Detailed Description of Grievance <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon textarea-wrapper">
                        <svg className="field-inner-icon textarea-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                        <textarea
                          id="gf-details"
                          name="details"
                          rows={4}
                          placeholder="Please describe the issue clearly (packaging condition, colour, pungency, when opened, etc.)."
                          required
                          className="textarea-input"
                        />
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="consent-checkbox-wrap" style={{ margin: "4px 0 12px" }}>
                      <label className="checkbox-custom-label">
                        <input type="checkbox" required defaultChecked className="custom-red-checkbox" />
                        <span className="checkbox-text">
                          I agree that Goodearth Foods may contact me regarding this submission to investigate, resolve, or acknowledge this feedback.
                        </span>
                      </label>
                    </div>

                    {errorMessage && (
                      <div className="form-error-alert" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Bar */}
                    <div className="grievance-submit-bar" style={{ marginTop: "4px" }}>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="btn-submit-red-pill"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                          <path d="m22 2-7 20-4-9-9-4Z" />
                          <path d="M22 2 11 13" />
                        </svg>
                        <span>{status === "submitting" ? "Submitting..." : "Submit Grievance Ticket"}</span>
                        <span className="submit-arr">→</span>
                      </button>

                      <div className="submit-privacy-lock">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Confidential &amp; protected by consumer privacy standards.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* 2. DIRECT CHANNELS / CONSUMER CARE DESK SECTION BELOW */}
          <div className="consumer-desk-below-card">
            <div className="cdb-top-row">
              <div className="cdb-header-col">
                <div className="desk-eyebrow-row">
                  <span className="desk-eyebrow">DIRECT CHANNELS</span>
                  <span className="desk-eyebrow-line" />
                </div>
                <h3 className="desk-title">Consumer Care Desk</h3>
                <p className="desk-subtitle">
                  Need immediate support? Reach our customer relations and quality dispute desk directly:
                </p>
              </div>

              {/* Operating Hours Divider */}
              <div className="cdb-hours-box">
                <svg className="clock-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div className="hours-text">
                  <div className="hours-title" style={{ color: "#991b1b", fontWeight: 800, fontSize: "0.85rem" }}>Operating Hours</div>
                  <div className="hours-desc" style={{ color: "#374151", fontSize: "0.78rem", lineHeight: 1.4 }}>
                    Monday – Friday, 8:00 AM – 5:00 PM (West Africa Time). Email tickets and consumer inquiries are handled promptly.
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Channels Horizontal Grid */}
            <div className="cdb-channels-grid">
              {/* 1. Primary Consumer Email */}
              <a href="mailto:Info@taggrifarms.com" className="cdb-channel-item">
                <div className="dci-left">
                  <div className="dci-icon-circle dci-icon--red">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="dci-label">CONSUMER SUPPORT EMAIL</div>
                    <div className="dci-val dci-val--bold">Info@taggrifarms.com</div>
                  </div>
                </div>
                <span className="dci-arrow">›</span>
              </a>

              {/* 2. Quality & Batch Escalation Email */}
              <a href="mailto:Info@tgagrifarms.com" className="cdb-channel-item">
                <div className="dci-left">
                  <div className="dci-icon-circle dci-icon--red">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="dci-label">QUALITY &amp; BATCH INQUIRIES</div>
                    <div className="dci-val dci-val--bold">Info@tgagrifarms.com</div>
                  </div>
                </div>
                <span className="dci-arrow">›</span>
              </a>

              {/* 3. Factory Address */}
              <div className="cdb-channel-item cdb-channel-item--static">
                <div className="dci-left">
                  <div className="dci-icon-circle dci-icon--red">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="dci-label">FACTORY &amp; QUALITY LAB ADDRESS</div>
                    <div className="dci-val dci-val--address">
                      KM 5, Itokin Road, Itamope, Ikorodu Expressway, Lagos, Nigeria
                    </div>
                  </div>
                </div>
                <span className="dci-arrow">›</span>
              </div>
            </div>

            {/* Fresh Red Chilli Graphic at Corner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/grievance-chillies.png"
              alt="Fresh Goodearth red chillies"
              className="cdb-corner-chillies"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Verified Customer Reviews Showcase */}
      <section className="section section--cream2 grievance-reviews-showcase">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Customer Voice</span>
            <h2>Loved by Nigerian Cooks &amp; Kitchens</h2>
            <p className="subtitle">
              Every day, families, bukka owners, and chefs count on Goodearth for authentic fiery pungency and pristine purity.
            </p>
          </div>

          <div className="reviews-cards-grid">
            {SAMPLE_REVIEWS.map((rev) => (
              <div key={rev.name} className="review-card">
                <div className="review-top-row">
                  <div className="review-stars">
                    {"★".repeat(rev.rating)}
                  </div>
                  <span className="review-date">{rev.date}</span>
                </div>
                <h3 className="review-title">&ldquo;{rev.title}&rdquo;</h3>
                <p className="review-body">{rev.body}</p>
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{rev.name.charAt(0)}</div>
                  <div>
                    <div className="reviewer-name">{rev.name}</div>
                    <div className="reviewer-sub">
                      {rev.product} • {rev.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ Accordion */}
      <section className="section grievance-faq-section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Resolution &amp; Assistance</span>
            <h2>Frequently Asked Questions</h2>
            <p className="subtitle">
              Everything you need to know about batch checks, replacements, and our consumer relations commitment.
            </p>
          </div>

          <div className="faq-accordion-wrap">
            {FAQS.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-chevron">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
