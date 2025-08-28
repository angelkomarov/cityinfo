# City Info (Angular Project)

This is a sample Angular application that displays information about cities.  
The app communicates with a simulated back-end API powered by **json-server**.

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- [json-server](https://github.com/typicode/json-server)

---

## Setup & Run

1. **Clone the repository**
  ```bash
  git clone https://github.com/angelkomarov/cityinfo.git
  cd cityinfo
  ```
2. **Install dependencies**
  ```bash
  npm install
  ```
3. **Start the mock API (json-server)**
  ```bash
  npx json-server --watch db.json --port 5000
  ```
The API will now be available at:
`http://localhost:5000`

4. **Run the Angular app**
```bash
ng serve
```

By default, the app runs at:
`http://localhost:4200`

**Notes**

Make sure json-server is running before starting the Angular app, otherwise the API requests will fail.

The Angular app assumes the API is available at `http://localhost:5000`.

**Scripts**

`ng serve` → Run the development server

`ng build` → Build the project for production

`ng test` → Run unit tests
