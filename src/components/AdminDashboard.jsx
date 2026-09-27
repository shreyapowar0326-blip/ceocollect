import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  UserCheck, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  Download, 
  Edit3, 
  Plus, 
  MoreVertical, 
  Shield, 
  TrendingUp, 
  Leaf, 
  Award,
  Users,
  MessageSquare
} from 'lucide-react';

export default function AdminDashboard({ requests, collectors, onUpdateStatus, onAssignCollector, onDeleteRequest }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [assigningReqId, setAssigningReqId] = useState(null);
  const [selectedCollectorId, setSelectedCollectorId] = useState(collectors[0]?.id || '');

  // Filter Logic
  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || req.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || req.priority === priorityFilter;
    const matchesSearch = searchQuery === '' || 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  // KPI calculations
  const totalRequests = requests.length;
  const activePickups = requests.filter(r => ['Pending', 'Confirmed', 'In Transit'].includes(r.status)).length;
  const completedPickups = requests.filter(r => r.status === 'Completed').length;
  const totalWeightKg = requests.reduce((acc, r) => acc + (Number(r.estimatedWeightKg) || 0), 0);

  // CSV Export handler
  const exportToCSV = () => {
    const headers = ['Request ID', 'User Name', 'Category', 'Weight (kg)', 'Address', 'Status', 'Scheduled Date', 'CO2 Offset (kg)'];
    const rows = filteredRequests.map(r => [
      r.id,
      `"${r.userName}"`,
      `"${r.categoryName}"`,
      r.estimatedWeightKg,
      `"${r.address}"`,
      r.status,
      r.scheduledDate,
      r.co2OffsetKg
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecocollect_requests_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge badge-completed" style={{ marginBottom: '8px' }}>
            <Shield size={12} /> Administrative Dispatch Operations Dashboard
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Collection Request Operations</h2>
          <p style={{ color: '#475569', fontSize: '0.92rem' }}>Review requests, assign eco-truck collectors, and trigger automatic SMS alerts to citizens.</p>
        </div>

        <button className="btn btn-primary" onClick={exportToCSV}>
          <Download size={16} /> Export Operations CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-card" style={{ padding: '20px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TOTAL REQUESTS</span>
            <Users size={20} color="#2563eb" />
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{totalRequests}</span>
          <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px' }}>Logged in system</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>ACTIVE DISPATCHES</span>
            <Truck size={20} color="#9333ea" />
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#9333ea' }}>{activePickups}</span>
          <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px' }}>In progress or scheduled</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>COMPLETED PICKUPS</span>
            <CheckCircle size={20} color="#059669" />
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>{completedPickups}</span>
          <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px' }}>Processed & recycled</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>TOTAL WEIGHT</span>
            <TrendingUp size={20} color="#d97706" />
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>{totalWeightKg} <span style={{ fontSize: '1rem' }}>kg</span></span>
          <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px' }}>Diverted from landfill</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search by ID, User, Address, Category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>

          {/* Status Filter */}
          <select
            className="form-select"
            style={{ width: '160px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Transit">In Transit</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Category Filter */}
          <select
            className="form-select"
            style={{ width: '180px' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="paper">Paper & Cardboard</option>
            <option value="plastic">Plastics</option>
            <option value="metal">Metals</option>
            <option value="glass">Glass</option>
            <option value="ewaste">E-Waste</option>
            <option value="organic">Organic</option>
            <option value="hazardous">Hazardous</option>
            <option value="bulky">Bulky</option>
          </select>

          {/* Priority Filter */}
          <select
            className="form-select"
            style={{ width: '140px' }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Normal">Normal</option>
            <option value="Express">Express</option>
          </select>
        </div>
      </div>

      {/* Request Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#ffffff' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '16px 20px' }}>Request ID</th>
                <th style={{ padding: '16px 20px' }}>User / Mobile SMS Contact</th>
                <th style={{ padding: '16px 20px' }}>Category & Weight</th>
                <th style={{ padding: '16px 20px' }}>Location</th>
                <th style={{ padding: '16px 20px' }}>Schedule</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px' }}>Assigned Driver</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                    No request records match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                    {/* ID & Priority */}
                    <td style={{ padding: '16px 20px' }}>
                      <strong style={{ color: '#0f172a', display: 'block' }}>{req.id}</strong>
                      <span className={`badge ${req.priority === 'Express' ? 'badge-intransit' : 'badge-confirmed'}`} style={{ fontSize: '0.7rem' }}>
                        {req.priority}
                      </span>
                    </td>

                    {/* User */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{req.userName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                        <MessageSquare size={12} /> {req.userPhone}
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ color: '#059669', fontWeight: 700 }}>{req.categoryName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{req.estimatedWeightKg} kg (~{req.co2OffsetKg}kg CO2)</div>
                    </td>

                    {/* Location */}
                    <td style={{ padding: '16px 20px', maxWidth: '220px' }}>
                      <div style={{ color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {req.address}
                      </div>
                    </td>

                    {/* Schedule */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ color: '#0f172a' }}>{req.scheduledDate}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{req.timeSlot}</div>
                    </td>

                    {/* Status Select */}
                    <td style={{ padding: '16px 20px' }}>
                      <select
                        value={req.status}
                        onChange={(e) => onUpdateStatus(req.id, e.target.value)}
                        style={{
                          background: '#ffffff',
                          color: getStatusColor(req.status),
                          border: `2px solid ${getStatusColor(req.status)}`,
                          borderRadius: '8px',
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Driver */}
                    <td style={{ padding: '16px 20px' }}>
                      {req.collector ? (
                        <div>
                          <div style={{ fontWeight: 700, color: '#059669' }}>{req.collector.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{req.collector.vehicle.split(' ')[0]}</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAssigningReqId(req.id);
                            setSelectedCollectorId(collectors[0]?.id || '');
                          }}
                          className="btn btn-sm btn-outline-emerald"
                          style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                        >
                          <UserCheck size={12} /> Assign Driver
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => onDeleteRequest(req.id)}
                        style={{ background: 'transparent', border: 'none', color: '#e11d48', cursor: 'pointer', padding: '4px' }}
                        title="Delete Request"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Collector Modal */}
      {assigningReqId && (
        <div className="modal-overlay" onClick={() => setAssigningReqId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Assign Eco-Truck Collector & Send SMS</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Select dispatch driver for Request #{assigningReqId}</p>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
              <div className="form-group">
                <label className="form-label">Available Fleet Drivers:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {collectors.map(c => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCollectorId(c.id)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        background: selectedCollectorId === c.id ? '#ecfdf5' : '#f8fafc',
                        border: selectedCollectorId === c.id ? '2px solid #10b981' : '1px solid #cbd5e1',
                        cursor: 'pointer',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.9rem' }}>{c.name}</strong>
                        <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>{c.vehicle}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Zone: {c.area}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 800 }}>★ {c.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: '#f8fafc' }}>
              <button className="btn btn-secondary" onClick={() => setAssigningReqId(null)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const selectedCollector = collectors.find(c => c.id === selectedCollectorId);
                  if (selectedCollector) {
                    onAssignCollector(assigningReqId, selectedCollector);
                  }
                  setAssigningReqId(null);
                }}
              >
                Confirm Dispatch & Trigger SMS Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'Pending': return '#d97706';
    case 'Confirmed': return '#2563eb';
    case 'In Transit': return '#9333ea';
    case 'Completed': return '#059669';
    case 'Cancelled': return '#e11d48';
    default: return '#64748b';
  }
}
