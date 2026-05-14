import React from 'react';
import brandingImg from '../assets/branding-bg.png';

const AuthLayout = ({ children, title, subtitle, brandingTitle, brandingDesc }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card animate-cinematic">
        <div className="auth-section-left">
          <div className="label-micro animate-slide-up">Authentication Protocol</div>
          <h1 className="auth-title animate-slide-up">{title}</h1>
          <p className="auth-subtitle animate-slide-up">{subtitle}</p>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {children}
          </div>
        </div>

        <div 
          className="auth-section-right animate-cinematic" 
          style={{ backgroundImage: `url(${brandingImg})` }}
        >
          <div className="micro-typography">NEXUS_OS // VER 4.0.2</div>
          <div className="branding-text animate-slide-up">
            <h2>{brandingTitle}</h2>
            <p>{brandingDesc}</p>
            <div style={{ 
              marginTop: '30px', 
              width: '40px', 
              height: '1px', 
              background: '#fff' 
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
