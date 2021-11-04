import React from "react";
import "./Footer.scss";
import fiverr_footer from "assets/images/fiverr_footer.svg";
import facebook from "assets/images/facebook.svg";
import instagram from "assets/images/instagram.svg";
import acessibility from "assets/images/acessibility.svg";
import global from "assets/images/global.svg";
import linkedin from "assets/images/linkedin.svg";
import printerest from "assets/images/printerest.svg";
import twitter from "assets/images/twitter.svg";
export default function Footer() {
  return (
    <footer>
      <div className="border-t-2 border-opacity-40 border-gray-300">
        <div className="container-fluid max-w-7xl mx-auto">
          <div className="grid grid-cols-5">
            <div>
              <ul className="list-none text-justify leading-loose">
                <li className="font-bold">Categories</li>
                <li>Graphics & Design</li>
                <li>Digital Marketing</li>
                <li>Writing & Translation</li>
                <li>Video & Animation</li>
                <li>Music & Audio</li>
                <li>Programming & Tech</li>
                <li>Data</li>
                <li>Business</li>
                <li>Lifestyle</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div>
              <ul className="list-none text-justify leading-loose">
                <li className="font-bold">About</li>
                <li>Carrers</li>
                <li>Press & News</li>
                <li>Partnerships</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Intellectual Property Claims</li>
                <li>Investor Relations</li>
              </ul>
            </div>
            <div>
              <ul className="list-none text-justify leading-loose">
                <li className="font-bold">Support</li>
                <li>Help & Support</li>
                <li>Trust & Safety</li>
                <li>Selling on Fiverr</li>
                <li>Buying on Fiverr</li>
              </ul>
            </div>
            <div>
              <ul className="list-none text-justify leading-loose">
                <li className="font-bold">Community</li>
                <li>Events</li>
                <li>Blog</li>
                <li>Forum</li>
                <li>Community Standards</li>
                <li>Podcast</li>
                <li>Affiliates</li>
                <li>Invite a Friend</li>
                <li>Become a Seller</li>
                <li>
                  Fiverr Elevate
                  <span className="block opacity-60">Exclusive Benefits</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-none text-justify leading-loose">
                <li className="font-bold">More From Fiverr</li>
                <li>Fiverr Business</li>
                <li>Fiverr Pro</li>
                <li>Fiverr Studios</li>
                <li>Fiverr Logo Maker</li>
                <li>Fiverr Guides</li>
                <li>Get Inspired</li>
                <li>
                  ClearVoice
                  <span className="block opacity-60">Content Marketing</span>
                </li>
                <li>
                  AND CO
                  <span className="block opacity-60">Invoice Software</span>
                </li>
                <li>
                  Learn
                  <span className="block opacity-60">Online Courses</span>
                </li>
                <li>Working Not Working</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom border-t-2 my-16">
        <div className="flex justify-between py-8">
          <div className="flex footer__left">
            <div className="footer__logo">
              <img src={fiverr_footer} alt="Fiverr Footer" />
            </div>
            <div className="footer__inc">
              <p>
                <span>© </span>Fiverr International Ltd. 2021
              </p>
            </div>
          </div>
          <div className="flex footer__right justify-between">
            <div className="footer__icons">
              <ul className="list-none">
                <li>
                  <span>
                    <img src={twitter} alt="twitter" />
                  </span>
                </li>
                <li>
                  <span>
                    <img src={facebook} alt="facebook" />
                  </span>
                </li>
                <li>
                  <span>
                    <img src={linkedin} alt="linkedin" />
                  </span>
                </li>
                <li>
                  <span>
                    <img src={printerest} alt="printerest" />
                  </span>
                </li>
                <li>
                  <span>
                    <img src={instagram} alt="instagram" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="footer__ultis flex">
              <p>
                <span className="inline-block">
                  <img src={global} alt="global" />
                </span>
                English
              </p>
              <p>
                <span>$</span>USD
              </p>
              <p>
                <span>
                  <img src={acessibility} alt="acessibility" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
