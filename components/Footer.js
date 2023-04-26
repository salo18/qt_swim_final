import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p>
        Created with &#x1F499; by{" "}
        <a href="https://www.linkedin.com/in/salo-mizrachi-0b885432/">Salo</a>
      </p>
      <p>
        <a href="https://github.com/salo18/qt_swim_final">
          Code for this project
        </a>
      </p>
      <Link href="/privacy" className="footerLink">
        Privacy
      </Link>
      <Link href="/terms" className="footerLink">
        Terms and Conditions
      </Link>
    </footer>
  );
}
