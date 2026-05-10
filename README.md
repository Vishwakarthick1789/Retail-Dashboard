# Retail Growth & Seasonal Intelligence Dashboard

A modern, responsive, and data-rich retail intelligence dashboard built using React, TypeScript, Tailwind CSS, and Recharts. This project aims to track and analyze retail metrics, including total sales, average order value, conversion rates, and sales growth. It features a dark/light mode, dynamic data filtering, and detailed data visualizations to empower businesses with key insights.

## Features

- **Responsive Design**: Flawless interface whether on desktop, tablet, or mobile.
- **Dark/Light Mode**: User-friendly theme-switching capabilities.
- **KPI Metrics**: Real-time snapshot of Total Sales, Average Order Value, Conversion Rate, and Growth.
- **Interactive Visualizations**: Powerful charts using Recharts for categorical, regional, and seasonal sales analysis.
- **Data Table**: Searchable, paginated transaction table for tracking recent orders.
- **Dynamic Filtering**: Date, region, and category filters to dive deep into exactly what you want to see.

## How to View and Run the Dashboard Locally

Follow these step-by-step instructions to get the dashboard up and running on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer. Node.js comes with `npm` (Node Package Manager), which is required to install the project dependencies.

### Step 1: Open the Project
Ensure you are in the project root directory (`retail-dashboard`) in your terminal or command prompt.

### Step 2: Install Dependencies
Before running the dashboard, you will need to install all the required libraries and dependencies. Run the following command in your terminal:
```bash
npm install
```
*(Wait for the installation to complete. This may take a few moments.)*

### Step 3: Start the Development Server
Once the dependencies are installed, now you can start up the local development server by executing this command:
```bash
npm run dev
```

### Step 4: Open the Dashboard in your Browser
After running the command in Step 3, the terminal will display a local server link. It typically looks like this:
```
  ➜  Local:   http://localhost:5173/
```
- Hold down the **Ctrl** key (or **Cmd** on Mac) and click the link in your terminal, OR
- Open your preferred web browser (e.g., Chrome, Edge, Safari) and type `http://localhost:5173/` into the address bar.

### Step 5: Explore
You can now interact with the dashboard! Try toggling the Dark Mode in the top right corner, switching tabs between 'Overview', 'Analytics', and 'Reports', and exploring the data charts.

## Technologies Used
- Frontend: React 18, Vite
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Charts: Recharts
