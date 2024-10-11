import React, { useState } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [year, setYear] = useState('2024');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const monthMap = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };

  const fetchTransactions = async (search = '', month = '03', year = '2024', page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products/transactions?month=March&page=1&perPage=10
=${month}&year=${year}&search=${search}&page=${page}&perPage=${perPage}`);
      console.log('API Response:', response.data);
      setTransactions(response.data.transactions || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSearch = () => {
    const mappedMonth = monthMap[selectedMonth] || '03';
    if (selectedMonth && year) {
      fetchTransactions('', mappedMonth, year, page, perPage);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.dashboardTitle}>Transaction Table</h2>

      <div style={styles.searchContainer}>
        <select onChange={handleMonthChange} style={styles.searchInput}>
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <input
          type="text"
          placeholder="Enter Year (YYYY)"
          value={year}
          onChange={handleYearChange}
          style={styles.searchInput}
        />

        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>
      </div>

      <div style={styles.tableContainer}>
        {loading ? (
          <p style={styles.loadingText}>Loading transactions...</p>
        ) : transactions.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>ID</th>
                <th style={styles.header}>Title</th>
                <th style={styles.header}>Description</th>
                <th style={styles.header}>Price</th>
                <th style={styles.header}>Category</th>
                <th style={styles.header}>Sold</th>
                <th style={styles.header}>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} style={styles.row}>
                  <td style={styles.cell}>{transaction.id}</td>
                  <td style={styles.cell}>{transaction.title}</td>
                  <td style={styles.cell}>{transaction.description}</td>
                  <td style={styles.cell}>${transaction.price.toFixed(2)}</td>
                  <td style={styles.cell}>{transaction.category}</td>
                  <td style={styles.cell}>{transaction.sold ? 'Yes' : 'No'}</td>
                  <td style={styles.cell}>
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      style={styles.image}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noTransactions}>No transactions found for the selected month and year.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    textAlign: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '90%',
    backgroundColor: '#f7f9fc',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.8s ease-in-out',
  },
  dashboardTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2c3e50',
    letterSpacing: '1px',
    animation: 'slideIn 0.8s ease-out',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    animation: 'fadeIn 1s ease-in',
  },
  searchInput: {
    padding: '12px',
    margin: '0 10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: '0.3s',
    width: '200px',
  },
  searchButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  tableContainer: {
    margin: '30px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in',
  },
  loadingText: {
    fontSize: '18px',
    fontStyle: 'italic',
    color: '#888',
  },
  noTransactions: {
    fontSize: '18px',
    color: '#e74c3c',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    animation: 'fadeIn 1s ease-in',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '12px 15px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '16px',
    letterSpacing: '0.5px',
  },
  row: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#ecf0f1',
    },
  },
  cell: {
    padding: '10px 15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#2c3e50',
  },
  image: {
    width: '50px',
    borderRadius: '8px',
    transition: 'transform 0.3s',
  },
  noTransactions: {
    color: '#e74c3c',
    fontSize: '18px',
  },
};

// Add animations to your global styles or in a separate CSS file
const animations = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes slideIn {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export default TransactionTable;
