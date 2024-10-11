import React from 'react';

const CategoryDistribution = ({ data }) => {
  const totalCount = data.reduce((total, item) => total + item.count, 0);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      marginBottom: '20px',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      marginBottom: '8px',
      borderRadius: '5px',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      transition: 'background-color 0.3s ease',
      position: 'relative',
    },
    listItemHover: {
      backgroundColor: 'rgba(75, 192, 192, 0.3)',
    },
    count: {
      fontWeight: 'bold',
      color: '#007bff',
    },
    barContainer: {
      flexGrow: 1,
      height: '8px',
      borderRadius: '5px',
      backgroundColor: '#e0e0e0',
      marginLeft: '10px',
      position: 'relative',
    },
    bar: (count, total) => ({
      height: '100%',
      width: `${(count / total) * 100}%`,
      backgroundColor: '#4CAF50',
      borderRadius: '5px',
      position: 'absolute',
      top: '0',
      left: '0',
    }),
    tooltip: {
      position: 'absolute',
      backgroundColor: '#333',
      color: '#fff',
      padding: '5px',
      borderRadius: '5px',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
      zIndex: 10,
      visibility: 'hidden',
    },
    tooltipVisible: {
      visibility: 'visible',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Category Distribution</h2>
      <ul style={styles.list}>
        {data.map(item => (
          <li
            key={item.category}
            style={styles.listItem}
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              tooltip.style.visibility = 'visible';
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector('.tooltip');
              tooltip.style.visibility = 'hidden';
            }}
          >
            {item.category}: <span style={styles.count}>{item.count}</span>
            <div style={styles.barContainer}>
              <div style={styles.bar(item.count, totalCount)} />
            </div>
            <div className="tooltip" style={styles.tooltip}>
              {((item.count / totalCount) * 100).toFixed(2)}%
            </div>
          </li>
        ))}
      </ul>
      <h4 style={styles.title}>Total Count: <span style={styles.count}>{totalCount}</span></h4>
    </div>
  );
};

export default CategoryDistribution;
