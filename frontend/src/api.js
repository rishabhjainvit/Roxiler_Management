import axios from 'axios';

export const createProduct = (productData) => {
    return axios.post('/api/products', productData);
};

export const getTransactions = (month, search = '', page = 1, perPage = 10) => {
    const url = `http://localhost:5000/api/products/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPage}`;
    return axios.get(url);
};

export const getStatistics = (month) => {
    const url = `http://localhost:5000/api/products/statistics?month=${month}`;
    return axios.get(url);
};

export const getPriceRangeDistribution = (month) => {
    const url = `http://localhost:5000/api/products/price-range?month=${month}`;
    return axios.get(url);
};

export const getCategoryDistribution = (month) => {
    const url = `http://localhost:5000/api/products/category-distribution?month=${month}`;
    return axios.get(url);
};

export const getFilteredTransactions = (month, category, startDate, endDate) => {
    const url = `http://localhost:5000/api/products/filtered-transactions?month=${month}&category=${category}&startDate=${startDate}&endDate=${endDate}`;
    return axios.get(url);
};

export const getBarChartData = (month) => {
    const url = `http://localhost:5000/api/products/bar-chart/${month}`;
    return axios.get(url);
};

export const getPieChartData = (month) => {
    const url = `http://localhost:5000/api/piechart/${month}`;
    return axios.get(url);
};

export const getCombinedData = (month) => {
    const url = `http://localhost:3000/combined-data?month=${month}`;
    return axios.get(url);
};

