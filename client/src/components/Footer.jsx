import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a
          href="https://github.com/drb2023"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-btn"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/davidburkhart"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-btn"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:drb47303@gmail.com"
          className="footer-social-btn"
          aria-label="Email"
        >
          <FaEnvelope />
        </a>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Dave Burkhart</p>
    </footer>
  );
}
