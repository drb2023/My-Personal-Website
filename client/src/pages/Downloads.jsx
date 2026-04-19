import { useEffect, useState } from "react";
import { FaDownload, FaFilePdf, FaFileAlt, FaTimes } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { listFiles, getFileDownloadUrl } from "../services/appwrite";
import logo from "../assets/images/dbs-min-otptext.svg";
import qrCode from "../assets/images/qr-code.png";
import "../styles/pages.css";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const BMC_URL = "https://buymeacoffee.com/daveburkhart";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ mimeType }) {
  if (mimeType === "application/pdf")
    return <FaFilePdf className="file-icon file-icon--pdf" />;
  return <FaFileAlt className="file-icon" />;
}

function CoffeeModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <h3>Support My Work</h3>
        <p>Scan the QR code with your phone or click the button below.</p>
        <img src={qrCode} alt="Buy Me a Coffee QR code" className="bmc-qr" />
        <div className="modal-actions">
          <a
            href={BMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bmc-link-btn"
          >
            <SiBuymeacoffee /> buymeacoffee.com/daveburkhart
          </a>
          <button className="project-btn project-btn--repo" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Downloads() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coffeeOpen, setCoffeeOpen] = useState(false);

  useEffect(() => {
    listFiles(BUCKET_ID)
      .then((res) => setFiles(res.files))
      .catch(() => setError("Could not load files. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page downloads-page">
      <div className="downloads-header">
        <img src={logo} alt="DB Logo" className="downloads-logo" />
        <p className="page-description">
          Documents and files available for download. I encourage constructive
          feedback as well as requests. If you are so inclined, I appreciate
          your support of my projects.
        </p>
        <button className="bmc-btn" onClick={() => setCoffeeOpen(true)}>
          <SiBuymeacoffee /> Buy Me a Coffee
        </button>
      </div>

      {loading && <p className="downloads-status">Loading files…</p>}
      {error && (
        <p className="downloads-status downloads-status--error">{error}</p>
      )}

      {!loading && !error && files.length === 0 && (
        <p className="downloads-status">No files available yet.</p>
      )}

      {!loading && !error && files.length > 0 && (
        <ul className="file-list">
          {files.map((f) => (
            <li key={f.$id} className="file-card">
              <div className="file-info">
                <FileIcon mimeType={f.mimeType} />
                <div>
                  <span className="file-name">{f.name}</span>
                  <span className="file-meta">{formatSize(f.sizeOriginal)}</span>
                </div>
              </div>
              <a
                href={getFileDownloadUrl(BUCKET_ID, f.$id)}
                download={f.name}
                className="download-btn"
              >
                <FaDownload /> Download
              </a>
            </li>
          ))}
        </ul>
      )}

      {coffeeOpen && <CoffeeModal onClose={() => setCoffeeOpen(false)} />}
    </div>
  );
}
