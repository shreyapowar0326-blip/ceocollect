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
  CheckCircle2
} from 'lucide-react';

export default function AuthModal({ onLogin, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('citizen'); // 'citizen' | 'admin'
  const [email, setEmail] = useState('elena.rostova@example.com');
  const [password, setPassword] = useState('••••••••');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [name, setName] = useState('Elena Rostova');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'citizen') {
      onLogin({
        id: 'user-101',
        name: name || 'Elena Rostova',
        email: email || 'elena.rostova@example.com',
        phone: phone || '+1 (555) 234-5678',
        role: 'citizen',
        points: 450
      });
    } else {
      onLogin({
        id: 'admin-001',
        name: 'Operations Dispatch Manager',
        email: 'admin.dispatch@ecocollect.org',
        phone: '+1 (555) 999-0000',
        role: 'admin',
        points: 9999
      });
    }
  };

  const handleQuickDemoCitizen = () => {
    onLogin({
      id: 'user-101',
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      phone: '+1 (555) 234-5678',
      role: 'citizen',
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
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px', padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
        {/* Top Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          padding: '32px 28px',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <Recycle size={32} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px', color: '#ffffff' }}>EcoCollect Portal</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
            Log in to manage requests, track dispatches, and earn rewards
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <button
            type="button"
            onClick={() => {
              setActiveTab('citizen');
              setEmail('elena.rostova@example.com');
              setName('Elena Rostova');
            }}
            style={{
              flex: 1,
              padding: '14px',
              border: 'none',
              borderBottom: activeTab === 'citizen' ? '3px solid #10b981' : '3px solid transparent',
              background: activeTab === 'citizen' ? '#ffffff' : 'transparent',
              color: activeTab === 'citizen' ? '#059669' : '#64748b',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '8px'
            }}
          >
            <UserCheck size={18} /> Citizen / User
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
              padding: '14px',
              border: 'none',
              borderBottom: activeTab === 'admin' ? '3px solid #059669' : '3px solid transparent',
              background: activeTab === 'admin' ? '#ffffff' : 'transparent',
              color: activeTab === 'admin' ? '#059669' : '#64748b',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '8px'
            }}
          >
            <ShieldCheck size={18} /> Admin & Dispatch
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '28px', background: '#ffffff' }}>
          {activeTab === 'citizen' && (
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Email Address:</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {activeTab === 'citizen' && (
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Mobile Contact (for Live SMS Alerts):</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
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
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '16px' }}>
            Log In as {activeTab === 'citizen' ? 'Citizen' : 'Admin'} <ArrowRight size={18} />
          </button>

          {/* Quick Demo Shortcuts */}
          <div style={{
            background: '#f1f5f9',
            borderRadius: '12px',
            padding: '14px',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: '#475569'
          }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#0f172a' }}>⚡ Quick Demo One-Click Login:</strong>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleQuickDemoCitizen}
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Login Citizen User
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                style={{
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Login Dispatch Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
