# ♻️ EcoCollect — Smart Waste Collection & Recycling Platform

> **A practical, full-featured web application that helps citizens request waste collection services, track pickup status in real-time with instant Mobile SMS alerts, and enables administrators to organize requests, assign dispatch drivers, and monitor recycling impact analytics.**

---

## 🌟 Overview

Waste disposal and recycling requests often suffer from a lack of clarity regarding category classification, scheduling delays, and tracking opacity. Simultaneously, municipal and private waste collection services struggle to manage incoming pickup requests, route dispatching, and status monitoring.

**EcoCollect** bridges this gap with a modern, software-only MVP platform that streamlines waste request workflows for both **Citizens** and **Dispatch Administrators**.

---

## ✨ Key Features & Enhancements

### 1. 🔑 Dedicated Authentication & Role Login System
- **Login Modal (`AuthModal.jsx`)**: Login as **Citizen / User** or **Admin / Dispatcher**.
- **Role-Based Redirects**:
  - Logging in as **Citizen User** redirects directly to the **Citizen Request Portal & Categories**.
  - Logging in as **Dispatch Admin** redirects directly to the **Admin Dispatch Operations Dashboard**.
- **Quick Demo Login Buttons**: One-click demo logins for immediate evaluation (*Elena Rostova - Citizen* or *Dispatch Operations Admin*).
- **Session Profile**: Active user profile pill in the header with logout support.

### 2. 📱 Mobile SMS Alert Notification System
- **Automated SMS Dispatch**: Sends simulated real-time text alerts to the user's contact number for all key workflow activities:
  - **Pickup Request Created**: `📱 SMS Alert: Hello Elena, request #REQ-9402 for E-Waste logged!`
  - **Driver Assigned / Confirmed**: `📱 SMS Alert: Driver Marcus Vance (EV-Truck EV-04) assigned to your request.`
  - **En Route / Tracking**: `📱 SMS Alert: EcoTruck Driver is EN ROUTE to 742 Evergreen Terrace.`
  - **Completed & Recycled**: `📱 SMS Alert: Pickup #REQ-9402 COMPLETED! +720 EcoPoints added!`
- **Interactive SMS Activity Drawer**: View all historical SMS text alerts sent to the contact number in a dedicated slide-out log drawer.

### 3. 🎨 Fresh Emerald Green & Pure White UI Theme
- High-contrast, fresh **Emerald Green & Crisp White** visual design with gold/amber highlights for EcoPoints/Pending items, red tags for Hazardous/Cancelled items, and soft green container cards.
- Clean typography (*Outfit* & *Plus Jakarta Sans*) with responsive layout.

### 4. ♻️ Waste Category Selection Catalog
- **8 Categories**: Paper & Cardboard, Plastics & Polymers, Metals & Cans, Glass, E-Waste & Electronics, Organic Waste, Hazardous Materials, and Bulky Furniture.
- View guidelines, accepted vs. prohibited items, and earnable **EcoPoints per kg**.

### 5. 📝 Multi-Step Pickup Request Wizard
- 4-step wizard with weight estimator slider (2 kg – 100 kg with presets), photo attachment simulator, address GPS locator, scheduling time slots (*Morning*, *Afternoon*, *Evening*, *Express 2-Hour Window*), and real-time **CO2 offset** & **EcoPoints** impact calculations.

### 6. 🚚 Live Request Status & Tracking Timeline
- Live step timeline (`Submitted` ➔ `Confirmed` ➔ `En Route` ➔ `Picked Up` ➔ `Recycled`), driver info card with direct calling simulation, status advance simulator, and printable **Digital Recycling Receipts**.

### 7. 👨‍💼 Administrative Dispatch Operations Dashboard
- KPI summary metrics, multi-field search and filters (Status, Category, Priority), fleet driver assignment modal, inline status updates, and one-click **CSV data export**.

### 8. 📊 Environmental Impact & Collection Analytics
- Real-time CO2 emissions saved, trees saved equivalent, category volume progress bars, and top recycling neighborhood leaderboard.

### 9. 🤖 AI Waste Advisor & 🎁 Eco-Rewards Store
- AI item classifier for tricky waste items and EcoPoints rewards redemption store with confetti celebrations.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + Vite 5
- **Styling**: Emerald Green & Pure White CSS system with CSS variables, high-contrast typography, and smooth micro-animations.
- **Icons & Effects**: `lucide-react`, `canvas-confetti`
- **State & Storage**: LocalStorage sync for authentication session, requests, user points balance, and SMS message history.

---

## 🚀 Getting Started

### Installation & Running Locally

1. **Navigate to the project directory**:
   ```bash
   cd f:/ecocollect2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000/](http://localhost:3000/)

### Building for Production
```bash
npm run build
```
Build output is saved to the `dist/` directory.

---

## 📜 License
Developed for the Smart Waste Collection & Recycling Platform Challenge.
