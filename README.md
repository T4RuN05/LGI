# 💍 Lord Ganesha Impex – Frontend

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](#)

The official frontend repository for **Lord Ganesha Impex**, a premium B2B jewelry showcase and management platform. Built with **Next.js (App Router)**, this application delivers a seamless experience for global buyers and a robust control suite for administrators.

---

## 🌐 Live Application

* **Production:** [www.lordganeshaimpex.com](https://www.lordganeshaimpex.com)
* **Status:** Operational 🚀

---

## 🚀 Features

### 🛍 Public Storefront
* **Dynamic Catalog:** Product listings with advanced category filtering.
* **Search Engine:** Instant search functionality for specific jewelry pieces.
* **Internationalized:** Full support for multi-language and multi-currency browsing.
* **SEO Optimized:** Server-side rendering (SSR) for maximum visibility on search engines.
* **Responsive UI:** A mobile-first, luxury-themed design powered by Tailwind CSS.

### 🔐 Security & Authentication
* **Hybrid Login:** Support for traditional Email/Password and Google OAuth.
* **Cookie-based Auth:** High-security implementation using `httpOnly` cookies (No JWTs in LocalStorage).
* **Role-Based Access (RBAC):** Strict separation between user accounts and Admin management.
* **Persistent Sessions:** Real-time validation via `/api/auth/me`.

### 🛠 Admin Panel (Control Center)
* **Inventory Management:** Full CRUD operations for products and categories.
* **Visual UX:** Drag-and-drop image reordering via `dnd-kit`.
* **Content Control:** Rich text editing for product attributes, descriptions, and FAQs.
* **Merchandising:** Easily toggle "Featured" status for homepage visibility.
* **Route Protection:** Secured via specialized `AuthContext` guards and backend middleware.

---

## 🏗 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **State/Auth** | React Context API |
| **Drag & Drop** | Dnd-kit |
| **Notifications** | React Hot Toast |
| **Auth Provider** | Google OAuth |
| **Deployment** | Vercel / Custom VPS |

---

## 📂 Project Structure

```text
frontend/
├── public/                 # Static assets & icons
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── admin/          # Protected Admin routes
│   │   ├── auth/           # Login & Registration
│   │   ├── products/       # Public Catalog
│   │   └── components/     # Atomic Design Components
│   │       ├── admin/      # Management UI
│   │       ├── home/       # Landing page sections
│   │       └── ui/         # Reusable Shadcn-style components
│   ├── context/            # Auth & Locale State Providers
│   ├── lib/                # API Clients & Configurations
│   └── utils/              # Helper functions & formatters
├── .env                    # Environment configuration
└── next.config.mjs         # Next.js configuration
```
---

## 🎨 FIGMA File
```
https://tinyurl.com/lgi-frontend-ui
```

### Backend Handles:

- Authentication  
- JWT verification  
- Admin authorization  
- Product management  
- Google OAuth  
- Database operations  

---

### Deployment Checklist

- Backend CORS allows frontend domain  
- Cookies use `secure: true`  
- Production domain matches Google OAuth settings  
- Environment variables configured properly  

---

## 📌 Future Improvements

- Refresh token rotation  
- Rate-limited login  
- Image CDN optimization  
- Advanced analytics dashboard  
- Order management system  

---

## 👨‍💻 Author

Developed for **Lord Ganesha Impex**

Modern B2B Jewelry Platform

---

## 📜 License

Private project – All rights reserved.
