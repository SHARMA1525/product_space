import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setUser(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        authService.logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const onLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="animate-cinematic" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        width: '100vw',
        fontSize: '0.8rem',
        letterSpacing: '5px',
        textTransform: 'uppercase',
        color: '#888'
      }}>
        Establishing Secure Session...
      </div>
    );
  }

  return (
    <div className="dash-layout animate-cinematic">
      <header className="dash-header">
        <div style={{ letterSpacing: '10px', fontSize: '1.2rem', fontWeight: 800 }}>NEXUS // MAIN_NODE</div>
        <button onClick={onLogout} className="btn-pill" style={{ width: 'auto', padding: '10px 25px', fontSize: '0.7rem' }}>
          Logout
        </button>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="dash-card animate-slide-up">
          <div style={{ marginBottom: '50px' }}>
            <div className="label-micro" style={{ marginBottom: '10px' }}>Identity Overview</div>
            <h1 className="auth-title">Welcome, {user?.username}</h1>
            <p className="auth-subtitle">Operational status: ACTIVE. Your session is currently secured with Product Space.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div className="dash-card" style={{ padding: '30px', margin: 0, background: 'rgba(255,255,255,0.02)' }}>
              <div className="dash-info-row">
                <span className="dash-label">Handle</span>
                <span className="dash-value">{user?.username}</span>
              </div>
              <div className="dash-info-row">
                <span className="dash-label">Registry Email</span>
                <span className="dash-value">{user?.email}</span>
              </div>
            </div>

            <div className="dash-card" style={{ padding: '30px', margin: 0, background: 'rgba(255,255,255,0.02)' }}>
              <div className="dash-info-row">
                <span className="dash-label">Node Identifier</span>
                <span className="dash-value" style={{ fontSize: '0.7rem', color: '#666' }}>{user?.id}</span>
              </div>
              <div className="dash-info-row">
                <span className="dash-label">Initialized on</span>
                <span className="dash-value">{new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '50px', fontSize: '0.6rem', color: '#444', letterSpacing: '2px', textAlign: 'center' }}>
            SECURITY PROTOCOL ACTIVE // ENCRYPTION: POST-QUANTUM // STATUS: SECURE
          </div>
        </div>
      </main>

      <footer style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.6rem', color: '#333', letterSpacing: '3px' }}>
        &copy; 2026 PRODUCT SPACE SYSTEMS INC. // ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};

export default Dashboard;
