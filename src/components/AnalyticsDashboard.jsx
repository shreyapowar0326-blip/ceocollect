import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Leaf, 
  Award, 
  Recycle, 
  Globe, 
  Flame, 
  TreePine,
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsDashboard({ requests, categories }) {
  // Compute analytics from current request store
  const totalWeightKg = requests.reduce((acc, r) => acc + (Number(r.estimatedWeightKg) || 0), 0);
  const totalCo2OffsetKg = requests.reduce((acc, r) => acc + (Number(r.co2OffsetKg) || 0), 0).toFixed(1);
  const totalTreesEquiv = (totalWeightKg * 0.04).toFixed(1);
  const recyclingRate = requests.length > 0 ? Math.round((requests.filter(r => r.status === 'Completed').length / requests.length) * 100) : 0;

  // Category weight breakdown
  const categoryStats = categories.map(cat => {
    const catRequests = requests.filter(r => r.category === cat.id);
    const catWeight = catRequests.reduce((acc, r) => acc + (Number(r.estimatedWeightKg) || 0), 0);
    return {
      id: cat.id,
      name: cat.name,
      color: cat.color,
      weight: catWeight,
      count: catRequests.length
    };
  }).filter(c => c.weight > 0 || c.count > 0);

  const maxCatWeight = Math.max(...categoryStats.map(c => c.weight), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <span className="badge badge-completed" style={{ marginBottom: '8px' }}>
          <Globe size={12} /> Environmental Sustainability & Impact Analytics
        </span>
        <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Collection Statistics & Impact</h2>
        <p style={{ color: '#475569', fontSize: '0.92rem' }}>Real-time environmental metrics, recycling recovery rates, and carbon offset tracking.</p>
      </div>

      {/* Main Impact Meters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
          borderColor: '#a7f3d0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>TOTAL CO2 OFFSET</span>
            <Leaf size={24} color="#059669" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>
            {totalCo2OffsetKg} <span style={{ fontSize: '1rem', color: '#64748b' }}>kg CO2e</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
            Equivalent to preventing ~{(totalCo2OffsetKg * 2.4).toFixed(0)} km of car drive emissions
          </p>
        </div>

        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
          borderColor: '#bfdbfe'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>TREES SAVED EQUIV.</span>
            <TreePine size={24} color="#2563eb" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>
            {totalTreesEquiv} <span style={{ fontSize: '1rem', color: '#64748b' }}>trees</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
            Based on wood fiber pulp & paper recycling savings
          </p>
        </div>

        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 100%)',
          borderColor: '#fde68a'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>RECYCLING RATE</span>
            <Recycle size={24} color="#d97706" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706' }}>
            {recyclingRate}%
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
            Percentage of total requests successfully processed & closed
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Waste Category Weight Breakdown */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={18} color="#059669" /> Collection Volume by Waste Category (kg)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {categoryStats.map(cat => {
              const percentage = Math.round((cat.weight / maxCatWeight) * 100);

              return (
                <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>{cat.name}</span>
                    <span style={{ color: cat.color, fontWeight: 800 }}>{cat.weight} kg ({cat.count} requests)</span>
                  </div>

                  <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      background: cat.color,
                      width: `${percentage}%`,
                      borderRadius: '6px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Eco-Champion Neighborhoods Leaderboard */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#d97706" /> Top Recycling Neighborhoods
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { rank: 1, area: 'Sector 4 - Evergreen Terrace', weight: '145 kg', points: '1,450 pts', badge: '🥇 Gold Eco District' },
              { rank: 2, area: 'Downtown Green Ridge', weight: '112 kg', points: '1,120 pts', badge: '🥈 Silver Eco District' },
              { rank: 3, area: 'Metro City Pioneer Way', weight: '88 kg', points: '880 pts', badge: '🥉 Bronze Eco District' },
              { rank: 4, area: 'North Harbor Drive', weight: '64 kg', points: '640 pts', badge: 'Green Zone' },
              { rank: 5, area: 'Westside Oakwood Ave', weight: '52 kg', points: '520 pts', badge: 'Green Zone' }
            ].map((n) => (
              <div
                key={n.rank}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: n.rank === 1 ? '#d97706' : '#64748b' }}>
                    #{n.rank}
                  </span>
                  <div>
                    <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block' }}>{n.area}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>{n.badge}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', display: 'block' }}>{n.weight}</span>
                  <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>{n.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
