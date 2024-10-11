import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './Components/TransactionTable';
import Statistics from './Components/Statistics';
import BarChart from './Components/BarChart';
import PriceRange from './Components/PriceRange';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [priceData, setPriceData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchPriceRangeDistribution();
    fetchBarChartData();
    fetchCombinedData();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/transactions');
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/statistics');
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        console.error('Error fetching statistics:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error.response ? error.response.data : error.message);
    }
  };

  const fetchPriceRangeDistribution = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/price-range');
      if (response.data.success) {
        setPriceData(response.data.data);
      } else {
        console.error('Error fetching price data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching price data:', error.response ? error.response.data : error.message);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/bar-chart');
      if (response.data.success) {
        setBarChartData(response.data.data);
      } else {
        console.error('Error fetching bar chart data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching bar chart data:', error.response ? error.response.data : error.message);
    }
  };

  const fetchCombinedData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/combined-data');
      if (response.data.success) {
        setCombinedData(response.data.data);
      } else {
        console.error('Error fetching combined data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching combined data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="dashboard" style={{ textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Transaction Dashboard</h1>
      <TransactionTable transactions={transactions} />
      <Statistics stats={stats} />
      <BarChart data={barChartData} />
      <PriceRange data={priceData} />
    </div>
  );
};

export default App;
