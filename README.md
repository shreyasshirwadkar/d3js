# COVID-19 Dashboard


This project is a COVID-19 Dashboard built using **React, TypeScript, D3.js, and Tailwind CSS**. The dashboard visualizes COVID-19 case data using **bar charts and pie charts**, allowing users to select multiple countries and view their respective case counts.

## Features

- **Dynamic Data Fetching**: Fetches live COVID-19 data from `https://disease.sh/v3/covid-19/countries`.
- **Interactive Charts**: Displays COVID-19 cases using **BarChart** and **PieChart** components built with **D3.js**.
- **Country Selection Dropdown**: Users can select or deselect countries from a predefined list.
- **Zoom and Tooltip Support**: The bar chart supports zooming, and both charts display tooltips with relevant details.

## Technologies Used

- **React** (Functional Components, Hooks)
- **TypeScript** (For type safety)
- **D3.js** (For data visualization)
- **Tailwind CSS** (For styling)
- **Heroicons** (For UI elements like dropdown icons)

## Installation and Setup

### Prerequisites

- Node.js & npm/yarn installed
- Basic knowledge of React & TypeScript

### Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/covid-dashboard.git
   cd covid-dashboard
   ```
2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the Development Server**
   ```sh
   npm start
   # or
   yarn start
   ```
4. Open `http://localhost:3000` in your browser.

## Project Structure

```
.
├── src
│   ├── components
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   ├── Dashboard.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── styles.css
├── public
├── package.json
└── README.md
```

## Usage

1. Select countries from the dropdown.
2. View case distribution in bar and pie charts.
3. Hover over bars and pie slices to see exact case numbers.
4. Zoom in on the bar chart using the scroll wheel.

## Contribution

If you'd like to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License**.
