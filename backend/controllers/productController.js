const axios = require('axios');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');


exports.seedDatabase = async (req, res) => {
    try {
        await Product.deleteMany({}); 
        
        const products = [
            {
                title: 'Product 1',
                description: 'Description for Product 1',
                price: 100,
                dateOfSale: new Date('2024-03-01T00:00:00Z'),
            },
            {
                title: 'Product 2',
                description: 'Description for Product 2',
                price: 150,
                dateOfSale: new Date('2024-03-15T00:00:00Z'),
            },
            {
                title: 'Product 3',
                description: 'Description for Product 3',
                price: 200,
                dateOfSale: new Date('2024-03-30T00:00:00Z'),
            },
            {
                title: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation.',
                price: 150,
                dateOfSale: new Date('2024-03-10T00:00:00Z'),
            },
            {
                title: 'Smartphone',
                description: 'Latest smartphone with advanced features and great camera.',
                price: 800,
                dateOfSale: new Date('2024-03-15T00:00:00Z'),
            },
            {
                title: 'Gaming Laptop',
                description: 'High-performance laptop designed for gaming and multimedia.',
                price: 1200,
                dateOfSale: new Date('2024-03-20T00:00:00Z'),
            },
            {
                title: 'Bluetooth Speaker',
                description: 'Portable Bluetooth speaker with deep bass and clear sound.',
                price: 100,
                dateOfSale: new Date('2024-03-25T00:00:00Z'),
            },
            {
                title: 'Smartwatch',
                description: 'Stylish smartwatch with fitness tracking and notifications.',
                price: 250,
                dateOfSale: new Date('2024-03-30T00:00:00Z'),
            },
            {
                title: 'Laptop Stand',
                description: 'Ergonomic laptop stand for better posture and comfort.',
                price: 45,
                dateOfSale: new Date('2024-04-01T00:00:00Z'),
            },
            {
                title: 'USB-C Hub',
                description: 'Multi-port USB-C hub for connecting multiple devices.',
                price: 60,
                dateOfSale: new Date('2024-04-05T00:00:00Z'),
            },
            {
                title: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with customizable buttons.',
                price: 30,
                dateOfSale: new Date('2024-04-10T00:00:00Z'),
            },
            {
                title: 'External SSD',
                description: 'Portable external SSD with fast read/write speeds.',
                price: 120,
                dateOfSale: new Date('2024-04-15T00:00:00Z'),
            },
            {
                title: 'HDMI Cable',
                description: 'High-speed HDMI cable for crystal clear video and audio.',
                price: 15,
                dateOfSale: new Date('2024-04-20T00:00:00Z'),
            },
            {
                title: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation.',
                price: 150,
                dateOfSale: new Date("2024-03-05T00:00:00Z"),
                category: 'Electronics'
            },
            {
                title: 'Smartphone',
                description: 'Latest smartphone with advanced features and great camera.',
                price: 800,
                dateOfSale: new Date("2024-03-10T00:00:00Z"),
                category: 'Electronics'
            },
            {
                title: 'Gaming Laptop',
                description: 'High-performance laptop designed for gaming and multimedia.',
                price: 1200,
                dateOfSale: new Date("2024-03-20T00:00:00Z"),
                category: 'Computers'
            },
            {
                title: 'Bluetooth Speaker',
                description: 'Portable Bluetooth speaker with deep bass and clear sound.',
                price: 100,
                dateOfSale: new Date("2024-03-25T00:00:00Z"),
                category: 'Electronics'
            },
            {
                title: 'Smartwatch',
                description: 'Stylish smartwatch with fitness tracking and notifications.',
                price: 250,
                dateOfSale: new Date("2024-03-30T00:00:00Z"),
                category: 'Wearables'
            }
        ];
        

        await Product.insertMany(products);
        res.status(201).json({ message: 'Database seeded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to seed database', error });
    }
};


