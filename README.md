# City Info (Angular Project)

This is a sample Angular application that displays information about cities.  
The app communicates with a simulated back-end API powered by **json-server**.

---

## Prerequisites
- Node.js **14.15.x** or **16.x**
- Angular CLI `14.2.0` 
- [json-server](https://github.com/typicode/json-server) <br>
Note: project could run on newer Angular versions e.g. v17
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

## Project Structure
```
src/app/
│
├── app-routing.module.ts # Application routes
├── app.module.ts # Root Angular module
├── app.component.* # Root application component
│
├── app-sidebar/ # Feature: Sidebar
│ └── containers/
│ └── sidebar/ # Sidebar container component
│
├── app-toasts/ # Feature: Toast notifications
│ ├── containers/
│ │ └── info-toast/ # Info toast container component
│ └── services/ # Toast service logic
│
├── city/ # Feature: Cities
│ ├── containers/
│ │ └── city-list/ # City list container component
│ ├── models/ # City data models
│ └── services/ # API service for cities
│
├── point-of-interest/ # Feature: Points of Interest
│ ├── containers/
│ │ ├── point-of-interest/ # Single POI view
│ │ ├── points-of-interest-list/ # List of POIs
│ │ └── points-of-interest-summary/ # POI summary view
│ ├── models/ # POI data models
│ └── services/ # API service for POIs
│
└── shared/ # Shared functionality (cross-feature)
├── containers/
├── models/
└── services/
└── errror-handler.service.* # Centralized error handling
```
