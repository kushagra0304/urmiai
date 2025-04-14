import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './landing.css';

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Use framer-motion's useScroll hook instead of manual scroll handling
  const { scrollY } = useScroll();
  
  // Create motion values that transform based on scroll position
  // Enhanced 3D movement for text going up with more dramatic parallax
  const logoY = useTransform(scrollY, [0, 250, 500], [0, -180, -220]);
  const logoZ = useTransform(scrollY, [0, 250, 500], [0, 200, 300]);
  // Enhanced scaling and perspective for more dramatic 3D effect
  const logoScale = useTransform(scrollY, [0, 250, 500], [1, 1.25, 1.3]);
  const logoOpacity = useTransform(scrollY, [0, 250, 500], [1, 0.9, 0.85]);
  // More dramatic letter spacing for enhanced 3D look
  const logoSpacing = useTransform(scrollY, [0, 250, 500], [0, 12, 16]);
  
  // Modified video transform with stop point
  // Video will move down until 200px scroll, then stop at 120px position
  const videoY = useTransform(
    scrollY, 
    [0, 100, 400, 600], 
    [0, 300, 300, 300]
  );
  
  // Create smoother animation for video position
  const smoothVideoY = useSpring(videoY, {
    stiffness: 80,
    damping: 30,
    mass: 1.2,
    restDelta: 0.0005
  });
  
  // Adjust z-index and scale to complement the stopped y motion
  const videoZ = useTransform(scrollY, [0, 100, 600], [0, 200, 200]);
  const videoScale = useTransform(scrollY, [0, 100, 600], [1, 1.2, 1.2]);
  const videoBlur = useTransform(scrollY, [0, 100, 600], [0, 1.2, 1.2]);
  
  // Enhanced tagline movement for more dramatic parallax effect
  const taglineY = useTransform(scrollY, [0, 250, 500], [0, -200, -250]);
  const taglineZ = useTransform(scrollY, [0, 250, 500], [0, 120, 180]);
  // More dramatic scale for enhanced 3D appearance
  const taglineScale = useTransform(scrollY, [0, 250, 500], [1, 1.15, 1.2]);
  const taglineOpacity = useTransform(scrollY, [0, 500], [1, 0.8]);
  const taglineSpacing = useTransform(scrollY, [0, 250, 500], [0, 5, 7]);
  
  // Enhanced vertical text movement
  const verticalTextY = useTransform(scrollY, [0, 250, 500], [0, -30, -45]);
  const verticalTextX = useTransform(scrollY, [0, 250, 500], [0, 25, 35]);
  const verticalTextOpacity = useTransform(scrollY, [0, 500], [1, 0.7]);
  const verticalTextRotate = useTransform(scrollY, [0, 500], [180, 175]);
  
  // Enhanced 3D rotation for more dramatic effect
  const heroRotateX = useTransform(scrollY, [0, 250, 500], [0, 10, 12]);
  // Adding perspective distance for deeper 3D effect
  const heroPerspective = useTransform(scrollY, [0, 500], [1000, 600]);

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-navbar">
        {/* Logo */}
        <div className="landing-nav-logo">
          URMI.AI
        </div>
        
        {/* Navigation Links */}
        <div className="landing-nav-links">
          <Link to="/" className="landing-nav-link active">Overview</Link>
          <Link to="/document" className="landing-nav-link">Document</Link>
          <Link to="/messages" className="landing-nav-link">Messages</Link>
          <Link to="/labs" className="landing-nav-link">Labs</Link>
        </div>
        
        {/* Login Button & Avatar */}
        <div className="landing-nav-right">
          <Link to="/login" className="landing-nav-button login-button">
            Login
          </Link>
          <div className="avatar"></div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <motion.div 
        className="hero-section" 
        ref={heroRef}
        style={{ 
          rotateX: heroRotateX,
          perspective: heroPerspective
        }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-logo" 
            style={{ 
              y: logoY,
              z: logoZ,
              scale: logoScale,
              opacity: logoOpacity,
              letterSpacing: logoSpacing,
              textShadow: useTransform(
                scrollY,
                [0, 500],
                ['0px 0px 0px rgba(255, 64, 124, 0.3)', '2px 4px 8px rgba(255, 64, 124, 0.5)']
              )
            }}
          >
            URMI.AI
          </motion.h1>
          
          <motion.p 
            className="hero-tagline" 
            style={{ 
              y: taglineY,
              z: taglineZ,
              scale: taglineScale,
              opacity: taglineOpacity,
              letterSpacing: taglineSpacing
            }}
          >
            Revolutionizing AI-Powered Voice Interactions
          </motion.p>
        </div>
        
        <div className="video-container">
          <motion.div 
            className="video-circle"
            style={{ 
              y: smoothVideoY,
              z: videoZ,
              scale: videoScale,
              filter: useTransform(videoBlur, (value) => `blur(${value}px)`),
              boxShadow: useTransform(
                scrollY,
                [0, 500],
                ['0 10px 30px rgba(0, 0, 0, 0.5)', '0 20px 50px rgba(0, 0, 0, 0.7)']
              )
            }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              src="/assets/video.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
        
        <motion.div 
          className="vertical-text"
          style={{ 
            y: verticalTextY,
            x: verticalTextX,
            opacity: verticalTextOpacity,
            textShadow: useTransform(
              scrollY,
              [0, 500],
              ['none', '1px 1px 3px rgba(255, 255, 255, 0.2)']
            )
          }}
        >
          <motion.p style={{ transform: `rotate(${verticalTextRotate}deg)` }}>
            Your On-the-go AI Assistant
          </motion.p>
        </motion.div>

      </motion.div>
      
      {/* Content sections will go here */}
      <div className="landing-content">
        <div className="spacer"></div>
        <section className="feature-section">
          <div className="feature-bg">
            <svg width="1300" height="400" viewBox="0 0 1520 569" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M204.674 568.033C163.111 568.033 127.004 560.24 96.3514 544.654C65.6991 529.068 42.0605 507.507 25.4355 479.972C8.81049 452.437 0.498002 420.746 0.498002 384.898V198.646C0.498002 154.486 9.33002 117.859 26.9941 88.7657C45.1776 59.1524 69.8553 37.0723 101.027 22.5255C132.719 7.97864 168.826 0.705207 209.349 0.705207C249.873 0.705207 284.941 7.45911 314.554 20.9669C344.687 34.4747 367.806 53.9571 383.912 79.4141C400.537 104.871 408.849 135.264 408.849 170.592H307.541C307.541 148.771 300.007 129.809 284.941 113.703C269.875 97.5977 244.677 89.545 209.349 89.545C174.541 89.545 147.525 98.6368 128.303 116.82C109.599 135.004 100.248 160.201 100.248 192.412V248.521H114.275C123.107 238.131 136.615 228.26 154.799 218.908C172.982 209.557 199.478 204.881 234.287 204.881C265.978 204.881 295.072 211.635 321.568 225.142C348.584 238.65 370.404 258.392 387.029 284.369C403.654 309.826 411.966 340.738 411.966 377.105V386.457C411.966 422.304 403.394 453.996 386.25 481.531C369.105 508.546 344.947 529.847 313.775 545.433C282.603 560.5 246.236 568.033 204.674 568.033ZM206.232 479.193C238.963 479.193 264.679 470.621 283.382 453.476C302.605 436.332 312.216 413.472 312.216 384.898V378.664C312.216 359.441 307.8 342.816 298.968 328.789C290.656 314.762 278.447 303.851 262.341 296.058C246.756 288.265 228.052 284.369 206.232 284.369C184.931 284.369 166.228 288.265 150.123 296.058C134.017 303.851 121.549 314.762 112.717 328.789C104.404 342.816 100.248 359.441 100.248 378.664V384.898C100.248 413.472 109.599 436.332 128.303 453.476C147.525 470.621 173.502 479.193 206.232 479.193ZM695.758 568.033C631.336 568.033 579.643 550.369 540.678 515.041C501.713 479.193 482.231 425.162 482.231 352.947V215.791C482.231 145.654 501.713 92.4024 540.678 56.0353C579.643 19.1486 631.336 0.705207 695.758 0.705207C760.699 0.705207 812.392 19.1486 850.838 56.0353C889.803 92.4024 909.285 145.654 909.285 215.791V352.947C909.285 425.162 889.803 479.193 850.838 515.041C812.392 550.369 760.699 568.033 695.758 568.033ZM695.758 479.193C734.723 479.193 763.297 468.543 781.48 447.242C800.184 425.941 809.535 395.549 809.535 356.064V211.115C809.535 171.111 799.144 140.979 778.363 120.717C758.102 99.9356 730.566 89.545 695.758 89.545C659.91 89.545 631.856 100.195 611.594 121.496C591.852 142.797 581.981 172.67 581.981 211.115V356.064C581.981 397.107 591.332 428.019 610.035 448.8C629.258 469.062 657.832 479.193 695.758 479.193ZM1063.93 567.253L1004.7 519.716L1423.96 1.48449L1483.19 49.0216L1063.93 567.253ZM1392.79 564.916C1353.31 564.916 1322.39 554.525 1300.05 533.744C1277.71 512.443 1266.54 483.609 1266.54 447.242V441.787C1266.54 404.9 1277.71 376.066 1300.05 355.285C1322.39 333.984 1353.31 323.334 1392.79 323.334C1431.23 323.334 1461.89 333.984 1484.75 355.285C1507.61 376.066 1519.04 404.9 1519.04 441.787V447.242C1519.04 483.609 1507.87 512.443 1485.53 533.744C1463.19 554.525 1432.27 564.916 1392.79 564.916ZM1392.79 501.013C1407.86 501.013 1419.55 496.337 1427.86 486.986C1436.69 477.634 1441.11 465.425 1441.11 450.359V437.89C1441.11 422.824 1436.69 410.615 1427.86 401.263C1419.55 391.912 1407.86 387.236 1392.79 387.236C1377.72 387.236 1365.77 391.912 1356.94 401.263C1348.63 410.615 1344.47 422.824 1344.47 437.89V450.359C1344.47 465.425 1348.63 477.634 1356.94 486.986C1365.77 496.337 1377.72 501.013 1392.79 501.013ZM1095.1 245.404C1055.61 245.404 1024.7 235.014 1002.36 214.232C980.022 192.932 968.852 164.098 968.852 127.73V122.275C968.852 85.3887 980.022 56.5548 1002.36 35.7735C1024.7 14.4728 1055.61 3.8224 1095.1 3.8224C1133.54 3.8224 1164.2 14.4728 1187.06 35.7735C1209.91 56.5548 1221.34 85.3887 1221.34 122.275V127.73C1221.34 164.098 1210.17 192.932 1187.83 214.232C1165.49 235.014 1134.58 245.404 1095.1 245.404ZM1095.1 181.502C1110.16 181.502 1121.85 176.826 1130.17 167.475C1139 158.123 1143.41 145.914 1143.41 130.848V118.379C1143.41 103.313 1139 91.1036 1130.17 81.752C1121.85 72.4005 1110.16 67.7247 1095.1 67.7247C1080.03 67.7247 1068.08 72.4005 1059.25 81.752C1050.94 91.1036 1046.78 103.313 1046.78 118.379V130.848C1046.78 145.914 1050.94 158.123 1059.25 167.475C1068.08 176.826 1080.03 181.502 1095.1 181.502Z" fill="url(#paint0_linear_3215_18)" fill-opacity="0.35"/>
              <defs>
                <linearGradient id="paint0_linear_3215_18" x1="1750.39" y1="-209.877" x2="91.8551" y2="825.027" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#55FFBE"/>
                  <stop offset="1" stop-color="#695D66"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="feature-content">
            <div className="feature-img">
              <img src="/assets/urmi-avatar.png" alt="URMI AI Assistant" />
            </div>
            <div className="feature-info">
              <h2>What is URMI?</h2>
              <p>URMI is an advanced AI-driven voice assistant designed to transform customer interactions across various industries. URMI delivers seamless, human-like conversations to enhance customer engagement.</p>
            </div>
          </div>
          <div className="stats-section">
            <div className="blue-divider"></div>
            <div className="stats-container">
              <div className="stats-item">
                <div className="stats-label">
                  <h3>Reduced Operation Costs upto</h3>
                </div>
                <p className="percent">60%</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 