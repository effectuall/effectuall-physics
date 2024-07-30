// Hero.jsx
import React from 'react';
import { Link} from 'react-router-dom'

const Footer = () => {
  return (
   
    //   <div className="bg-[#164F63] text-white text-center p-4">
    //   <div  id="contact">
           
    //        <div className="flex md:flex-row flex-col justify-between md:items-center mt-2">
    //        <ul className="nav-menu flex space-x-4">
    //          <li>  
    //              <a href="/" className="text-blue-700"> <img src="/logo.svg" alt="Download on the App Store" className="h-6" /></a>
    //           </li>
    //              <li >
    //                <a href="#body" className="text-white-700 hover:text-blue-500">Home</a>
    //              </li>
    //              <li>
    //                <a href="/dashboard" className="text-white-700 hover:text-blue-500">Dashboard</a>
    //              </li>
    //              <li>
    //                <a href="/dashboard/invoices" className="text-white-700 hover:text-blue-500">Invoices</a>
    //              </li>
                
    //            </ul>
    //          <div>
    //            <div className="flex flex-col md:items-end md:mt-0 mt-6">
             
    //              <a className="md:mt-0 mt-2" href="mailto:info@effectuall.com">
    //                info@effectuall.com
    //              </a>
    //            </div>
    //          </div>
    //        </div>
    //      </div>
    //      {/* <div className="w-full h-[0.5px] mb-5 mt-8 bg-white rounded-full" />
    //      <div className="flex md:flex-row flex-col justify-between pb-8">
    //        <div>© Copyright 2020-2023 Effectual Learning. All rights reserved</div>
    //        <div className="flex md:flex-row flex-col md:gap-10 gap-5 md:mt-0 mt-4">
    //          <Link href="">Submit a feedback</Link>
    //          <Link href="">Terms</Link>
    //          <Link href="">Policies</Link>
    //        </div>
    //      </div>
    //    </div> */}
    //    Follow us on: 
    //       <div className="container mx-auto mb-8"> 
    //        <a href="https://www.linkedin.com/company/effectual-learning/" target="_blank" rel="noopener noreferrer" className="text-white-600 hover:underline">
    //          LinkedIn
    //        </a>
    //        <span className="mx-4">|</span>
    //        <a href="https://www.facebook.com/profile.php?id=61554729165510" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
    //          Facebook
    //        </a>
    //        <span className="mx-4">|</span>
    //        <a href="https://www.instagram.com/effectuallearning" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
    //          Instagram
    //        </a>
    //        <span className="mx-4">|</span>
    //        <a href="https://www.youtube.com/channel/UCFSMjn_YssD7Y1ybBwZb3mw" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
    //          YouTube
    //        </a>
    //      </div>
          
    //      Support the work
    //      <form action="https://www.paypal.com/donate" method="post" target="_top">
    //        <input type="hidden" name="hosted_button_id" value="ZTQ5RKXFNFB26" />
    //        <input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit"
    //          title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          
    //      </form>
   
    //        <div className="container mx-auto">
    //          <p>&copy; 2024 EffectualL LLC Physics 3D  simulation. All rights reserved.</p>
    //        </div>
         
      
    // </div>
  
    <div className="bg-[#164E63] md:px-[80px] px-4 mt-32 text-white" id="contact">
        <div className="md:pt-14 pt-6">
        <div id="logo" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <a href="/" className="text-blue-700 flex"> <img src="/logo.svg" alt="effectuall" className="h-8" /></a>
            </h1>
          </div>
      <div className="flex md:flex-row flex-col justify-between md:items-center mt-2">
        <div className="flex md:flex-row flex-col md:items-center md:gap-8 gap-4 text-base leading-5 font-normal text-[#F3F4F6] md:mt-0 mt-4">
          <Link to="/" className="text-[#fff] md:opacity-60 md:hover:opacity-100 md:hover:border-b-2 px-1 transition-all duration-75">Home</Link>
          <Link to="/about" className="text-[#fff] md:opacity-60 md:hover:opacity-100 md:hover:border-b-2 px-1 transition-all duration-75">About Us</Link>
          <Link to="/dashboard" className="text-[#fff] md:opacity-60 md:hover:opacity-100 md:hover:border-b-2 px-1 transition-all duration-75">Dashboard</Link>
          <Link to="/dashboard/scene" className="text-[#fff] md:opacity-60 md:hover:opacity-100 md:hover:border-b-2 px-1 transition-all duration-75">3D Scene</Link>
          {/* <Link href="#contact" className="text-[#fff] md:opacity-60 md:hover:opacity-100 md:hover:border-b-2 px-1 transition-all duration-75">Contact</Link> */}
        </div>
        <div>
          <div className="flex flex-col md:items-end md:mt-0 mt-6">
            <div className="flex gap-3 items-center">
              Follow us on:
              <Link to="https://www.linkedin.com/company/effectual-learning/" target="_blank">
              <i className="fa-brands fa-linkedin-in"></i>
              </Link>
              <Link to="https://twitter.com/effectualearner" target="_blank">
              <i className="fa-brands fa-x-twitter"></i>
              
              </Link>
              <Link to="https://www.facebook.com/profile.php?id=61554729165510" target="_blank">
              <i className="fa-brands fa-facebook-f"></i>
              </Link>
            </div>
            <Link className="md:mt-0 mt-2" to="mailto:info@effectuall.com">
              info@effectuall.com
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full h-[0.5px] mb-5 mt-8 bg-white rounded-full" />
    <div className="flex md:flex-row flex-col justify-between pb-8">
      <div>© Copyright 2024 EffectualL LLC. All rights reserved</div>
      <div className="flex md:flex-row flex-col md:gap-10 gap-5 md:mt-0 mt-4">
        <Link href="">Submit a feedback</Link>
        <Link href="">Terms</Link>
        <Link href="">Policies</Link>
      </div>
    </div>
  </div>

  );
};

export default Footer;
