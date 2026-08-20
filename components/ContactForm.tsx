"use client";

import { useState } from "react";

const MESSAGE_LIMIT = 750;

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="qbox">
        <b>Thanks — we&apos;ve got your message.</b>
        <p style={{ margin: 0 }}>Someone from MisInsured will follow up with you shortly.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="firstName">
            First Name <span className="req">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="lastName">
            Last Name <span className="req">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" required />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Phone <span className="req">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div className="field">
        <label>Preferred Method of Contact</label>
        <div className="radio-row">
          <label>
            <input type="radio" name="preferredContact" value="phone" defaultChecked /> Phone
          </label>
          <label>
            <input type="radio" name="preferredContact" value="email" /> Email
          </label>
        </div>
      </div>

      <div className="field">
        <label htmlFor="insuranceType">
          Insurance Type <span className="req">*</span>
        </label>
        <select id="insuranceType" name="insuranceType" required defaultValue="">
          <option value="" disabled>
            Select one&hellip;
          </option>
          <option value="property">Property / Homeowners</option>
          <option value="business-interruption">Business Interruption</option>
          <option value="auto">Auto</option>
          <option value="life">Life</option>
          <option value="health-disability">Health / Disability</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="subject">
          Subject <span className="req">*</span>
        </label>
        <input id="subject" name="subject" type="text" required />
      </div>

      <div className="field">
        <label htmlFor="message">
          Message <span className="req">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={MESSAGE_LIMIT}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span className="hint">
          {message.length}/{MESSAGE_LIMIT} characters
        </span>
      </div>

      <label className="consent-row">
        <input type="checkbox" name="consent" required />I agree to the privacy policy.
      </label>

      <p className="privacy-note">
        This form will be sent by email. Email is not a secure form of transmission. Please do not send personal
        information through this form. Your IP address will be captured during submittal but will not be associated
        with your personal information, and will be used to reduce spam.
      </p>

      <button type="submit" className="btn solid" style={{ alignSelf: "flex-start" }}>
        Send Message
      </button>
    </form>
  );
}
