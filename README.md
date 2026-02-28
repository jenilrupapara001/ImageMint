# LinkPixel (ImageMint) - Fast, Developer-Friendly Image Hosting & Link Generation SaaS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

**LinkPixel** (formerly ImageMint) is a minimal, blazing-fast, and scalable SaaS platform designed for developers, creators, and agencies who need instant image hosting and public link generation with zero friction.

🚀 **Instant Upload → Instant Public URL → Zero Friction.**

---

## 🌟 Key Features

- **Blazing Fast Uploads**: Drag and drop interface for immediate image hosting.
- **Instant Link Generation**: Automatically generates UUID-based public URLs (JPEG, PNG, WEBP).
- **Comprehensive Dashboard**: Manage your assets, track storage usage, and copy links with one click.
- **Bulk Export to Excel**: Export your entire asset library metadata (names, URLs, sizes) to a formatted Excel file.
- **Premium Minimal UI**: A sleek, dark-mode/glassmorphic design built with Next.js and TailwindCSS.
- **Storage Management**: Built-in limits for freemium models (500MB free quota).
- **Production Ready**: Configured for VPS deployment with Nginx, PM2, and SSL support.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (AuthContext)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS
- **File Handling**: Multer
- **Exporting**: ExcelJS

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/jenilrupapara001/ImageMint.git
cd ImageMint
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/linkpixel
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
BASE_URL=http://localhost:5001
```
Run the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```
Run the development server:
```bash
npm run dev
```

---

## 📦 Bulk Link Export
LinkPixel allows users to export their entire image library in one click. The exported Excel file includes:
- Original File Name
- Public UUID-based URL
- File Size (KB)
- Upload Timestamp

---

## 🛡 Security & Optimization
- **MIME Type Validation**: Only allows valid image formats (JPEG, PNG, WEBP).
- **File Size Limits**: 5MB per file upload limit to prevent server abuse.
- **Storage Quotas**: Automatic tracking of storage usage per user.
- **JWT Protection**: Secure API endpoints with bearer token authentication.

---

## 🌐 SEO & Marketing
LinkPixel is optimized for search engines with:
- Semantic HTML5 structure.
- Responsive design for mobile-first indexing.
- Optimized image serving paths.
- Performance-focused Next.js architecture.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact
Project Link: [https://github.com/jenilrupapara001/ImageMint](https://github.com/jenilrupapara001/ImageMint)
Deployed Instance: [https://imagemint.easysell.work.gd](https://imagemint.easysell.work.gd)
