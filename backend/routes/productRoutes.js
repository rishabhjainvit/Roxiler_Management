const express = require('express');
const { seedDatabase, 
    getTransactions, 
    getStatistics, 
    getPriceRangeDistribution,
    getCategoryDistribution ,
    getCombinedData,
    getFilteredTransactions
} = require('../controllers/productController');
const Product = require('../models/Product'); 

const router = express.Router();


router.get('/initialize', seedDatabase);


router.get('/transactions', getTransactions);


router.get('/statistics', getStatistics);


router.get('/price-range', getPriceRangeDistribution);

router.get('/category-distribution' , getCategoryDistribution);

router.get('/combined-data' , getCombinedData );

router.get('/filtered-transactions' , getFilteredTransactions);

router.post('/products', async (req, res) => {
    try {
        const { title, description, price, dateOfSale, category } = req.body;
        const newProduct = new Product({ title, description, price, dateOfSale, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error });
    }
});

router.get('/products/bar-chart/:month', async (req, res) => {
    const { month } = req.params;
    const monthNumber = parseInt(month, 10);

    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ message: 'Invalid month parameter' });
    }

    try {
        
        const products = await Product.find({
            dateOfSale: { $type: "date" },  
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        });

     
        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0,
        };

     
        products.forEach(product => {
            const price = parseFloat(product.price);

            if (isNaN(price)) {
                console.warn(`Invalid price for product ${product._id}: ${product.price}`);
                return;  
            }

            if (price >= 0 && price <= 100) {
                priceRanges['0-100']++;
            } else if (price >= 101 && price <= 200) {
                priceRanges['101-200']++;
            } else if (price >= 201 && price <= 300) {
                priceRanges['201-300']++;
            } else if (price >= 301 && price <= 400) {
                priceRanges['301-400']++;
            } else if (price >= 401 && price <= 500) {
                priceRanges['401-500']++;
            } else if (price >= 501 && price <= 600) {
                priceRanges['501-600']++;
            } else if (price >= 601 && price <= 700) {
                priceRanges['601-700']++;
            } else if (price >= 701 && price <= 800) {
                priceRanges['701-800']++;
            } else if (price >= 801 && price <= 900) {
                priceRanges['801-900']++;
            } else if (price >= 901) {
                priceRanges['901-above']++;
            }
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products for bar chart', error: error.message });
    }
});


router.get('/piechart/:month', async (req, res) => {
    const { month } = req.params;
    try {
        const startOfMonth = new Date(`2024-${month}-01T00:00:00Z`);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        console.log("Start of Month:", startOfMonth);
        console.log("End of Month:", endOfMonth);

        const products = await Product.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    },
                    category: { $ne: null }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        console.log("Aggregated Products:", products);

        const categoryData = products.map(product => ({
            category: product._id,
            count: product.count
        }));

        res.status(200).json(categoryData);
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching products for pie chart',
            error
        });
    }
});

router.get('/combined-data', async (req, res) => {
    try {
        const api3Url = 'http://localhost:5000/api/products/initialize?';
        const api4Url = 'http://localhost:5000/api/products/transactions?month=March&page=1&perPage=10';
        const api5Url = 'http://localhost:5000/api/products/statistics?month=3';
        const api6Url = 'http://localhost:5000/api/products/price-range?month=3';
        const api7Url = 'http://localhost:5000/api/products/category-distribution?month=3';
        const api8Url = 'http://localhost:5000/api/products/filtered-transactions?month=3&category=Electronics&startDate=2023-03-01&endDate=2023-03-31';
        const api1Url = 'http://localhost:5000/api/products/bar-chart/03'; 
        const api2Url = 'http://localhost:5000/api/piechart/03'; 
        // const api3Url = 'http://localhost:5000/api/another-endpoint';


       
        const [response1, response2, response3, response4, response5, response6, response7, response8] = await Promise.all([
            axios.get(api1Url),
            axios.get(api2Url),
            axios.get(api3Url),
            axios.get(api4Url),
            axios.get(api5Url),
            axios.get(api6Url),
            axios.get(api7Url),
            axios.get(api8Url),
        ]);

        const combinedResponse = {
            barChartData: response1.data,
            pieChartData: response2.data,
            anotherData: response3.data, 
            transactionsData: response4.data, 
            statisticsData: response5.data,
            priceRangeData: response6.data,
            categoryDistributionData: response7.data,
            filteredTransactionsData: response8.data,
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Error fetching combined data', error: error.message });
    }
});




module.exports = router;
