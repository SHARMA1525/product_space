import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Keyphrase mismatch detected.');
    }

    setLoading(true);

    try {
      await authService.signup({ username, email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || err.code || 'Identity initialization failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Identity" 
      subtitle="Establish your unique node in the secure network."
      brandingTitle="Product Space"
      brandingDesc="The foundation of secure data sovereignty. Create your immutable identity and join the future."
    >
      <form onSubmit={onSubmit}>
        {error && <div className="status-msg status-error animate-slide-up">{error}</div>}
        
        <div className="input-group">
          <label>Handle (Username)</label>
          <input 
            type="text" 
            name="username" 
            value={username} 
            onChange={onChange} 
            required 
            placeholder="handle_01"
            autoComplete="off"
          />
        </div>

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

        <div className="input-group">
          <label>Verify Keyphrase</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={confirmPassword} 
            onChange={onChange} 
            required 
            placeholder="••••••••••••"
          />
        </div>

        <button type="submit" className="btn-pill" disabled={loading}>
          {loading ? 'Initializing...' : 'Initialize Identity'}
        </button>

        <Link to="/login" className="auth-link">
          Existing Identity? <span>Access Mainframe</span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Signup;
