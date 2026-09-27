import React, { useState } from 'react';
import { 
  Recycle, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Phone,
  CheckCircle2,
  Leaf,
  Truck,
  Gift,
  Shield,
  Award
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
  const [email, setEmail] = useState('elena.rostova@example.com');
  const [password, setPassword] = useState('••••••••');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [name, setName] = useState('Elena Rostova');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'user') {
      onLogin({
        id: 'user-101',
        name: name || 'Elena Rostova',
        email: email || 'elena.rostova@example.com',
        phone: phone || '+1 (555) 234-5678',
        role: 'user',
        points: 450
      });
    } else {
      onLogin({
        id: 'admin-001',
        name: 'Operations Dispatch Manager',
        email: email || 'admin.dispatch@ecocollect.org',
        phone: '+1 (555) 999-0000',
        role: 'admin',
        points: 9999
      });
    }
  };

  const handleQuickDemoUser = () => {
    onLogin({
      id: 'user-101',
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      phone: '+1 (555) 234-5678',
      role: 'user',
      points: 450
    });
  };

  const handleQuickDemoAdmin = () => {
    onLogin({
      id: 'admin-001',
      name: 'Operations Dispatch Manager',
      email: 'admin.dispatch@ecocollect.org',
      phone: '+1 (555) 999-0000',
      role: 'admin',
      points: 9999
    });
  };

  return (
    <div style={{
      maxWidth: '1080px',
      margin: '20px auto 40px',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '32px'
    }}>
      {/* Top Welcome / Hero section */}
      <div style={{
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        borderRadius: '24px',
        padding: '36px',
        color: '#ffffff',
        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background ambient light */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          pointerEvents: 'none'
        }} />

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}>
          <Recycle size={36} color="#ffffff" />
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Welcome to EcoCollect
        </h1>
        <p style={{ margin: '0 0 20px', fontSize: '1.05rem', opacity: 0.92, maxWidth: '640px', lineHeight: 1.6 }}>
          Smart waste management & instant pickup dispatch portal. Log in to access your User Dashboard or Admin Dispatch Operations.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <span style={heroPillStyle}><CheckCircle2 size={16} /> Instant Pickup Scheduling</span>
          <span style={heroPillStyle}><Truck size={16} /> Live Driver Dispatch Tracking</span>
          <span style={heroPillStyle}><Award size={16} /> EcoPoints & Rewards</span>
          <span style={heroPillStyle}><ShieldCheck size={16} /> Enterprise Operations</span>
        </div>
      </div>

      {/* Main Login Card & Portal Options */}
      <div style={{
        maxWidth: '560px',
        width: '100%',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 15px 45px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden'
      }}>
        {/* Account Type Selector Header */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <button
            type="button"
            onClick={() => {
              setActiveTab('user');
              setEmail('elena.rostova@example.com');
              setName('Elena Rostova');
            }}
            style={{
              flex: 1,
              padding: '18px 16px',
              border: 'none',
              borderBottom: activeTab === 'user' ? '3px solid #10b981' : '3px solid transparent',
              background: activeTab === 'user' ? '#ffffff' : 'transparent',
              color: activeTab === 'user' ? '#059669' : '#64748b',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={20} /> User Portal
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setEmail('admin.dispatch@ecocollect.org');
              setName('Dispatch Operations Admin');
            }}
            style={{
              flex: 1,
              padding: '18px 16px',
              border: 'none',
              borderBottom: activeTab === 'admin' ? '3px solid #059669' : '3px solid transparent',
              background: activeTab === 'admin' ? '#ffffff' : 'transparent',
              color: activeTab === 'admin' ? '#059669' : '#64748b',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={20} /> Admin Portal
          </button>
        </div>

        {/* Login Form Container */}
        <form onSubmit={handleSubmit} style={{ padding: '32px 28px' }}>
          <div style={{
            marginBottom: '24px',
            padding: '12px 16px',
            background: activeTab === 'user' ? '#ecfdf5' : '#f0fdf4',
            borderRadius: '12px',
            border: activeTab === 'user' ? '1px solid #a7f3d0' : '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {activeTab === 'user' ? (
              <UserCheck size={22} color="#059669" />
            ) : (
              <ShieldCheck size={22} color="#047857" />
            )}
            <div>
              <h4 style={{ margin: 0, fontSize: '0.92rem', color: '#065f46', fontWeight: 700 }}>
                {activeTab === 'user' ? 'User Login Account' : 'Admin Operations Login'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#047857' }}>
                {activeTab === 'user' 
                  ? 'Access your citizen dashboard, request pickups, track dispatches & claim rewards.'
                  : 'Manage all pickup dispatches, collector assignments & municipal analytics.'}
              </p>
            </div>
          </div>

          {activeTab === 'user' && (
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">Email Address:</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {activeTab === 'user' && (
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Mobile Contact (for Live SMS Dispatches):</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password:</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', borderRadius: '14px', padding: '14px', marginBottom: '20px' }}
          >
            Log In to {activeTab === 'user' ? 'User Dashboard' : 'Admin Dashboard'} <ArrowRight size={18} />
          </button>

          {/* Quick Demo Credentials */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 10px', fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              ⚡ Quick Demo 1-Click Login:
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleQuickDemoUser}
                style={{
                  flex: 1,
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                }}
              >
                <UserCheck size={16} /> Login as User
              </button>
              
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                style={{
                  flex: 1,
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
                }}
              >
                <ShieldCheck size={16} /> Login as Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const heroPillStyle = {
  background: 'rgba(255, 255, 255, 0.18)',
  backdropFilter: 'blur(8px)',
  color: '#ffffff',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '0.84rem',
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px'
};
