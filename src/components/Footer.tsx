export default function Footer() {
  return (
    <footer
      className="page-pad py-20"
      id="contact"
      aria-label="Contact and footer"
    >
      <a
        className="display-md inline-block text-white hover:text-accent-blue-glow transition-colors"
        href="mailto:scaleformoffice@gmail.com"
      >
        LET&rsquo;S TALK <span>&rarr;</span>
      </a>

      <hr className="border-dark-outline my-10" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="font-medium tracking-wide text-dark-on">
            SCALEFORM
          </span>
          <div className="flex gap-6 mt-2">
            <a
              className="label-sm text-dark-on-variant hover:text-accent-blue-glow transition-colors"
              href="mailto:scaleformoffice@gmail.com"
            >
              Email
            </a>
            <a
              className="label-sm text-dark-on-variant hover:text-accent-blue-glow transition-colors"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="label-sm text-dark-on-variant hover:text-accent-blue-glow transition-colors"
              href="https://www.linkedin.com/company/scaleform-o%C3%BC/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <p className="label-sm text-dark-on-variant">
          &copy; 2026 SCALEFORM. BUILT FOR PERMANENCE.
        </p>
      </div>
    </footer>
  );
}
