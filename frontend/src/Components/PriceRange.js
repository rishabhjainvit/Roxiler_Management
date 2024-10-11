import React, { useState } from 'react';
import axios from 'axios';

const styles = {
    container: {
      width: '100%',
      maxWidth: '1050px',
      margin: '20px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      transition: 'transform 0.3s ease-in-out',
      ':hover': {
        transform: 'scale(1.02)',
      },
    },
    title: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      animation: 'fadeIn 1.5s ease-out',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      animation: 'fadeIn 2s ease-out',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      cursor: 'pointer',
    },
    listItemRange: {
      color: '#555',
      fontWeight: 'bold',
    },
    barContainer: {
      flexGrow: 1,
      marginLeft: '10px',
      height: '10px',
      borderRadius: '5px',
      backgroundColor: '#e0e0e0',
      position: 'relative',
      transition: 'background-color 0.3s ease',
    },
    bar: (count, maxCount) => ({
      height: '100%',
      width: `${(count / maxCount) * 100}%`,
      backgroundColor: '#4CAF50',
      borderRadius: '5px',
      position: 'absolute',
      top: '0',
      left: '0',
      transition: 'width 0.4s ease-out',
    }),
    totalCount: {
      marginTop: '30px',
      fontWeight: 'bold',
      fontSize: '22px',
      textAlign: 'center',
      color: '#333',
      animation: 'fadeIn 2s ease-out',
    },
    form: {
      marginBottom: '30px',
      textAlign: 'center',
      animation: 'fadeIn 2s ease-out',
    },
    label: {
      marginRight: '15px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
    select: {
      padding: '10px',
      fontSize: '16px',
      marginRight: '15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      transition: 'border 0.3s ease',
    },
    submitButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
  };
  
 
  const fadeInAnimation = `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

const PriceRange = () => {
  const [priceData, setPriceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchPriceRangeDistribution = async (month = 3) => {
    setLoading(true);
    setError(null); 

    try {
      const response = await axios.get(`http://localhost:5000/api/products/price-range?month=3
=${month}`);
      if (response.data.success) {
        setPriceData(response.data.data);
      } else {
        setError('Error fetching price data');
        console.error('Error fetching price data:', response.data.message);
      }
    } catch (error) {
      setError('Error fetching price data');
      console.error('Error fetching price data:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPriceRangeDistribution(selectedMonth);
  };

  
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };


  const totalCount = priceData.reduce((total, item) => total + item.count, 0);
  const maxCount = Math.max(...priceData.map((item) => item.count), 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Price Range Distribution</h2>

     
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange} style={styles.select}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <button type="submit" style={styles.submitButton}>Fetch Data</button>
      </form>

      
      {loading && <p>Loading data...</p>}

     
      {error && <p style={{ color: 'red' }}>{error}</p>}

      
      {!loading && !error && priceData.length > 0 && (
        <ul style={styles.list}>
          {priceData.map((item) => (
            <li key={item.range} style={styles.listItem}>
              <span style={styles.listItemRange}>{item.range}</span>
              <span>{item.count}</span>
              <div style={styles.barContainer}>
                <div style={styles.bar(item.count, maxCount)} />
              </div>
            </li>
          ))}
        </ul>
      )}

     
      {!loading && totalCount > 0 && <div style={styles.totalCount}>Total Count: {totalCount}</div>}
    </div>
  );
};

export default PriceRange;
