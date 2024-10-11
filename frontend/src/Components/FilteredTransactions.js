import React from 'react';


const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  listItemDescription: {
    color: '#555',
    fontWeight: 'bold',
  },
  listItemAmount: {
    color: '#4CAF50', 
    fontWeight: 'bold',
  },
  listItemDate: {
    color: '#999',
    fontSize: '0.9em',
    marginLeft: '10px',
  },
  statusIndicator: {
    padding: '5px 10px',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '0.9em',
    marginLeft: '10px',
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  pending: {
    backgroundColor: '#FFA500', 
  },
  totalAmount: {
    marginTop: '20px',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center',
  },
  hoverEffect: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
};

const FilteredTransactions = ({ data }) => {
 
  const totalAmount = data.reduce((total, transaction) => total + transaction.amount, 0).toFixed(2);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Filtered Transactions</h2>
      <ul style={styles.list}>
        {data.map(transaction => (
          <li 
            key={transaction.id} 
            style={{ 
              ...styles.listItem, 
              ...styles.hoverEffect 
            }}
          >
            <span style={styles.listItemDescription}>{transaction.description}</span>
            <span style={styles.listItemAmount}>{transaction.amount}</span>
            <span style={styles.listItemDate}>{transaction.date}</span>
            <span 
              style={{ 
                ...styles.statusIndicator, 
                ...(transaction.status === 'completed' ? styles.completed : styles.pending) 
              }}
            >
              {transaction.status}
            </span>
          </li>
        ))}
      </ul>
      <div style={styles.totalAmount}>Total Amount: ${totalAmount}</div>
    </div>
  );
};

export default FilteredTransactions;
