import React, { useState } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);

  
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  
  const fetchStatistics = async () => {
    setLoading(true); 
    setError(''); 

    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/statistics?month=${selectedMonth}`
      );
      if (response.data.success) {
        setStats(response.data.data); 
      } else {
        setError('Failed to fetch statistics.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred.');
    } finally {
      setLoading(false); 
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatistics(); 
  };

  
  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }


  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.statisticsContainer}>
      <h2 style={styles.title}>Monthly Statistics</h2>

     
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Select Month:
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
        </label>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>

    
      {stats && (
        <div style={styles.statsBox}>
          <p style={styles.statItem}>
            Total Sale: <span style={styles.statValue}>{stats.totalSaleAmount}</span>
          </p>
          <p style={styles.statItem}>
            Total Sold Items: <span style={styles.statValue}>{stats.totalSoldItems}</span>
          </p>
          <p style={styles.statItem}>
            Total Not Sold Items: <span style={styles.statValue}>{stats.totalNotSoldItems}</span>
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  statisticsContainer: {
    textAlign: 'center',
    margin: '40px auto',
    padding: '30px',
    maxWidth: '100%',  
    width: '90%',     
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    boxSizing: 'border-box', 
    animation: 'fadeIn 1s ease-in-out',  
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '25px',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    animation: 'bounceIn 1s ease-out', 
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',  
    alignItems: 'center',
    animation: 'fadeInUp 0.5s ease-in-out', 
  },
  label: {
    fontSize: '18px',
    marginRight: '10px',
    color: '#444',
    fontWeight: '500',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '15px',
    width: '180px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#f5f6fa',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
    '&:hover': {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    }
  },
  statsBox: {
    backgroundColor: '#f5f6fa',
    padding: '30px 40px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '30px',
    maxWidth: '100%',  
    animation: 'fadeIn 1.2s ease-out', 
  },
  statItem: {
    fontSize: '20px',
    margin: '15px 0',
    color: '#555',
    fontWeight: '600',
    transition: 'color 0.3s ease',
  },
  statValue: {
    fontWeight: 'bold',
    color: '#28a745',
    fontSize: '22px',
  },
  loading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
    margin: '50px',
    animation: 'fadeIn 1s ease-out',
  },
  error: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    margin: '50px',
    animation: 'fadeIn 1s ease-out',
  },
};

// Keyframe animations
const keyframes = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0.3); }
    60% { opacity: 1; transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

export default Statistics;
