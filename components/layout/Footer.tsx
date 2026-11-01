import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { FOOTER_LINKS, FOOTER_SERVICE_LINKS } from "@/constants/data";

export function Footer() {
  return (
    <footer>
      <section className="newsletter">
        <div className="newsletter-right">
          <div className="newsletter-right-title">خبرنامه</div>
          <div className="newsletter-right-text">
            با عضویت در خبرنامه از آخرین تخفیف ها و جشنواره های ما مطلع شوید.
          </div>
        </div>
        <div className="newsletter-left">
          <NewsletterForm variant="footer" />
        </div>
      </section>
      <section className="main-footer">
        <div className="support-col p-left col border-left">
          <MaterialIcon name="call_quality" />
          <div className="support-col-phone">
            <div className="phone">
              {/* Replace with your support phone number. */}
              <span className="prefix" />
              <span className="main-phone" />
            </div>
            <div className="descripion">{/* Replace with your support hours. */}</div>
          </div>
          <div className="address">{/* Replace with your address. */}</div>
        </div>
        <div className="links-col p-left border-left">
          <div className="links-title">
            <MaterialIcon name="attachment" />
            <div className="links-title-text">لینک ها</div>
          </div>
          <div className="links-content">
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href}>{link.title}</Link>
                  ) : (
                    <a href={link.href}>{link.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="services-col border-left">
          <div className="services-title">
            <MaterialIcon name="attachment" />
            <div className="services-title-text">خدمات مشتریان</div>
          </div>
          <div className="links-content">
            <ul>
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="e-namad-col border-left">
          <a href="#">
            <Image src="/images/placeholder.png" alt="" width={69} height={100} />
          </a>
        </div>
        <div className="descriptin-col">
          <div className="descriptin-content">
            {/* Replace with your company description. */}
            <p className="company-description" />
            <p className="justify" />
          </div>
          <div className="social-media">
            <p className="social-media-text">ما را در شبكه های اجتماعی دنبال کنید</p>

            <a href="#" aria-label="اینستاگرام">
              <Image
                width={48}
                height={48}
                src="https://img.icons8.com/fluency/48/instagram-new.png"
                alt="instagram-new"
              />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
