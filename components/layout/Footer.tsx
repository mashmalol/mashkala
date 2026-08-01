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
              <span className="prefix"> -۹۹ </span>
              <span className="main-phone">۲۴۹۲۴۹ </span>
            </div>
            <div className="descripion">
              پشتیبانی تلفنی از شنبه تا چهارشنبه، 9:00 الی 16 پنجشنبه 9:00 الی 12:00
            </div>
          </div>
          <div className="address">
            بوشهر، عالیشهر، فاز یک، بلوار دانشجو، کوچه متقی (پشت فروشگاه امیرکبیر)، پلاک 7
          </div>
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
            <Image src="/images/enamad.png" alt="" width={69} height={100} />
          </a>
        </div>
        <div className="descriptin-col">
          <div className="descriptin-content">
            <p className="company-description">فروشگاه اینترنتی امیرکبیر کالا</p>
            <p className="justify">فروش محصولات گروه آروا، ایران پتک و رونیکس با تخفیف ویژه</p>
          </div>
          <div className="social-media">
            <p className="social-media-text">ما را در شبكه های اجتماعی دنبال کنید</p>

            <a href="#" aria-label="اینستاگرام امیرکبیر کالا">
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
