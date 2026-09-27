import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  FileCheck, 
  Download, 
  AlertCircle, 
  User, 
  Zap, 
  RotateCw, 
  Leaf, 
  Award,
  ChevronRight,
  ShieldCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';

const STATUS_STEPS = [
  { id: 'Pending', label: 'Submitted', desc: 'Request logged & SMS sent to user' },
  { id: 'Confirmed', label: 'Confirmed', desc: 'Driver assigned & SMS update sent' },
  { id: 'In Transit', label: 'En Route', desc: 'Eco-truck dispatched with SMS link' },
  { id: 'Picked Up', label: 'Picked Up', desc: 'Waste loaded & verified' },
  { id: 'Completed', label: 'Recycled', desc: 'Processed & EcoPoints credited' }
];

export default function RequestTracker({ requests, onUpdateStatus, categories }) {
  const [selectedReqId, setSelectedReqId] = useState(requests[0]?.id || null);
  const [filterTab, setFilterTab] = useState('Active'); // Active, Completed, All
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const filteredRequests = requests.filter(req => {
    if (filterTab === 'Active') return ['Pending', 'Confirmed', 'In Transit'].includes(req.status);
    if (filterTab === 'Completed') return req.status === 'Completed';
    return true;
  });

  const activeRequest = requests.find(r => r.id === selectedReqId) || requests[0];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Confirmed': return 1;
      case 'In Transit': return 2;
      case 'Picked Up': return 3;
      case 'Completed': return 4;
      default: return 0;
    }
  };

  const activeStepIdx = activeRequest ? getStepIndex(activeRequest.status) : 0;

  const handleSimulateNextStep = () => {
    if (!activeRequest) return;
    const currentIdx = getStepIndex(activeRequest.status);
    if (currentIdx < STATUS_STEPS.length - 1) {
      const nextStatus = STATUS_STEPS[currentIdx + 1].id;
      onUpdateStatus(activeRequest.id, nextStatus);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge badge-intransit" style={{ marginBottom: '8px' }}>
            <Truck size={12} /> Live Dispatch & Real-Time Tracking Tracker
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Track Pickup Requests</h2>
          <p style={{ color: '#475569', fontSize: '0.92rem' }}>Monitor real-time status of your eco collection requests, assigned drivers, and mobile SMS logs.</p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          background: '#ffffff',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #cbd5e1'
        }}>
          {['Active', 'Completed', 'All'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              style={{
                background: filterTab === tab ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
                color: filterTab === tab ? '#ffffff' : '#64748b',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab} Requests
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Requests List, Right Tracker Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px' }}>
        {/* Left Column: Request List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Request Log ({filteredRequests.length})
          </h3>

          {filteredRequests.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '30px 20px', color: '#64748b' }}>
              No requests found in this tab.
            </div>
          ) : (
            filteredRequests.map((req) => {
              const isSelected = req.id === activeRequest?.id;
              const catObj = categories.find(c => c.id === req.category);

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderColor: isSelected ? '#10b981' : '#e2e8f0',
                    background: isSelected ? '#ecfdf5' : '#ffffff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                      {req.id}
                    </span>
                    <span className={`badge badge-${getStatusBadgeClass(req.status)}`}>
                      {req.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: catObj?.color || '#2563eb', marginBottom: '4px' }}>
                    {req.categoryName || req.category}
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <MapPin size={12} /> {req.address}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                    <span>{req.scheduledDate}</span>
                    <span style={{ color: '#d97706', fontWeight: 700 }}>+{req.pointsEarned} pts</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Tracker */}
        {activeRequest ? (
          <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px', background: '#ffffff' }}>
            {/* Header Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h2 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Request #{activeRequest.id}</h2>
                  <span className={`badge badge-${getStatusBadgeClass(activeRequest.status)}`}>
                    <span className="pulse-dot" style={{ background: 'currentColor' }} /> {activeRequest.status}
                  </span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={14} color="#059669" />
                  SMS alerts configured for <strong>{activeRequest.userPhone}</strong> ({activeRequest.userName})
                </p>
              </div>

              {/* Demo Action: Simulate Status Advance */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {activeRequest.status !== 'Completed' && (
                  <button
                    onClick={handleSimulateNextStep}
                    className="btn btn-sm btn-outline-emerald"
                    title="Simulate driver location & SMS status update"
                  >
                    <RotateCw size={14} /> Advance Status & Send SMS
                  </button>
                )}

                {activeRequest.status === 'Completed' && (
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="btn btn-sm btn-primary"
                  >
                    <FileCheck size={14} /> View Recycling Receipt
                  </button>
                )}
              </div>
            </div>

            {/* Live Progress Stepper */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px 20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {/* Connecting Line */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '30px',
                  right: '30px',
                  height: '3px',
                  background: '#e2e8f0',
                  zIndex: 1
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                    width: `${(activeStepIdx / (STATUS_STEPS.length - 1)) * 100}%`,
                    transition: 'width 0.4s ease'
                  }} />
                </div>

                {STATUS_STEPS.map((s, idx) => {
                  const isDone = idx <= activeStepIdx;
                  const isCurrent = idx === activeStepIdx;

                  return (
                    <div key={s.id} style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '90px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isCurrent 
                          ? 'linear-gradient(135deg, #10b981, #059669)' 
                          : isDone 
                            ? '#10b981' 
                            : '#ffffff',
                        border: isCurrent ? '3px solid #059669' : isDone ? 'none' : '2px solid #cbd5e1',
                        color: isDone || isCurrent ? '#ffffff' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        boxShadow: isCurrent ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>
                        {isDone ? <CheckCircle2 size={20} /> : idx + 1}
                      </div>

                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? '#059669' : isDone ? '#10b981' : '#64748b',
                        marginTop: '8px'
                      }}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid: Collector Info & Request Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Collector Details Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Assigned Eco-Truck & Driver
                </h4>

                {activeRequest.collector ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        color: '#ffffff'
                      }}>
                        <User size={24} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '1rem', color: '#0f172a', display: 'block' }}>{activeRequest.collector.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>{activeRequest.collector.vehicle}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '10px', borderRadius: '10px', fontSize: '0.85rem', border: '1px solid #cbd5e1' }}>
                      <span style={{ color: '#64748b' }}>Driver Contact:</span>
                      <strong style={{ color: '#0f172a' }}>{activeRequest.collector.phone}</strong>
                    </div>

                    <button className="btn btn-sm btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                      <Phone size={14} /> Call Driver Directly
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                    <Clock size={28} style={{ marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Assigning nearest available dispatch truck...</p>
                  </div>
                )}
              </div>

              {/* Waste Breakdown Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Waste Payload Specifications
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Category:</span>
                    <strong style={{ color: '#059669' }}>{activeRequest.categoryName}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Estimated Weight:</span>
                    <strong style={{ color: '#0f172a' }}>{activeRequest.estimatedWeightKg} kg</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Scheduled Slot:</span>
                    <strong style={{ color: '#0f172a' }}>{activeRequest.scheduledDate}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>CO2 Offset Saved:</span>
                    <strong style={{ color: '#059669' }}>{activeRequest.co2OffsetKg} kg CO2</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>EcoPoints Reward:</span>
                    <strong style={{ color: '#d97706' }}>+{activeRequest.pointsEarned} pts</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Select a request from the left list to view live tracking details.
          </div>
        )}
      </div>

      {/* Recycling Receipt Modal */}
      {showCertificateModal && activeRequest && (
        <div className="modal-overlay" onClick={() => setShowCertificateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', background: '#ffffff' }}>
            <div style={{
              padding: '28px',
              border: '2px solid #10b981',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={28} color="#059669" />
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: 0 }}>Official Recycling Receipt</h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>EcoCollect Green Recovery Certificate</span>
                  </div>
                </div>
                <button onClick={() => setShowCertificateModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Certificate ID:</span>
                  <strong style={{ color: '#0f172a' }}>CERT-{activeRequest.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Citizen Name:</span>
                  <strong style={{ color: '#0f172a' }}>{activeRequest.userName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Waste Recovered:</span>
                  <strong style={{ color: '#059669' }}>{activeRequest.estimatedWeightKg} kg ({activeRequest.categoryName})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>CO2 Diverted from Landfill:</span>
                  <strong style={{ color: '#059669' }}>{activeRequest.co2OffsetKg} kg CO2e</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <Download size={14} /> Print / Save PDF
                </button>
                <button className="btn btn-primary" onClick={() => setShowCertificateModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Pending': return 'pending';
    case 'Confirmed': return 'confirmed';
    case 'In Transit': return 'intransit';
    case 'Completed': return 'completed';
    default: return 'pending';
  }
}
