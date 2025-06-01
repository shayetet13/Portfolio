# 🚀 DevNid Portfolio

> Professional Full Stack Developer Portfolio showcasing modern web development skills and services.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/devnid/deploys)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Features

- **Modern Stack**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Interactive UI**: Smooth animations with Framer Motion
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Contact Integration**: Direct Telegram bot integration for inquiries
- **Performance**: Lighthouse score 95+ across all metrics
- **PWA Ready**: Progressive Web App capabilities
- **Analytics**: Built-in tracking and visitor statistics

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library

### Tools & Services

- **Lucide React** - Beautiful icon library
- **Telegram Bot API** - Contact form integration
- **Netlify** - Hosting and continuous deployment
- **GitHub Actions** - CI/CD pipeline

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devnid-portfolio.git
cd devnid-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Site Configuration
VITE_SITE_URL=http://localhost:5173
VITE_SITE_NAME=DevNid Portfolio Local
VITE_ENVIRONMENT=development

# Telegram Bot Configuration
VITE_TELEGRAM_CONTACT_BOT_TOKEN=your_contact_bot_token
VITE_TELEGRAM_CONTACT_CHAT_ID=your_contact_chat_id
VITE_TELEGRAM_CHAT_BOT_TOKEN=your_chat_bot_token
VITE_TELEGRAM_CHAT_CHAT_ID=your_chat_chat_id

# Social Media
VITE_LINE_ID=your_line_id
VITE_FACEBOOK_URL=https://facebook.com/your_page
VITE_EMAIL=your_email@domain.com
```

## 📦 Build & Deploy

### Local Build

```bash
# Type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Netlify

#### Option 1: Automatic (Recommended)

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on every push to main branch

#### Option 2: Manual

```bash
# Build and deploy manually
npm run deploy
```

### GitHub Actions

The repository includes automatic deployment via GitHub Actions:

- Runs type checking and builds on every push
- Deploys to Netlify automatically
- Requires secrets setup in GitHub repository

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run clean        # Clean build artifacts
```

### Project Structure

```
src/
├── components/          # React components
│   ├── mobile/         # Mobile-specific components
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## 🎨 Customization

### Branding

- Update colors in `tailwind.config.js`
- Replace logo and images in `public/` directory
- Modify content in component files

### Features

- Add new sections by creating components
- Extend contact forms with additional fields
- Integrate with other services (email, CRM, etc.)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- Environment variables for sensitive data
- HTTPS enforcement in production
- Content Security Policy headers
- XSS protection enabled

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Dev Kao** - Full Stack Developer

- 🌐 Website: [devnid.netlify.app](https://devnid.netlify.app)
- 📧 Email: shayetet14@protonmail.com
- 📱 LINE: kao_no_limit
- 💬 Telegram: [@up2uok](https://t.me/up2uok)

---

<div align="center">
  <p>Made with ❤️ by Dev Kao</p>
  <p>🚀 Ready for Production | ⚡ Powered by Vite | 🎨 Styled with Tailwind</p>
</div>
