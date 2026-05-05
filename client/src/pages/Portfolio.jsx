import { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/pages.css";
import avtechThumbDark from "../assets/images/avtech-logo-dk-bkgnd.png";
// import avtechThumbLight from "../assets/images/avtech-blk-logo-lt-bkgnd.png";
import shippingCalcThumb from "../assets/images/shipping-calculator-thumb.jpg";

const CONTACT_EMAIL = "drb47303@gmail.com";

const PROJECTS = [
  {
    id: 1,
    title: "Shipping Calculator",
    description:
      "A clean, responsive shipping rate calculator that lets users compare real-time rates across multiple carriers (USPS, UPS, FedEx) for a given package and destination. Built with a React frontend and a Node.js/Express backend that proxies carrier API calls.",
    tech: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "Vite",
      "CSS",
    ],
    live: "https://db-shipping-calculator.netlify.app",
    repo: "https://github.com/drb2023/shipping-calculator",
    proprietary: false,
    thumb: shippingCalcThumb,
  },
  {
    id: 2,
    title: "Av-Tech Electronics",
    description:
      "A full-stack web application for Av-Tech Electronics, an emergency vehicle upfitter, featuring shop management tools including: Keylog, Customer Profiles, Vehicle Profiles, Digital Work-Orders, Vehicle Check Sheets, Vehicle Pictures, Tech Time Sheets, Programming Files, & QR Code Linking. Designed to eliminate paper-based processes and increase efficiency in the shop. Built with a React frontend and Appwrite BaaS backend.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
      "Appwrite BaaS",
      "React Router",
      "NHTSA VIN API",
    ],
    live: "https://www.avtechelectronics.app",
    repo: null,
    proprietary: true,
    thumb: avtechThumbDark,
  },
];

function ProprietaryModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <h3>Source Code Unavailable</h3>
        <p>
          This is an active proprietary web application in commercial use.
          Therefore, I cannot share the source code without permission from the
          customer. Requests will be handled on a case-by-case basis.
        </p>
        <div className="modal-actions">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Source Code Request — Av-Tech Electronics`}
            className="project-btn project-btn--live"
          >
            <FaEnvelope /> Contact Me
          </a>
          <button className="project-btn project-btn--repo" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="page portfolio-page">
      <h1>Portfolio</h1>
      <p className="page-description">
        A selection of projects I've designed and built.
      </p>
      <ul className="project-list">
        {PROJECTS.map((p) => (
          <li key={p.id} className="project-card">
            <div className="project-thumb">
              {p.thumb ? (
                <img src={p.thumb} alt={`${p.title} preview`} />
              ) : (
                <span className="project-thumb__label">
                  Preview coming soon
                </span>
              )}
            </div>
            <div className="project-body">
              <h2>{p.title}</h2>
              <p className="project-description">{p.description}</p>
              <div className="project-tags">
                {p.tech.map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn--live"
                  >
                    <FaExternalLinkAlt /> Live App
                  </a>
                )}
                {p.proprietary && (
                  <button
                    className="project-btn project-btn--repo"
                    onClick={() => setModalOpen(true)}
                  >
                    <FaGithub /> Source Code
                  </button>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn--repo"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && <ProprietaryModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
