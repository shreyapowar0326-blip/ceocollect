import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Zap, 
  HelpCircle,
  ShieldAlert,
  Info
} from 'lucide-react';

export default function AiWasteAssistant({ knowledgeBase, onSelectCategory }) {
  const [query, setQuery] = useState('');
  const [matchedItem, setMatchedItem] = useState(knowledgeBase[0]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    const found = knowledgeBase.find(k => k.item.toLowerCase().includes(searchTerm.toLowerCase()));
    if (found) {
      setMatchedItem(found);
    } else {
      setMatchedItem({
        item: searchTerm,
        category: 'ewaste',
        cleanable: false,
        instructions: `For household waste items like "${searchTerm}", review disposal rules or group under dry mixed recyclables or specialized e-waste dropoff.`,
        points: 15
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
        borderColor: '#a7f3d0',
        padding: '32px'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-completed">
            <Bot size={12} /> AI Recycling & Disposal Advisor
          </span>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#0f172a' }}>
          Unsure How to Dispose of <span style={{ color: '#059669' }}>Tricky Waste</span>?
        </h2>
        <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '720px', lineHeight: 1.6, marginBottom: '24px' }}>
          Type any item below (e.g., pizza box, lithium battery, paint thinner, old laptop) and our AI Waste Identifier will tell you how to clean, categorize, and schedule pickup for it.
        </p>

        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <Search size={20} color="#059669" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Type item name (e.g., Pizza box, Battery, Light bulb)..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ paddingLeft: '48px', height: '52px', borderRadius: '16px', fontSize: '1rem', background: '#ffffff', borderColor: '#cbd5e1' }}
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Try searching:</span>
          {['pizza box', 'lithium battery', 'plastic soda bottle', 'paint thinners / solvents', 'aluminum soup can'].map(item => (
            <button
              key={item}
              onClick={() => handleSearch(item)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendation Result Card */}
      {matchedItem && (
        <div className="glass-card" style={{
          padding: '32px',
          borderColor: '#a7f3d0',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                AI Classification Result
              </span>
              <h3 style={{ fontSize: '1.8rem', color: '#0f172a', textTransform: 'capitalize', margin: '4px 0 8px' }}>
                Item: {matchedItem.item}
              </h3>
            </div>

            <span className="badge" style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontSize: '0.85rem', padding: '6px 14px' }}>
              <Zap size={14} /> Earn +{matchedItem.points} EcoPoints/kg
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '8px' }}>Correct Waste Category</h4>
              <strong style={{ fontSize: '1.2rem', color: '#059669', textTransform: 'capitalize' }}>
                {matchedItem.category} Category
              </strong>
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '8px' }}>Rinsing & Cleaning Needed?</h4>
              <strong style={{ fontSize: '1.2rem', color: matchedItem.cleanable ? '#059669' : '#d97706' }}>
                {matchedItem.cleanable ? 'Yes - Rinse Food Residue' : 'No Rinsing Required'}
              </strong>
            </div>
          </div>

          <div style={{
            background: '#ecfdf5',
            padding: '20px',
            borderRadius: '14px',
            border: '1px solid #a7f3d0',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}>
            <Sparkles size={24} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#065f46', fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>
                Official Disposal Instructions:
              </strong>
              <p style={{ color: '#047857', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                {matchedItem.instructions}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onSelectCategory(matchedItem.category)}
            >
              Schedule Pickup for {matchedItem.item} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
