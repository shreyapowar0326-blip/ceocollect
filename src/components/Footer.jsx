import React from 'react';
import { Recycle, Leaf, Shield, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '40px 20px 24px',
      marginTop: '60px',
      color: '#64748b',
      fontSize: '0.9rem'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '32px',
        marginBottom: '32px'
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <Recycle size={20} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              Eco<span style={{ color: '#10b981' }}>Collect</span>
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
            Empowering citizens and municipal collection services with smart waste classification, real-time dispatch tracking, instant mobile SMS alerts, and environmental rewards.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#0f172a', fontSize: '0.95rem', marginBottom: '14px', fontWeight: 700 }}>Platform Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
            <li><button onClick={() => onNavigate('categories')} style={footerLinkStyle}>♻️ Waste Categories Catalog</button></li>
            <li><button onClick={() => onNavigate('new-request')} style={footerLinkStyle}>📝 Schedule Pickup Request</button></li>
            <li><button onClick={() => onNavigate('track')} style={footerLinkStyle}>🚚 Live Pickup Tracking</button></li>
            <li><button onClick={() => onNavigate('admin')} style={footerLinkStyle}>👨‍💼 Dispatch Admin Dashboard</button></li>
          </ul>
        </div>

        {/* Eco Tip of the day */}
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          padding: '16px',
          borderRadius: '12px'
        }}>
          <h4 style={{ color: '#059669', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
            <Leaf size={16} /> Eco Tip of the Day
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#047857', lineHeight: 1.5, margin: 0 }}>
            "Rinsing food packaging before placing it in the recycling bin prevents cross-contamination and ensures 95%+ of paper and plastics can be reclaimed."
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        paddingTop: '20px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.78rem',
        color: '#64748b'
      }}>
        <span>© 2026 EcoCollect Platform. All rights reserved. Hackathon MVP Edition.</span>
        <span>Built with <Heart size={12} color="#e11d48" style={{ display: 'inline' }} /> for Responsible Waste Disposal</span>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#475569',
  cursor: 'pointer',
  fontSize: '0.85rem',
  padding: 0,
  textAlign: 'left'
};
