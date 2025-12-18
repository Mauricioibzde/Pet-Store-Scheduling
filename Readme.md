

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
├── libs/
│   └── day.js
├── style/
│   ├── core/
│   ├── layout/
│   ├── components/
│   ├── responsive/
│   └── index.css
├── script/
│   └── script-open-menu.js
├── modules/
│   ├── load-page.js
│   ├── form/
│   │   ├── hours-load.js
│   │   ├── load-schedules.js
│   │   └── submit.js
│   └── schedules/
│       └── load.js
├── utils/
│   └── opening-hours.js
└── main.js

index.html
server.json
webpack.config.js
render.yaml
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

## 🌐 Live Demo & Deployment (Render)

This project is set up to deploy on Render using two services:

- Frontend (Static Site): builds with `npm run build` and serves `dist/`
- API (json-server): runs a mock REST API on a dynamic `$PORT`

See configuration in [render.yaml](render.yaml).

Optional live demo: https://pet-store-scheduling.onrender.com/

---

## 📎 Key Files & Paths

- Entry point: `src/main.js`
- Webpack config: `webpack.config.js`
- HTML template: `index.html`
- Styles: `src/style/index.css` and subfolders in `src/style/`
- Modal & pickers script: `src/script/script-open-menu.js`
- Form logic: `src/modules/form/submit.js`
- Hour availability logic: `src/modules/form/hours-load.js`
- Hour list: `src/modules/form/load-schedules.js`
- Schedule day integration: `src/modules/schedules/load.js`
- Opening hours utility: `src/utils/opening-hours.js`
- Mock API data: `server.json`
- Render deployment config: `render.yaml`

## 🔌 API (JSON Server)

JSON Server exposes the following resources from [server.json](server.json):

- `GET /appointments`
- `POST /appointments`
- `DELETE /appointments/:id`
- `GET /users`

Sample appointment object:

```json
{
	"id": 1,
	"tutor": "Helena Souza",
	"pet": "Cheddar",
	"phone": "(55) 98524-5478",
	"description": "Bath",
	"date": "2025-12-18",
	"hour": "09:00"
}
```

---

## ⚙️ Configuration & Environment

- Day.js locale is set to German (de) in [src/main.js](src/main.js). Change it if needed.
- Dev server uses `PORT` from environment when available.
- See [.env.example](.env.example) for variables:

```env
NODE_ENV=production
API_URL=http://localhost:3333
```

---

## 🛠️ Troubleshooting

- Invalid Host header: fixed by `allowedHosts: "all"` and `host: "0.0.0.0"` in [webpack.config.js](webpack.config.js).
- Day.js locale import in Node ESM: use `import "dayjs/locale/de.js"` and `dayjs.locale("de")` in [src/main.js](src/main.js).
- Port conflicts: stop existing Node processes before starting dev.

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm run dev
```

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