exports.getTransactions = async (req, res) => {
    const { month, page = 1, perPage = 10 } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    const monthIndex = monthMap[month];

    if (monthIndex === undefined) {
        return res.status(400).json({ message: 'Invalid month name' });
    }

    const startDate = new Date(new Date().getFullYear(), monthIndex, 1); 
    const endDate = new Date(new Date().getFullYear(), monthIndex + 1, 1); 

    const startIndex = (page - 1) * perPage; 

    try {
        const transactions = await Product.find({
            dateOfSale: { $gte: startDate, $lt: endDate } 
        })
        .skip(startIndex)
        .limit(perPage);

        const totalTransactions = await Product.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        res.json({
            transactions,
            totalPages: Math.ceil(totalTransactions / perPage),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





exports.getStatistics = async (req,res) => {
    try {
        const { month } = req.query;

        const monthCondition = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };

        const totalSales = await Product.aggregate([
            { $match: monthCondition },
            { 
                $group: { 
                    _id: null, 
                    totalSaleAmount: { $sum: '$price' }, 
                    totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } } 
                } 
            }
        ]);
        
        const notSoldItems = await Product.countDocuments({ ...monthCondition, sold: false });

    
        res.json({
            success: true,
            data: {
                totalSaleAmount: totalSales[0]?.totalSaleAmount || 0,
                totalSoldItems: totalSales[0]?.totalSoldItems || 0,
                totalNotSoldItems: notSoldItems || 0
            }
        });
    } catch (error) {
        console.error('Error in getStatistics:', error);
       
        return {
            success: false,
            message: 'Failed to get statistics',
            error: error.message
        };
    }
};


exports.getPriceRangeDistribution = async (req, res) => {
    try {
        const { month } = req.query;

        const monthCondition = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };

        const priceDistribution = await Product.aggregate([
            { $match: monthCondition },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "901-above",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ]);

       
        res.json({
            success: true,
            data: priceDistribution.map(bucket => ({
                range: bucket._id === Infinity ? '901-above' : `${bucket._id - (bucket._id % 100)}-${bucket._id}`,
                count: bucket.count
            }))
        });
    } catch (error) {
        console.error('Error in getPriceRangeDistribution:', error);
        
        res.status(500).json({
            success: false,
            message: 'Failed to get price range distribution',
            error: error.message
        });
    }
};





exports.getCategoryDistribution = async (req,res) => {
    try {
        const { month } = req.query;

        const monthCondition = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };

        const categoryDistribution = await Product.aggregate([
            { $match: monthCondition },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $project: { _id: 0, category: '$_id', count: 1 } }
        ]);

        res.json({categoryDistribution});
    } catch (error) {
        console.error('Error in getCategoryDistribution:', error);
        throw new Error('Failed to get category distribution');
    }
};


exports.getFilteredTransactions = [
    
    check('month').isInt({ min: 1, max: 12 }),
    check('category').notEmpty(), 
    check('startDate').isISO8601(),
    check('endDate').isISO8601(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { month, category, startDate, endDate } = req.query;

        
        console.log('Month:', month);
        console.log('Category:', category);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        

        try {
            const transactions = await Product.find({
                $expr: {
                    $and: [
                        { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                        { $eq: ['$category', category] },
                        { $gte: ['$dateOfSale', new Date(startDate)] },
                        { $lte: ['$dateOfSale', new Date(endDate)] }
                    ]
                }
            });
            

          
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get filtered transactions', error });
        }
    }
];





exports.getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

       
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

      
        const transactions = await Product.find({
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
        });

      
        const statistics = await this.getStatistics(req);
        
     
        const priceRangeDistribution = await this.getPriceRangeDistribution(req);
        
      
        const categoryDistribution = await this.getCategoryDistribution(req);

      
        res.status(200).json({
            transactions,
            statistics,
            priceRangeDistribution,
            categoryDistribution
        });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'Failed to get combined data', error: error.message });
    }
};



