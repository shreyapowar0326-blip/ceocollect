import React from 'react';
import { MessageSquare, PhoneCall, CheckCircle2, Clock, Truck, ShieldCheck, X } from 'lucide-react';

export default function SmsNotificationDrawer({ isOpen, onClose, smsLogs }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', borderRadius: '24px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          padding: '20px 24px',
          color: '#ffffff',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <MessageSquare size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Mobile SMS Notification Log</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Real-time alerts sent to contact number</span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.2rem' }}>
            <X size={22} />
          </button>
        </div>

        {/* SMS List */}
        <div style={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {smsLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
              <MessageSquare size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
              <p style={{ margin: 0, fontSize: '0.9rem' }}>No SMS messages sent yet.</p>
            </div>
          ) : (
            smsLogs.map((sms) => (
              <div
                key={sms.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>
                    📱 SMS Delivered to {sms.phone}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {new Date(sms.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#1e293b', margin: 0, lineHeight: 1.5, fontFamily: 'monospace' }}>
                  {sms.message}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#64748b', borderTop: '1px dashed #f1f5f9', paddingTop: '6px' }}>
                  <span>Status: <strong style={{ color: '#10b981' }}>Delivered</strong></span>
                  <span>Ref: {sms.reqId}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '16px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose} style={{ width: '100%' }}>
            Close SMS Log
          </button>
        </div>
      </div>
    </div>
  );
}
