import { getFileViewUrl, getFileDownloadUrl } from "../services/appwrite";
import logo from "../assets/images/dbs-min-otptext.svg";
import "../styles/pages.css";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const FILE_ID = import.meta.env.VITE_RESUME_FILE_ID;

const viewUrl = getFileViewUrl(BUCKET_ID, FILE_ID).toString();
const downloadUrl = getFileDownloadUrl(BUCKET_ID, FILE_ID).toString();

export default function Resume() {
  return (
    <div className="page resume-page">
      <div className="resume-card">
        <div className="resume-card__logo">
          <img src={logo} alt="DB Logo" />
        </div>
        <div className="resume-card__content">
          <h1>Resume</h1>
          <p className="page-description">
            View my resume online or grab a copy for your records.
          </p>
          <div className="resume-actions">
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn resume-btn--view"
            >
              View PDF
            </a>
            <a
              href={downloadUrl}
              download="Dave_Burkhart_Resume.pdf"
              className="resume-btn resume-btn--download"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
