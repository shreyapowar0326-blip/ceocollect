import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  UploadCloud, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Leaf, 
  Award,
  Zap,
  CheckCircle,
  FileText,
  Boxes,
  Cpu,
  AlertTriangle,
  Sofa,
  GlassWater,
  PackageCheck,
  Navigation,
  MessageSquare
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

export default function RequestWizard({ categories, onSubmitRequest, initialCategoryId, currentUser }) {
  const [step, setStep] = useState(1);

  // Form State
  const [categoryId, setCategoryId] = useState(initialCategoryId || 'paper');
  const [estimatedWeightKg, setEstimatedWeightKg] = useState(15);
  const [itemsDescription, setItemsDescription] = useState('');
  const [userName, setUserName] = useState(currentUser?.name || 'Elena Rostova');
  const [userPhone, setUserPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [address, setAddress] = useState('742 Evergreen Terrace, Sector 4, Springfield');
  const [notes, setNotes] = useState('Ground floor access near garage');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');
  const [priority, setPriority] = useState('Normal');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState(null);

  const selectedCategoryObj = categories.find(c => c.id === categoryId) || categories[0];

  // Impact calculations
  const pointsEarned = Math.round(estimatedWeightKg * selectedCategoryObj.pointsPerKg * (priority === 'Express' ? 1.2 : 1.0));
  const co2OffsetKg = (estimatedWeightKg * 1.25).toFixed(1);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReqId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequestData = {
      id: newReqId,
      userName,
      userPhone,
      category: categoryId,
      categoryName: selectedCategoryObj.name,
      estimatedWeightKg: Number(estimatedWeightKg),
      itemsDescription: itemsDescription || `${selectedCategoryObj.name} collection batch`,
      address,
      lat: 37.7749 + (Math.random() - 0.5) * 0.05,
      lng: -122.4194 + (Math.random() - 0.5) * 0.05,
      notes,
      scheduledDate,
      timeSlot,
      priority,
      status: 'Pending',
      collector: null,
      co2OffsetKg: parseFloat(co2OffsetKg),
      pointsEarned,
      createdAt: new Date().toISOString(),
      photoUrl: photoPreview || null
    };

    onSubmitRequest(newRequestData);
    setSubmittedRequestId(newReqId);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass-card" style={{
        textAlign: 'center',
        padding: '48px 32px',
        maxWidth: '640px',
        margin: '20px auto',
        borderColor: '#a7f3d0',
        background: '#ffffff'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
        }}>
          <CheckCircle size={40} color="#ffffff" />
        </div>

        <span className="badge badge-completed" style={{ marginBottom: '12px' }}>
          Request Successfully Logged
        </span>

        <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: '#0f172a' }}>Thank You for Recycling!</h2>
        <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '16px' }}>
          Your waste pickup request <strong style={{ color: '#059669' }}>#{submittedRequestId}</strong> has been created.
        </p>

        {/* SMS Confirmation Badge */}
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          padding: '12px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          color: '#065f46',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <MessageSquare size={18} color="#059669" />
          <span>📱 <strong>SMS Confirmation Sent</strong> to <strong>{userPhone}</strong></span>
        </div>

        {/* Stats Card */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>CO2 Offset Saved</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Leaf size={18} /> {co2OffsetKg} kg
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>EcoPoints Earnable</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Award size={18} /> +{pointsEarned} pts
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
            }}
          >
            Submit Another Request
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              window.location.hash = 'track';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Track Status Live <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Wizard Header & Stepper */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span className="badge badge-completed" style={{ marginBottom: '8px' }}>
            Multi-Step Request Wizard
          </span>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a' }}>Schedule a Waste Pickup</h2>
          <p style={{ color: '#475569', fontSize: '0.92rem' }}>Fill in your waste details, pickup location, and preferred time window. Instant SMS alerts will update your phone at each stage!</p>
        </div>

        {/* Stepper Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '40px',
            right: '40px',
            height: '3px',
            background: '#e2e8f0',
            zIndex: 1
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #059669)',
              width: `${((step - 1) / 3) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>

          {[
            { num: 1, label: 'Category & Weight' },
            { num: 2, label: 'Location & Address' },
            { num: 3, label: 'Date & Time Slot' },
            { num: 4, label: 'Review & Confirm' }
          ].map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;

            return (
              <div key={s.num} style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isDone 
                    ? '#10b981' 
                    : isActive 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : '#ffffff',
                  border: isActive || isDone ? 'none' : '2px solid #cbd5e1',
                  color: isDone || isActive ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: isActive ? '0 0 15px rgba(16, 185, 129, 0.3)' : 'none',
                  transition: 'all 0.25s ease'
                }}>
                  {isDone ? <Check size={18} /> : s.num}
                </div>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#059669' : isDone ? '#10b981' : '#64748b'
                }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Steps Body */}
      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '32px' }}>
        {/* STEP 1: CATEGORY & WEIGHT */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label className="form-label" style={{ fontSize: '1rem', marginBottom: '12px' }}>
                1. Select Waste Category:
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px'
              }}>
                {categories.map((cat) => {
                  const isSelected = categoryId === cat.id;
                  const IconComp = ICON_MAP[cat.icon] || Boxes;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setCategoryId(cat.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: isSelected ? '#ecfdf5' : '#ffffff',
                        border: isSelected ? '2px solid #10b981' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${cat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center'
                      }}>
                        <IconComp size={18} color={cat.color} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: isSelected ? '#047857' : '#0f172a' }}>
                          {cat.name}
                        </strong>
                        <span style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 700 }}>+{cat.pointsPerKg} pts/kg</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estimated Weight Selector */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  2. Estimated Weight / Load Size:
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                  {estimatedWeightKg} kg (~{(estimatedWeightKg * 2.2).toFixed(0)} lbs)
                </span>
              </div>

              <input
                type="range"
                min="2"
                max="100"
                step="1"
                value={estimatedWeightKg}
                onChange={(e) => setEstimatedWeightKg(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer', height: '6px' }}
              />

              {/* Quick weight buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Small Bag (5kg)', val: 5 },
                  { label: 'Medium Bin (15kg)', val: 15 },
                  { label: 'Large Cart (30kg)', val: 30 },
                  { label: 'Heavy Bulk (60kg)', val: 60 }
                ].map((b) => (
                  <button
                    type="button"
                    key={b.val}
                    onClick={() => setEstimatedWeightKg(b.val)}
                    style={{
                      background: estimatedWeightKg === b.val ? '#ecfdf5' : '#f8fafc',
                      border: estimatedWeightKg === b.val ? '1px solid #10b981' : '1px solid #e2e8f0',
                      color: estimatedWeightKg === b.val ? '#047857' : '#475569',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                3. Item Description & Quantity Details:
              </label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="E.g., 3 cardboard shipping boxes folded flat, 1 old printer, 2 bags of plastic bottles..."
                value={itemsDescription}
                onChange={(e) => setItemsDescription(e.target.value)}
              />
            </div>

            {/* Photo Upload Simulation */}
            <div className="form-group">
              <label className="form-label">
                4. Photo Attachment (Optional):
              </label>
              <div style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                background: '#f8fafc',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%'
                  }}
                />

                {photoPreview ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <img 
                      src={photoPreview} 
                      alt="Upload preview" 
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #10b981' }} 
                    />
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.88rem', display: 'block' }}>Photo Attached!</span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Click or drop another file to replace</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <UploadCloud size={28} color="#10b981" />
                    <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>Click or Drag & Drop photo of waste items</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>PNG, JPG up to 5MB (helps drivers verify volume)</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => setStep(2)}
              >
                Next: Location & Mobile SMS Contact <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & CONTACT */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name:</label>
                <input
                  type="text"
                  className="form-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Contact Phone (for SMS Updates):</span>
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageSquare size={12} /> SMS Active
                  </span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Street Address / Pickup Location:</span>
                <span 
                  onClick={() => setAddress('742 Evergreen Terrace, Sector 4, Springfield')}
                  style={{ color: '#2563eb', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                >
                  <Navigation size={12} /> Use GPS Location
                </span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter complete address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Interactive Map Visual Simulator */}
            <div style={{
              height: '180px',
              borderRadius: '14px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              {/* Simulated Map Grid Lines */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Pin Marker */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  background: '#10b981',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                  marginBottom: '4px'
                }}>
                  📍 Pickup Pin Pointed
                </div>
                <MapPin size={32} color="#059669" fill="#10b981" />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                background: '#ffffff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                color: '#64748b',
                border: '1px solid #cbd5e1'
              }}>
                Lat: 37.7749 | Lng: -122.4194 (Verified Pickup Zone)
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Pickup Notes / Access Instructions:</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="E.g., Gate code #4012, leave bin on porch, call 10 mins before arrival..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => setStep(3)}
              >
                Next: Schedule Window <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME SLOT */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">1. Select Preferred Date:</label>
              <input
                type="date"
                className="form-input"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">2. Select Time Slot Window:</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { slot: 'Morning (09:00 AM - 12:00 PM)', desc: 'Standard morning pickup' },
                  { slot: 'Afternoon (01:00 PM - 04:00 PM)', desc: 'Peak daytime window' },
                  { slot: 'Evening (04:00 PM - 07:00 PM)', desc: 'After-work convenience' },
                  { slot: 'Express 2-Hour Window', desc: 'Priority dispatch (+50 bonus pts)' }
                ].map((item) => (
                  <div
                    key={item.slot}
                    onClick={() => setTimeSlot(item.slot)}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: timeSlot === item.slot ? '#ecfdf5' : '#ffffff',
                      border: timeSlot === item.slot ? '2px solid #10b981' : '1px solid #cbd5e1',
                      cursor: 'pointer'
                    }}
                  >
                    <strong style={{ display: 'block', color: timeSlot === item.slot ? '#047857' : '#0f172a', fontSize: '0.9rem' }}>
                      {item.slot}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">3. Service Priority Level:</label>
              <div style={{ display: 'flex', gap: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'Normal'}
                    onChange={() => setPriority('Normal')}
                    style={{ accentColor: '#10b981' }}
                  />
                  Normal Scheduled Pickup
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'Express'}
                    onChange={() => setPriority('Express')}
                    style={{ accentColor: '#9333ea' }}
                  />
                  ⚡ Express Urgent Pickup (Priority Truck Dispatch)
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(2)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => setStep(4)}
              >
                Next: Review & Confirm <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#059669" /> Pickup Request Summary
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: '#475569', display: 'block' }}>Category:</span>
                  <strong style={{ color: selectedCategoryObj.color }}>{selectedCategoryObj.name}</strong>
                </div>

                <div>
                  <span style={{ color: '#475569', display: 'block' }}>Estimated Weight:</span>
                  <strong style={{ color: '#0f172a' }}>{estimatedWeightKg} kg</strong>
                </div>

                <div>
                  <span style={{ color: '#475569', display: 'block' }}>Pickup Location:</span>
                  <strong style={{ color: '#0f172a' }}>{address}</strong>
                </div>

                <div>
                  <span style={{ color: '#475569', display: 'block' }}>Scheduled Slot:</span>
                  <strong style={{ color: '#0f172a' }}>{scheduledDate} ({timeSlot})</strong>
                </div>

                <div>
                  <span style={{ color: '#475569', display: 'block' }}>Mobile SMS Contact:</span>
                  <strong style={{ color: '#059669' }}>{userPhone} ({userName})</strong>
                </div>

                <div>
                  <span style={{ color: '#475569', display: 'block' }}>Priority:</span>
                  <span className={`badge ${priority === 'Express' ? 'badge-intransit' : 'badge-confirmed'}`}>
                    {priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Environmental Impact Counter */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '14px',
              textAlign: 'center'
            }}>
              <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>Estimated CO2 Offset</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>{co2OffsetKg} kg</span>
              </div>
              <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>EcoPoints Earned</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d97706' }}>+{pointsEarned} pts</span>
              </div>
              <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>Trees Saved Equiv.</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563eb' }}>{(estimatedWeightKg * 0.04).toFixed(1)} trees</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(3)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ padding: '14px 36px' }}
              >
                <Sparkles size={18} /> Confirm Request & Send Mobile SMS
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
