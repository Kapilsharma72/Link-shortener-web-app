# React URL Shortener Web App

A user-friendly URL Shortener application built with React and Material UI. This app allows you to shorten long URLs, manage custom shortcodes, track click analytics, and view detailed statistics—all on the client side, with no backend required.

---

## 🚀 Features

- **Shorten up to 5 URLs at once**
- **Custom or auto-generated shortcodes** (alphanumeric, 4-12 chars, unique)
- **Set custom validity** (in minutes) or use default (30 min)
- **Client-side validation** for all inputs
- **Material UI** for a clean, modern interface
- **Statistics page** with click analytics (timestamp, source, location)
- **Redirection** with click logging and expiry handling
- **Custom logging middleware** (no console.log)
- **All data managed in localStorage** (no backend, no authentication)

---

## 📦 Requirements

- Node.js (v16 or higher recommended)
- npm (v8 or higher)

---

## 🛠️ Installation & Setup

1. **Clone the repository or copy the project files**

2. **Navigate to the frontend directory:**
   ```sh
   cd Shortener-web-app
   ```

3. **Install dependencies:**
   ```sh
   npm install
   # If you see errors about missing icons, also run:
   npm install @mui/icons-material
   ```

---

## 🧩 Main Dependencies

- **React** (v19+)
- **Material UI** (`@mui/material`, `@emotion/react`, `@emotion/styled`)
- **Material UI Icons** (`@mui/icons-material`)
- **React Router DOM** (`react-router-dom`)

---

## ▶️ Running the App

Start the development server:

```sh
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 📝 Usage

### **Shorten URLs**
- Go to the home page.
- Enter up to 5 long URLs.
- Optionally set validity (in minutes) and/or a custom shortcode.
- Click **Shorten URLs**.
- Get your short links and expiry info instantly.

### **View Statistics**
- Go to the **Statistics** page from the top navigation.
- See all your shortened URLs, their creation/expiry, and click counts.
- Expand any row to see detailed click analytics (timestamp, source, location).

### **Redirection**
- Open any short URL (e.g., `http://localhost:3000/abc123`) in your browser.
- The app will log the click and redirect to the original URL (if not expired).

---

## 🛡️ Logging Middleware
- All significant actions (shorten, click, errors) are logged using a custom logger (`src/utils/logger.js`).
- No use of `console.log` or browser loggers.
- Logs are stored in localStorage and can be extended/exported if needed.

---

## 🏗️ Architecture Notes
- **No backend**: All data is managed in the browser (localStorage).
- **No authentication**: Anyone can use the app; all users are pre-authorized.
- **Material UI only**: No other CSS frameworks or libraries are used.
- **Client-side routing**: All short URLs and stats are handled by React Router.

---

## 📚 Project Structure

```
frontend/
  src/
    components/
      UrlShortenerForm.jsx
      StatsTable.jsx
    pages/
      ShortenerPage.jsx
      StatsPage.jsx
      RedirectHandler.jsx
    utils/
      logger.js
      validation.js
      storage.js
      shortener.js
      geo.js
    App.js
    index.js
  package.json
  README.md
```

---

## ❓ FAQ / Notes
- **Persistence:** All data is stored in your browser. Clearing localStorage will erase all URLs and stats.
- **Geolocation:** Click analytics use mock locations for demo purposes.
- **Extending:** You can add backend support, authentication, or real geolocation as needed.

---

## 👨‍💻 Author & License

- Developed for the Campus Hiring Evaluation.
- Free to use and modify for educational purposes.

