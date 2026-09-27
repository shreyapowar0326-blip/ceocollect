import React, { useState } from 'react';
import { 
  FileText, 
  PackageCheck, 
  Boxes, 
  GlassWater, 
  Cpu, 
  Leaf, 
  AlertTriangle, 
  Sofa, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Info,
  Sparkles,
  Zap,
  Search
} from 'lucide-react';

const ICON_MAP = {
  FileText,
  PackageCheck,
  Boxes,
  GlassWater,
  Cpu,
  Leaf,
  AlertTriangle,
  Sofa
};

export default function CategoryCatalog({ categories, onSelectCategory, onStartRequest }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.acceptedItems.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
        borderColor: '#a7f3d0',
        padding: '36px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge" style={{ background: '#10b981', color: '#ffffff' }}>
              <Sparkles size={12} /> Responsible Waste Disposal Guide
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '12px', lineHeight: 1.2, color: '#0f172a' }}>
            Select Your <span className="text-gradient-emerald">Waste Category</span> for Quick Pickup
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Properly classifying your recyclable materials ensures maximum resource recovery, protects our environment, and earns you valuable EcoPoints. All process updates are delivered via **Instant SMS**!
          </p>

          {/* Quick Search */}
          <div style={{ position: 'relative', maxWidth: '480px' }}>
            <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search category (e.g., Cardboard, Phone, Glass, Battery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '44px', borderRadius: '14px', background: '#ffffff', borderColor: '#cbd5e1' }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Waste Categories */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f172a' }}>
            Available Collection Categories ({filteredCategories.length})
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Click any category to view disposal guidelines or initiate pickup
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Boxes;
            return (
              <div
                key={cat.id}
                className="glass-card glass-card-hover"
                style={{
                  background: '#ffffff',
                  borderColor: '#e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  gap: '16px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#ecfdf5',
                      border: `1px solid ${cat.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center'
                    }}>
                      <IconComponent size={24} color={cat.color} />
                    </div>

                    <span style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      color: '#d97706',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Zap size={12} /> +{cat.pointsPerKg} pts / kg
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#0f172a' }}>
                    {cat.name}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '14px' }}>
                    {cat.description}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.8rem',
                    color: '#475569'
                  }}>
                    <span>Recyclability: <strong style={{ color: cat.color }}>{cat.recyclability}</strong></span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartRequest(cat.id);
                      }}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      Schedule <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="modal-overlay" onClick={() => setSelectedCategory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              background: '#f8fafc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${selectedCategory.color}15`,
                  border: `1px solid ${selectedCategory.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}>
                  {React.createElement(ICON_MAP[selectedCategory.icon] || Boxes, { size: 26, color: selectedCategory.color })}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>{selectedCategory.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>
                    Earn +{selectedCategory.pointsPerKg} EcoPoints per kilogram collected
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Overview & Details
                </h4>
                <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {selectedCategory.description}
                </p>
              </div>

              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <Info size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#065f46', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                    Preparation Guidelines:
                  </strong>
                  <p style={{ color: '#047857', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                    {selectedCategory.guidelines}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h5 style={{ color: '#059669', fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} /> Accepted Items
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedCategory.acceptedItems.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#10b981' }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h5 style={{ color: '#e11d48', fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <XCircle size={16} /> Prohibited Items
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedCategory.prohibitedItems.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#e11d48' }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justify: 'flex-end',
              gap: '12px',
              background: '#f8fafc'
            }}>
              <button className="btn btn-secondary" onClick={() => setSelectedCategory(null)}>
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const catId = selectedCategory.id;
                  setSelectedCategory(null);
                  onStartRequest(catId);
                }}
              >
                Proceed to Request Pickup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
