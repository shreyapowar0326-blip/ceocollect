import React from 'react';
import { 
  Recycle, 
  PlusCircle, 
  Truck, 
  LayoutDashboard, 
  BarChart3, 
  Bot, 
  Gift, 
  Grid,
  Award,
  ShieldCheck,
  UserCheck,
  LogOut,
  LogIn,
  MessageSquare
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onOpenLogin, 
  onLogout,
  onOpenSmsDrawer,
  userPoints, 
  requestsCount,
  smsCount 
}) {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Top Banner Notice */}
      <div style={{
        background: 'linear-gradient(90deg, #ecfdf5 0%, #f0fdf4 100%)',
        borderBottom: '1px solid #a7f3d0',
        padding: '6px 20px',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        color: '#065f46'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge" style={{ background: '#10b981', color: '#ffffff', padding: '2px 8px' }}>
            🌱 Eco Collect 2026
          </span>
          <span style={{ fontWeight: 600 }}>Smart Recycling & Instant Mobile SMS Dispatch Platform</span>
        </div>
        
        {/* User Account State & Role Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                {currentUser.role === 'admin' ? <ShieldCheck size={14} color="#059669" /> : <UserCheck size={14} color="#10b981" />}
                Logged in as: <strong>{currentUser.name} ({currentUser.role.toUpperCase()})</strong>
              </span>
              <button
                onClick={onLogout}
                style={{
                  background: '#ffe4e6',
                  color: '#be123c',
                  border: 'none',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <LogOut size={12} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              style={{
                background: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '4px 14px',
                borderRadius: '14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <LogIn size={12} /> Log In / Switch Account
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab(currentUser?.role === 'admin' ? 'admin' : currentUser ? 'user-dashboard' : 'login')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
          }}>
            <Recycle size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                Eco<span style={{ color: '#10b981' }}>Collect</span>
              </span>
              <span style={{ 
                fontSize: '0.65rem', 
                background: '#ecfdf5', 
                color: '#059669', 
                padding: '1px 6px', 
                borderRadius: '4px',
                fontWeight: 800,
                border: '1px solid #a7f3d0'
              }}>LIVE SMS</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>Smart Recycling & Pickup Platform</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {!currentUser ? (
            <button
              onClick={() => setActiveTab('login')}
              style={navBtnStyle(activeTab === 'login')}
            >
              <LogIn size={16} /> Login Page
            </button>
          ) : (
            <>
              {currentUser.role === 'admin' ? (
                <button
                  onClick={() => setActiveTab('admin')}
                  style={navBtnStyle(activeTab === 'admin')}
                >
                  <LayoutDashboard size={16} /> Admin Dashboard
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('user-dashboard')}
                  style={navBtnStyle(activeTab === 'user-dashboard')}
                >
                  <LayoutDashboard size={16} /> User Dashboard
                </button>
              )}

              <button
                onClick={() => setActiveTab('categories')}
                style={navBtnStyle(activeTab === 'categories')}
              >
                <Grid size={16} /> Categories
              </button>

              <button
                onClick={() => setActiveTab('new-request')}
                style={navBtnStyle(activeTab === 'new-request')}
              >
                <PlusCircle size={16} /> Request Pickup
              </button>

              <button
                onClick={() => setActiveTab('track')}
                style={navBtnStyle(activeTab === 'track')}
              >
                <Truck size={16} /> Live Tracking 
                {requestsCount > 0 && (
                  <span style={badgeCountStyle}>
                    {requestsCount}
                  </span>
                )}
              </button>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  style={navBtnStyle(activeTab === 'admin')}
                >
                  <ShieldCheck size={16} /> Dispatch Operations
                </button>
              )}

              <button
                onClick={() => setActiveTab('analytics')}
                style={navBtnStyle(activeTab === 'analytics')}
              >
                <BarChart3 size={16} /> Impact Stats
              </button>

              <button
                onClick={() => setActiveTab('ai-assistant')}
                style={navBtnStyle(activeTab === 'ai-assistant')}
              >
                <Bot size={16} /> AI Eco Advisor
              </button>

              <button
                onClick={() => setActiveTab('rewards')}
                style={navBtnStyle(activeTab === 'rewards')}
              >
                <Gift size={16} /> Rewards
              </button>
            </>
          )}
        </nav>

        {/* Right Action: SMS Notifications Drawer & Points Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* SMS Drawer Button */}
          <button
            onClick={onOpenSmsDrawer}
            style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#047857',
              padding: '6px 12px',
              borderRadius: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              position: 'relative'
            }}
          >
            <MessageSquare size={16} color="#059669" /> SMS Log
            {smsCount > 0 && (
              <span style={{
                background: '#e11d48',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 800,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'inline-flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                {smsCount}
              </span>
            )}
          </button>

          {/* Points Badge */}
          <div 
            onClick={() => setActiveTab('rewards')}
            style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Award size={16} color="#d97706" />
            <div>
              <span style={{ fontSize: '0.68rem', color: '#b45309', display: 'block', lineHeight: 1, fontWeight: 700 }}>EcoPoints</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#d97706' }}>{userPoints} pts</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function navBtnStyle(isActive) {
  return {
    background: isActive ? '#ecfdf5' : 'transparent',
    color: isActive ? '#047857' : '#475569',
    border: isActive ? '1px solid #a7f3d0' : '1px solid transparent',
    padding: '8px 14px',
    borderRadius: '10px',
    fontSize: '0.88rem',
    fontWeight: isActive ? 700 : 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    textDecoration: 'none'
  };
}

const badgeCountStyle = {
  background: '#10b981',
  color: '#ffffff',
  fontSize: '0.7rem',
  fontWeight: 800,
  padding: '1px 6px',
  borderRadius: '10px',
  marginLeft: '4px'
};
