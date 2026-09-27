import React from 'react';
import { 
  User, 
  Award, 
  Truck, 
  Grid, 
  PlusCircle, 
  Gift, 
  Bot, 
  Clock, 
  CheckCircle2, 
  Leaf, 
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function UserDashboard({ currentUser, requests, userPoints, onNavigate, categories }) {
  // Filter user specific requests
  const userRequests = requests.filter(r => r.userName === currentUser?.name || r.userPhone === currentUser?.phone || true);
  const activeRequests = userRequests.filter(r => ['Pending', 'Confirmed', 'In Transit'].includes(r.status));
  const completedRequests = userRequests.filter(r => r.status === 'Completed');

  // Calculate CO2 saved
  const totalWeightKg = userRequests.reduce((acc, r) => acc + (Number(r.estimatedWeightKg) || 0), 0);
  const co2OffsetKg = (totalWeightKg * 1.85).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner / Welcome Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        borderRadius: '24px',
        padding: '32px 36px',
        color: '#ffffff',
        boxShadow: '0 12px 32px rgba(16, 185, 129, 0.2)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <User size={14} /> Citizen User Portal
            </span>
            <span style={{
              background: '#fffbeb',
              color: '#b45309',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Award size={14} color="#d97706" /> Silver Eco Tier
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>
            Welcome back, {currentUser?.name || 'Elena Rostova'}! 👋
          </h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>
            Manage your scheduled waste pickups, track live eco-collectors, and redeem rewards.
          </p>
        </div>

        {/* EcoPoints Quick Stat Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          minWidth: '220px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)'
          }}>
            <Award size={26} color="#d97706" />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.95, display: 'block', fontWeight: 700 }}>
              Your EcoPoints
            </span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              {userPoints} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>pts</span>
            </span>
          </div>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={kpiIconWrapperStyle('#ecfdf5', '#10b981')}>
            <Truck size={24} color="#059669" />
          </div>
          <div>
            <span style={kpiLabelStyle}>Active Dispatches</span>
            <h3 style={kpiValueStyle}>{activeRequests.length}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={kpiIconWrapperStyle('#eff6ff', '#3b82f6')}>
            <CheckCircle2 size={24} color="#2563eb" />
          </div>
          <div>
            <span style={kpiLabelStyle}>Completed Pickups</span>
            <h3 style={kpiValueStyle}>{completedRequests.length}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={kpiIconWrapperStyle('#fef3c7', '#f59e0b')}>
            <Leaf size={24} color="#d97706" />
          </div>
          <div>
            <span style={kpiLabelStyle}>CO2 Offset</span>
            <h3 style={kpiValueStyle}>{co2OffsetKg} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>kg</span></h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={kpiIconWrapperStyle('#f3e8ff', '#a855f7')}>
            <TrendingUp size={24} color="#9333ea" />
          </div>
          <div>
            <span style={kpiLabelStyle}>Recycled Volume</span>
            <h3 style={kpiValueStyle}>{totalWeightKg} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>kg</span></h3>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}>
          Quick Actions & Services
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {/* Action 1 */}
          <div 
            onClick={() => onNavigate('new-request')}
            className="glass-card glass-card-hover"
            style={actionCardStyle('#ecfdf5', '#10b981')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={actionIconStyle('#10b981')}>
                <PlusCircle size={24} color="#ffffff" />
              </div>
              <ArrowRight size={20} color="#059669" />
            </div>
            <div>
              <h4 style={{ margin: '12px 0 4px', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Schedule Pickup
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Request a doorstep waste collection for e-waste, plastics, paper & metals.
              </p>
            </div>
          </div>

          {/* Action 2 */}
          <div 
            onClick={() => onNavigate('track')}
            className="glass-card glass-card-hover"
            style={actionCardStyle('#eff6ff', '#3b82f6')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={actionIconStyle('#2563eb')}>
                <Truck size={24} color="#ffffff" />
              </div>
              <ArrowRight size={20} color="#2563eb" />
            </div>
            <div>
              <h4 style={{ margin: '12px 0 4px', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Live Tracking
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Track assigned EcoTruck driver dispatches and receive mobile SMS alerts.
              </p>
            </div>
          </div>

          {/* Action 3 */}
          <div 
            onClick={() => onNavigate('categories')}
            className="glass-card glass-card-hover"
            style={actionCardStyle('#faf5ff', '#a855f7')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={actionIconStyle('#9333ea')}>
                <Grid size={24} color="#ffffff" />
              </div>
              <ArrowRight size={20} color="#9333ea" />
            </div>
            <div>
              <h4 style={{ margin: '12px 0 4px', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Waste Catalog
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Explore recyclable categories, guidelines, reward rates & sorting rules.
              </p>
            </div>
          </div>

          {/* Action 4 */}
          <div 
            onClick={() => onNavigate('rewards')}
            className="glass-card glass-card-hover"
            style={actionCardStyle('#fffbeb', '#f59e0b')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={actionIconStyle('#d97706')}>
                <Gift size={24} color="#ffffff" />
              </div>
              <ArrowRight size={20} color="#d97706" />
            </div>
            <div>
              <h4 style={{ margin: '12px 0 4px', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Rewards Store
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Redeem EcoPoints for grocery vouchers, utility discounts & eco goods.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Pickup Requests Section */}
      <div className="glass-card">
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Your Pickup Requests
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
              Live status monitoring for your scheduled waste dispatches
            </p>
          </div>
          <button 
            onClick={() => onNavigate('track')}
            className="btn btn-outline-emerald btn-sm"
          >
            View Live Tracker <ArrowRight size={14} />
          </button>
        </div>

        {userRequests.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: '#f8fafc',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1'
          }}>
            <Truck size={40} color="#94a3b8" style={{ marginBottom: '10px' }} />
            <h4 style={{ margin: '0 0 4px', color: '#334155' }}>No active requests found</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: '#64748b' }}>Schedule your first eco-pickup today to start earning points!</p>
            <button 
              onClick={() => onNavigate('new-request')}
              className="btn btn-primary btn-sm"
            >
              <PlusCircle size={16} /> Schedule Pickup Now
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {userRequests.slice(0, 4).map(req => (
              <div 
                key={req.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    fontSize: '1.2rem'
                  }}>
                    {req.categoryIcon || '♻️'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>#{req.id} - {req.categoryName}</strong>
                      <span className={`badge badge-${req.status.toLowerCase().replace(' ', '')}`}>
                        {req.status}
                      </span>
                    </div>
                    <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                      📍 {req.address} | 📅 {req.scheduledDate} ({req.timeSlot})
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                    +{req.pointsEarned} EcoPoints
                  </span>
                  <button
                    onClick={() => onNavigate('track')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '6px 12px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Track <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function kpiIconWrapperStyle(bgColor, color) {
  return {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: bgColor,
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    flexShrink: 0
  };
}

const kpiLabelStyle = {
  fontSize: '0.82rem',
  color: '#64748b',
  fontWeight: 600,
  display: 'block'
};

const kpiValueStyle = {
  fontSize: '1.4rem',
  fontWeight: 800,
  margin: 0,
  color: '#0f172a'
};

function actionCardStyle(bgColor, borderAccent) {
  return {
    cursor: 'pointer',
    padding: '20px',
    borderRadius: '18px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between',
    gap: '16px'
  };
}

function actionIconStyle(bgColor) {
  return {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: bgColor,
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  };
}
