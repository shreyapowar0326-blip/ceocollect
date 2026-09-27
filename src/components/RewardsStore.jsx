import React, { useState } from 'react';
import { 
  Award, 
  Gift, 
  ShoppingBag, 
  Trees, 
  Zap, 
  Sprout, 
  CheckCircle, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  ShoppingBag,
  Trees,
  Zap,
  Sprout
};

export default function RewardsStore({ rewards, userPoints, onRedeemReward }) {
  const [redeemedVoucher, setRedeemedVoucher] = useState(null);

  const handleRedeem = (reward) => {
    if (userPoints < reward.costPoints) {
      alert(`Insufficient EcoPoints! You need ${reward.costPoints - userPoints} more points to redeem this reward.`);
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const couponCode = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
    onRedeemReward(reward.costPoints);
    setRedeemedVoucher({ ...reward, code: couponCode });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Hero Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
        borderColor: '#a7f3d0',
        padding: '32px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <span className="badge badge-completed" style={{ marginBottom: '8px' }}>
            <Award size={12} /> Green Citizen Rewards Program
          </span>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: '#0f172a' }}>
            Redeem Your <span style={{ color: '#d97706' }}>EcoPoints</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem' }}>
            Convert your recycling contributions into sustainable partner rewards, grocery discounts, or native tree planting.
          </p>
        </div>

        <div style={{
          background: '#ffffff',
          border: '2px solid #fde68a',
          borderRadius: '20px',
          padding: '16px 28px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.15)'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Your Balance</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#d97706' }}>
            {userPoints} <span style={{ fontSize: '1rem' }}>pts</span>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {rewards.map((rew) => {
          const IconComp = ICON_MAP[rew.icon] || Gift;
          const canAfford = userPoints >= rew.costPoints;

          return (
            <div
              key={rew.id}
              className="glass-card glass-card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '16px',
                background: '#ffffff'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center'
                  }}>
                    <IconComp size={24} color="#d97706" />
                  </div>

                  <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>
                    {rew.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '6px' }}>{rew.title}</h3>
                <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                  Partner: {rew.partner}
                </span>

                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  {rew.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '14px'
              }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706' }}>
                  {rew.costPoints} pts
                </span>

                <button
                  onClick={() => handleRedeem(rew)}
                  className={`btn btn-sm ${canAfford ? 'btn-primary' : 'btn-secondary'}`}
                  disabled={!canAfford}
                  style={{ opacity: canAfford ? 1 : 0.6 }}
                >
                  {canAfford ? 'Redeem Voucher' : 'Insufficient Pts'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voucher Code Modal */}
      {redeemedVoucher && (
        <div className="modal-overlay" onClick={() => setRedeemedVoucher(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', maxWidth: '480px', padding: '32px', background: '#ffffff' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle size={36} color="#ffffff" />
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#0f172a', marginBottom: '6px' }}>Reward Claimed!</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '20px' }}>
              You redeemed <strong style={{ color: '#0f172a' }}>{redeemedVoucher.title}</strong>
            </p>

            <div style={{
              background: '#ecfdf5',
              border: '2px dashed #10b981',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
                Your Redemption Coupon Code
              </span>
              <strong style={{ fontSize: '1.6rem', color: '#059669', letterSpacing: '0.1em' }}>
                {redeemedVoucher.code}
              </strong>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setRedeemedVoucher(null)}>
              Done & Return to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
