# MERN Stack Coding Challenge: Product Transactions

Welcome to the MERN Stack Coding Challenge. This repository contains a fully functional project that demonstrates the use of the MERN (MongoDB, Express, React, Node.js) stack. The project implements several APIs to manage and display product transaction data, using third-party data, and provides interactive charts and tables to visualize the data.

## Project Overview

This project consists of both a **Backend** and **Frontend** that allow you to interact with product transaction data.

### Backend APIs:
The backend is built using **Node.js** and **Express** to manage APIs. The APIs interact with a **MongoDB** database and provide the following functionalities:

1. **Initialize the Database**:
   - Fetch data from a third-party API and populate the database with seed data.

2. **Product Transactions**:
   - List all transactions with pagination and search support based on product title, description, or price.

3. **Transaction Statistics**:
   - Get statistics for a selected month, including:
     - Total sale amount
     - Total number of sold items
     - Total number of not sold items

4. **Price Range Bar Chart**:
   - Returns the number of items in each price range for the selected month, including:
     - 0 - 100, 101 - 200, 201 - 300, etc.

5. **Category-wise Pie Chart**:
   - Returns the number of items per unique category for the selected month.

6. **Combined Data API**:
   - Fetches and combines all the data from the above APIs and returns a comprehensive response.

### Frontend:
The frontend is built with **React** and displays the following:

- **Transactions Table**: 
  - Displays transactions for a selected month.
  - Search functionality for product title, description, or price.
  - Pagination for navigating through pages of transactions.

- **Statistics Section**: 
  - Displays the total sales amount, total sold items, and total not sold items for the selected month.

- **Bar Chart**: 
  - Visualizes the price ranges and the number of items in each range for the selected month.

- **Pie Chart**:
  - Displays the number of items per category for the selected month.

---

## Features

### Backend:
- **API for Initializing Database**: Automatically populates the database with product transaction data from the third-party API.
- **Pagination and Search for Transactions**: Supports searching and pagination in transaction data.
- **Statistical APIs**: Provides data for total sales, sold items, and unsold items for a selected month.
- **Price Range Bar Chart API**: Groups items into price ranges and returns the number of items in each range.
- **Category-wise Pie Chart API**: Returns the count of items in each category for the selected month.

### Frontend:
- **Dropdown for Selecting Month**: Allows users to select a month (Jan-Dec) to filter the data.
- **Transaction Search Box**: Filters transactions based on title, description, and price.
- **Pagination Controls**: Allows users to navigate through the transaction pages (Next/Previous).
- **Charts**: Displays interactive bar and pie charts based on the backend APIs.

---

## Installation Instructions

### Prerequisites:
- Node.js (v14+)
- MongoDB (locally or use a cloud MongoDB service)
- React (v18+)
- axios (for making HTTP requests)


