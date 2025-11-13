# DocNova - Invoice Management System

A modern web application for managing invoices, built with React, Redux Toolkit, and Ant Design.

## 🚀 Features

- User authentication (login/logout)
- Invoice listing with pagination
- Invoice details view
- Multi-language support (i18n)
- Responsive design
- Modern UI with Ant Design

## 🛠️ Tech Stack

- ⚡ React 19
- 🎨 Ant Design v5
- 🧭 React Router v7
- 🏗️ Vite
- 🌐 i18next for internationalization
- 🧠 Redux Toolkit for state management
- 🔄 Axios for API requests
- 🎨 Tailwind CSS for custom styling

## 📦 Prerequisites

- Node.js 18+
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd docnova
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```



3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:3000`

4. **Login**
   Use the following credentials to log in to the application:
   ```
   devmelauser@yopmail.com
   Work123???
   ```

## 🔐 Login Credentials

Use the following credentials to log in to the application:

- **Email:** devmelauser@yopmail.com
- **Password:** Work123???

## 📂 Project Structure

```
src/
├── api/               # API configuration and services
├── assets/            # Static assets (images, icons, etc.)
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization files
├── layouts/           # Layout components
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   └── invoices/      # Invoice management pages
├── store/             # Redux store configuration
│   ├── auth/          # Authentication slice
│   └── invoice/       # Invoice slice
└── utils/             # Utility functions
```

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## 🌐 API Integration

The application communicates with the following API endpoints:

- **Authentication:** `POST /auth/login/dev`
- **Invoice Search:** `POST /invoice/search`

## 🔧 Troubleshooting

- If you encounter any issues with the API, check the browser's console for error messages
- Make sure all environment variables are correctly set in the `.env` file
- Clear your browser cache if you experience any caching issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
