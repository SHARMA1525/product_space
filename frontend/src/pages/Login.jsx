import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Authentication failed. Please verify credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Access Nexus" 
      subtitle="Sign in to your secure terminal to continue operations."
      brandingTitle="NEXUS"
      brandingDesc="Initialize secure handshake with the decentralized mainframe. All data is encrypted with post-quantum protocols."
    >
      <form onSubmit={onSubmit}>
        {error && <div className="status-msg status-error animate-slide-up">{error}</div>}
        
        <div className="input-group">
          <label>Encrypted Identity (Email)</label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={onChange} 
            required 
            placeholder="identity@nexus.sh"
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label>Security Keyphrase (Password)</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            required 
            placeholder="••••••••••••"
          />
        </div>

        <button type="submit" className="btn-pill" disabled={loading}>
          {loading ? 'Decrypting...' : 'Initialize Access'}
        </button>

        <Link to="/signup" className="auth-link">
          New to the mainframe? <span>Register Identity</span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Login;
