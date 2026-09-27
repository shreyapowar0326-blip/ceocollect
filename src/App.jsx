import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryCatalog from './components/CategoryCatalog';
import RequestWizard from './components/RequestWizard';
import RequestTracker from './components/RequestTracker';
import AdminDashboard from './components/AdminDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AiWasteAssistant from './components/AiWasteAssistant';
import RewardsStore from './components/RewardsStore';
import AuthModal from './components/AuthModal';
import SmsNotificationDrawer from './components/SmsNotificationDrawer';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';

import { 
  INITIAL_CATEGORIES, 
  INITIAL_REQUESTS, 
  COLLECTORS_LIST, 
  AI_KNOWLEDGE_BASE, 
  ECO_REWARDS 
} from './data/initialData';

export default function App() {
  // Authentication State - Defaults to null to present Login Page first
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ecocollect_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Navigation tab state - Defaults to 'login' if no user session
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('ecocollect_user');
    if (saved) {
      const user = JSON.parse(saved);
      return user.role === 'admin' ? 'admin' : 'user-dashboard';
    }
    return 'login';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSmsDrawerOpen, setIsSmsDrawerOpen] = useState(false);

  // Persistent Requests State
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('ecocollect_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  // Persistent User Points
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('ecocollect_user_points');
    return saved ? JSON.parse(saved) : 450;
  });

  // Persistent Mobile SMS Logs
  const [smsLogs, setSmsLogs] = useState(() => {
    const saved = localStorage.getItem('ecocollect_sms_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sms-1',
        reqId: 'REQ-9402',
        phone: '+1 (555) 234-5678',
        message: '📱 EcoCollect Alert: Request #REQ-9402 for E-Waste submitted! Scheduled for 2026-09-28.',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'sms-2',
        reqId: 'REQ-9402',
        phone: '+1 (555) 234-5678',
        message: '📱 EcoCollect Alert: EcoTruck Driver Marcus Vance (EV-04, +1 555-987-6543) is EN ROUTE to 742 Evergreen Terrace.',
        timestamp: new Date().toISOString()
      }
    ];
  });

  // Pre-selected category for request wizard
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ecocollect_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ecocollect_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ecocollect_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('ecocollect_user_points', JSON.stringify(userPoints));
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem('ecocollect_sms_logs', JSON.stringify(smsLogs));
  }, [smsLogs]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Helper to send simulated mobile SMS
  const sendMobileSms = (phone, reqId, text) => {
    const newSms = {
      id: `sms-${Date.now()}`,
      reqId,
      phone: phone || currentUser?.phone || '+1 (555) 234-5678',
      message: `📱 EcoCollect Alert: ${text}`,
      timestamp: new Date().toISOString()
    };

    setSmsLogs(prev => [newSms, ...prev]);
    showToast(`📱 Mobile SMS sent to ${newSms.phone}: "${text}"`);
  };

  // Auth Handlers
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthModalOpen(false);

    if (userData.role === 'admin') {
      setActiveTab('admin');
      showToast(`🔑 Welcome Admin! Redirected to Admin Dashboard.`);
    } else {
      setActiveTab('user-dashboard');
      showToast(`👋 Welcome back ${userData.name}! Redirected to User Dashboard.`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ecocollect_user');
    setActiveTab('login');
    setIsAuthModalOpen(false);
    showToast(`Logged out of session. Returned to Login Page.`);
  };

  // Workflow Handlers
  const handleStartRequestForCategory = (catId) => {
    setSelectedCategoryId(catId);
    setActiveTab('new-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewRequest = (newRequestData) => {
    setRequests(prev => [newRequestData, ...prev]);
    setUserPoints(prev => prev + newRequestData.pointsEarned);

    // Trigger SMS Notification
    sendMobileSms(
      newRequestData.userPhone,
      newRequestData.id,
      `Hello ${newRequestData.userName}, your waste pickup request #${newRequestData.id} (${newRequestData.categoryName}) has been submitted! Track status live on EcoCollect.`
    );
  };

  const handleUpdateStatus = (reqId, newStatus) => {
    const req = requests.find(r => r.id === reqId);
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: newStatus } : r));

    // Trigger SMS for status update
    if (newStatus === 'Confirmed') {
      sendMobileSms(
        req?.userPhone,
        reqId,
        `Request #${reqId} confirmed! Pickup scheduled for ${req?.scheduledDate} (${req?.timeSlot}).`
      );
    } else if (newStatus === 'In Transit') {
      sendMobileSms(
        req?.userPhone,
        reqId,
        `EcoTruck Driver ${req?.collector?.name || 'Vance'} is EN ROUTE to ${req?.address}. Please have items ready!`
      );
    } else if (newStatus === 'Completed') {
      sendMobileSms(
        req?.userPhone,
        reqId,
        `Pickup #${reqId} COMPLETED! ${req?.estimatedWeightKg}kg recycled. +${req?.pointsEarned} EcoPoints added to your balance!`
      );
    } else {
      sendMobileSms(
        req?.userPhone,
        reqId,
        `Status for Request #${reqId} updated to: ${newStatus}.`
      );
    }
  };

  const handleAssignCollector = (reqId, collectorObj) => {
    const req = requests.find(r => r.id === reqId);
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, collector: collectorObj, status: 'Confirmed' } : r));

    sendMobileSms(
      req?.userPhone,
      reqId,
      `EcoTruck Driver ${collectorObj.name} (${collectorObj.vehicle}, Contact: ${collectorObj.phone}) has been assigned to your request #${reqId}!`
    );
  };

  const handleDeleteRequest = (reqId) => {
    if (confirm(`Are you sure you want to delete request #${reqId}?`)) {
      setRequests(prev => prev.filter(r => r.id !== reqId));
      showToast(`🗑️ Request #${reqId} removed.`);
    }
  };

  const handleRedeemRewardPoints = (costPoints) => {
    setUserPoints(prev => Math.max(0, prev - costPoints));
    showToast(`🎁 Reward claimed successfully! -${costPoints} EcoPoints.`);
  };

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenSmsDrawer={() => setIsSmsDrawerOpen(true)}
        userPoints={userPoints}
        requestsCount={requests.filter(r => ['Pending', 'Confirmed', 'In Transit'].includes(r.status)).length}
        smsCount={smsLogs.length}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Mobile SMS Notification Drawer */}
      <SmsNotificationDrawer
        isOpen={isSmsDrawerOpen}
        onClose={() => setIsSmsDrawerOpen(false)}
        smsLogs={smsLogs}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0f172a',
          border: '2px solid #10b981',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontSize: '0.92rem',
          fontWeight: 600,
          animation: 'slideUp 0.25s ease-out'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Main View Area */}
      <main className="main-content">
        {(!currentUser || activeTab === 'login') && (
          <LoginPage onLogin={handleLogin} />
        )}

        {currentUser && activeTab === 'user-dashboard' && (
          <UserDashboard
            currentUser={currentUser}
            requests={requests}
            userPoints={userPoints}
            onNavigate={(tab) => setActiveTab(tab)}
            categories={INITIAL_CATEGORIES}
          />
        )}

        {currentUser && activeTab === 'categories' && (
          <CategoryCatalog
            categories={INITIAL_CATEGORIES}
            onSelectCategory={(cat) => handleStartRequestForCategory(cat.id)}
            onStartRequest={handleStartRequestForCategory}
          />
        )}

        {currentUser && activeTab === 'new-request' && (
          <RequestWizard
            categories={INITIAL_CATEGORIES}
            onSubmitRequest={handleAddNewRequest}
            initialCategoryId={selectedCategoryId}
            currentUser={currentUser}
          />
        )}

        {currentUser && activeTab === 'track' && (
          <RequestTracker
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            categories={INITIAL_CATEGORIES}
          />
        )}

        {currentUser && activeTab === 'admin' && (
          <AdminDashboard
            requests={requests}
            collectors={COLLECTORS_LIST}
            onUpdateStatus={handleUpdateStatus}
            onAssignCollector={handleAssignCollector}
            onDeleteRequest={handleDeleteRequest}
          />
        )}

        {currentUser && activeTab === 'analytics' && (
          <AnalyticsDashboard
            requests={requests}
            categories={INITIAL_CATEGORIES}
          />
        )}

        {currentUser && activeTab === 'ai-assistant' && (
          <AiWasteAssistant
            knowledgeBase={AI_KNOWLEDGE_BASE}
            onSelectCategory={handleStartRequestForCategory}
          />
        )}

        {currentUser && activeTab === 'rewards' && (
          <RewardsStore
            rewards={ECO_REWARDS}
            userPoints={userPoints}
            onRedeemReward={handleRedeemRewardPoints}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
