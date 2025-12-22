import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../lib/contentful/client";
import { UrlObject } from "url";

interface NavigationItem {
  menuLink: any;
  cta?: {
    fields: {
      ctaLink: string;
      ctaText: string;
    };
  };
}


const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer new-footer">
      <div className="container">
        <div className="inner-wrap">

          {/* ================= TOP BAR ================= */}
          <div className="footer-top">
            <div className="footer-top-left mr-[20px] ">
              <Link href="/" className="footer-logo-link">
                <Image
                  src="/brightcode_logo_light.png"
                  width={180}
                  height={48}
                  alt="Bright Code"
                  className="footer-logo footer-logo--light"
                />
                <Image
                  src="/brightcode_logo.png"
                  width={180}
                  height={48}
                  alt="Bright Code"
                  className="footer-logo footer-logo--dark"
                />
              </Link>

              <span className="footer-address-inline ">
                2450 Colorado Ave, Suite 100E Santa Monica, CA 90404
              </span>
            </div>

            <div className="footer-top-right">
              Sophisticated web solutions for smart agencies
            </div>
          </div>

          <div className="footer-divider" />

          {/* ================= GRID ================= */}
          <div className="footer-grid">

            <div className="footer-col">
              <h4>Platform</h4>
              <ul>
                <li><Link href="/white-label-website">White Label Website</Link></li>
                <li><Link href="/legacy-refraction">Legacy Refraction</Link></li>
                <li><Link href="/care-optimization">Care & Optimization</Link></li>
                <li><Link href="/dev-squad-support">Dev Squad Support</Link></li>
                <li><Link href="/image-checker">Image Checker</Link></li>
                <li><Link href="/link-tracker">Link Tracker</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/white-label-website">White Label Website</Link></li>
                <li><Link href="/legacy-refraction">Legacy Refraction</Link></li>
                <li><Link href="/care-optimization">Care & Optimization</Link></li>
                <li><Link href="/dev-squad-support">Dev Squad Support</Link></li>
                <li><Link href="/image-checker">Image Checker</Link></li>
                <li><Link href="/link-tracker">Link Tracker</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Try Our Tools</h4>
              <ul>
                <li><Link href="/security-header">Security Header</Link></li>
                <li><Link href="/link-tracker">Link Tracker</Link></li>
                <li><Link href="/image-checker">Image Checker</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Case Studies</h4>
              <ul>
                <li><Link href="/case-studies/amazon">Amazon</Link></li>
                <li><Link href="/case-studies/google">Google</Link></li>
                <li><Link href="/case-studies/flipkart">Flipkart</Link></li>
                <li><Link href="/case-studies/paypal">Paypal</Link></li>
                <li><Link href="/case-studies/paytm">Paytm</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <Link href="mailto:contact@bright-code.io" className="mb-[40px] inline-block">
                <Image
                  src="/footer-icon-light.svg"
                  width={44}
                  height={44}
                  alt=""
                  className="footer-icon footer-icon--light"
                />
                <Image
                  src="/footer-icon-dark.svg"
                  width={44}
                  height={44}
                  alt=""
                  className="footer-icon footer-icon--dark"
                />
              </Link>

              <div className="telAndEmailWrap mb-[40px] ">
              <Link href="mailto:contact@bright-code.io" className="email">
                contact@bright-code.io
              </Link>

              <Link href="tel:8052150549" className="tel">
                805-215-0549
              </Link>
              </div>

              <div className="footer-socials">
                <Link href="#"><Image src="/linkedin-light.svg" width={18} height={18} alt="" className="social-light" /></Link>
                <Link href="#"><Image src="/linkedin-dark.svg" width={18} height={18} alt="" className="social-dark" /></Link>

                <Link href="#"><Image src="/instagram-light.svg" width={18} height={18} alt="" className="social-light" /></Link>
                <Link href="#"><Image src="/instagram-dark.svg" width={18} height={18} alt="" className="social-dark" /></Link>

                <Link href="#"><Image src="/x-light.svg" width={18} height={18} alt="" className="social-light" /></Link>
                <Link href="#"><Image src="/x-dark.svg" width={18} height={18} alt="" className="social-dark" /></Link>

                <Link href="#"><Image src="/github-light.svg" width={18} height={18} alt="" className="social-light" /></Link>
                <Link href="#"><Image src="/github-dark.svg" width={18} height={18} alt="" className="social-dark" /></Link>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="footer-bottom">
            © {year} Bright Code Technologies Inc
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;


