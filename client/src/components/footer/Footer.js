import React from 'react';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube, AiOutlineTwitter, AiOutlineCopyrightCircle } from 'react-icons/ai';
import './footer.css';

const Footer = () => {
    return (
        <div className='footer-section'>
            <div className="footer-wrapper">
                <div className="footer-categories">
                <div className="footer-heading">ONLINE SHOPPING</div>
                <div className="footer-span-container">
                    <span className="footer-span">Fashion</span>
                    <span className="footer-span">Beauty</span>
                    <span className="footer-span">Home Designing</span>
                    <span className="footer-span">Gift Cards</span>
                    <span className="footer-span">DailyShop Insider</span>
                </div>
                
            </div>
            <div className="footer-usefulLiks">
                <div className="footer-heading">USEFUL LINKS</div>
                <div className="footer-span-container">
                    <span className="footer-span">Contact Us</span>
                    <span className="footer-span">FAQ</span>
                    <span className="footer-span">Terms of Use</span>
                    <span className="footer-span">Cancellation</span>
                    <span className="footer-span">Shipping</span>
                    <span className="footer-span">Privacy Policy</span>
                </div>
                
            </div>
            <div className="footer-social">
                <div className="footer-heading">KEEP IN TOUCH</div>
                <div className="footer-span-container-social">
                    <span className="footer-span"><AiOutlineFacebook className='footerSocialIcon' /></span>
                    <span className="footer-span"><AiOutlineInstagram className='footerSocialIcon' /></span>
                    <span className="footer-span"><AiOutlineYoutube className='footerSocialIcon' /></span>
                    <span className="footer-span"><AiOutlineTwitter className='footerSocialIcon' /></span>
                </div>
            </div>
            <div className="footer-additional">
                <div className="footer-heading">ADDITIONAL INFO</div>

            </div>
            </div>

            <div className="footerCopyright">
                <p className="footerCopyPara">DailyShop, All rights reserved!</p>
                <p className="footerCopyPara"><AiOutlineCopyrightCircle /> 2020 www.dailyshop.ds</p>
            </div>
        </div>
    )
}

export default Footer
