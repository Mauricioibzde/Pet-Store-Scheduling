

---

# 🐾 Pet Store Scheduling

A simple and elegant **dark-themed UI** for managing a pet shop schedule.
This project was built as a **Rocketseat challenge**, focusing on clean UI, accessibility, modular CSS, and a modern front-end workflow using **Webpack**.

---

## 📸 Preview

![Project Screenshot](./Screenshot.png)

---

## 🚀 Technologies

* HTML5
* CSS3 (modular architecture)
* JavaScript (ES6+)
* Webpack 5
* Babel
* JSON Server (mock API)

---

## 📂 Project Structure

```
assets/
└── icon/              # Icons and images

dist/                 # Production build (generated)

src/
├── style/
│   ├── core/
│   ├── layout/
│   ├── components/
│   ├── responsive/
│   └── index.css
├── script/
└── main.js

index.html
server.json
webpack.config.js
package.json
```

---

## ⚙️ Requirements

Before running the project, make sure you have installed:

* **Node.js** (version 18 or higher recommended)
* **npm** (comes with Node.js)

---

## 📦 Installing Dependencies

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Mauricioibzde/Pet-Store-Scheduling.git
cd Pet-Store-Scheduling
npm install
```

---

## ▶️ Running the Project

### Development mode (Webpack Dev Server)

```bash
npm run dev
```

The project will be available at:

```
http://localhost:3000
```

---

### Mock API (JSON Server)

To start only the fake backend:

```bash
npm run server
```

Runs on:

```
http://localhost:3333
```

---

### Frontend + Backend together

```bash
npm start
```

This command runs **Webpack Dev Server** and **JSON Server** in parallel.

---

## 🏗️ Production Build

To generate an optimized production build:

```bash
npm run build
```

The output files will be generated in the `dist/` folder.

---

## 🎯 Features

* Custom date picker
* Schedule organized by time periods (Morning, Afternoon, Evening)
* Modal form for new appointments
* Modular and scalable CSS structure
* Dark theme UI
* Responsive layout

---

## 🧠 Learning Goals

This project focuses on:

* Front-end architecture
* Webpack configuration from scratch
* Modular CSS organization
* Accessibility and UI consistency
* Preparing a portfolio-ready project

---

## 📄 License

This project is licensed under the **ISC License**.

---

👨‍💻 Developed as part of a **Rocketseat challenge**
