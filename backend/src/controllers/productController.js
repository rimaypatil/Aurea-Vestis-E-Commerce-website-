const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
// @desc    Get products by sneaker tag
// @route   GET /api/products/sneakers
// @access  Public
exports.getSneakerProducts = async (req, res, next) => {
    try {
        const { sneakerTag, sort, page = 1, limit = 10 } = req.query;

        let query = { category: 'Sneakers' };

        if (sneakerTag) {
            query.sneakerTag = sneakerTag;
        }

        let productQuery = Product.find(query);

        // Sorting
        if (sort) {
            const sortMap = {
                'recommended': '-createdAt',
                'price_asc': 'price',
                'price_desc': '-price',
                'newest': '-createdAt',
                'rating_desc': '-rating',
                'bestsellers': '-salesCount'
            };
            const customSort = sortMap[sort] || sort.split(',').join(' ');
            productQuery = productQuery.sort(customSort);
        } else {
            productQuery = productQuery.sort('-createdAt');
        }

        // Pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const startIndex = (pageNum - 1) * limitNum;
        const total = await Product.countDocuments(query);

        productQuery = productQuery.skip(startIndex).limit(limitNum);

        const products = await productQuery;

        // Custom pagination result
        const pagination = {};
        if (startIndex + products.length < total) {
            pagination.next = { page: pageNum + 1, limit: limitNum };
        }
        if (startIndex > 0) {
            pagination.prev = { page: pageNum - 1, limit: limitNum };
        }

        res.status(200).json({
            success: true,
            count: products.length,
            pagination,
            data: products
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get products by accessory tag
// @route   GET /api/products/accessories
// @access  Public
exports.getAccessoryProducts = async (req, res, next) => {
    try {
        const { accessoriesTag, sort, page = 1, limit = 10 } = req.query;

        let query = { category: 'Accessories' };

        if (accessoriesTag) {
            query.accessoriesTag = accessoriesTag;
        }

        let productQuery = Product.find(query);

        // Sorting
        if (sort) {
            const sortMap = {
                'recommended': '-createdAt',
                'price_asc': 'price',
                'price_desc': '-price',
                'newest': '-createdAt',
                'rating_desc': '-rating',
                'bestsellers': '-salesCount'
            };
            const customSort = sortMap[sort] || sort.split(',').join(' ');
            productQuery = productQuery.sort(customSort);
        } else {
            productQuery = productQuery.sort('-createdAt');
        }

        // Pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const startIndex = (pageNum - 1) * limitNum;
        const total = await Product.countDocuments(query);

        productQuery = productQuery.skip(startIndex).limit(limitNum);

        const products = await productQuery;

        // Custom pagination result
        const pagination = {};
        if (startIndex + products.length < total) {
            pagination.next = { page: pageNum + 1, limit: limitNum };
        }
        if (startIndex > 0) {
            pagination.prev = { page: pageNum - 1, limit: limitNum };
        }

        res.status(200).json({
            success: true,
            count: products.length,
            pagination,
            data: products
        });
    } catch (err) {
        next(err);
    }
};

exports.getProducts = async (req, res) => {
    try {
        let query;

        // Copy req.query
        console.log(`DEBUG REQUEST: ${req.originalUrl}`, req.query);
        const reqQuery = { ...req.query };

        // Handle bracket notation if Express didn't parse it (e.g. 'category[nin]')
        Object.keys(reqQuery).forEach(key => {
            const match = key.match(/^(\w+)\[(\w+)\]$/);
            if (match) {
                const field = match[1];
                const operator = match[2];
                if (!reqQuery[field]) reqQuery[field] = {};
                reqQuery[field][operator] = reqQuery[key];
                delete reqQuery[key];
            }
        });

        // Fields to exclude from direct match
        const removeFields = ['select', 'sort', 'page', 'limit', 'minPrice', 'maxPrice', 'sizes', 'skip', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Handle comma-separated values for advanced operators (like nin)
        ['brand', 'category', 'gender', 'parentCategory', 'color', 'fabric', 'occasion', 'fit', 'sizes', 'subCategory'].forEach(field => {
            if (reqQuery[field] && typeof reqQuery[field] === 'object') {
                Object.keys(reqQuery[field]).forEach(operator => {
                    if ((operator === 'nin' || operator === 'in' || operator === 'ne') && typeof reqQuery[field][operator] === 'string' && reqQuery[field][operator].includes(',')) {
                        reqQuery[field][operator] = reqQuery[field][operator].split(',');
                    }
                });
            }
        });


        let queryStr = JSON.stringify(reqQuery);
        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|ne|nin)\b/g, match => `$${match}`);

        let queryObj = JSON.parse(queryStr);

        // --- Advanced Filtering ---

        // 1. Price Range
        if (req.query.minPrice || req.query.maxPrice) {
            queryObj.price = {};
            if (req.query.minPrice) queryObj.price.$gte = req.query.minPrice;
            if (req.query.maxPrice) queryObj.price.$lte = req.query.maxPrice;
        }

        // 2. Sizes (Array intersection: find products that have ANY of the selected sizes)
        if (req.query.sizes) {
            const sizesArray = req.query.sizes.split(',');
            queryObj.sizes = { $in: sizesArray };
        }

        // 3. Multi-Select Fields (Brand, Color, Fabric, Occasion, Fit, Category)
        // If frontend sends 'brand=Nike,Adidas', we treat it as an $in query.
        // Basic fields are already handled by queryStr if they are singular, but for commas we need explicit handling or frontend sending array.
        // Assuming frontend sends comma-separated strings for multi-select.
        ['brand', 'color', 'fabric', 'occasion', 'fit', 'category', 'gender', 'parentCategory', 'subCategory'].forEach(field => {
            if (req.query[field] && req.query[field].includes(',')) {
                const values = req.query[field].split(',');
                queryObj[field] = { $in: values };
            }
        });

        // 4. Text Search
        // 4. Advanced Text & Price Search
        if (req.query.search) {
            let searchTerm = req.query.search.trim();

            // --- Price Parsing (under 5000, below 2000, < 5000) ---
            const priceMatch = searchTerm.match(/(?:under|below|less than|<\s*)(\d+)/i);
            if (priceMatch) {
                const maxPrice = parseInt(priceMatch[1], 10);
                if (!queryObj.price) queryObj.price = {};
                queryObj.price.$lte = maxPrice;

                // Remove the price part from search term to clean it up
                searchTerm = searchTerm.replace(priceMatch[0], '').trim();
            }

            // --- Text Search ---
            if (searchTerm) {
                // escape special regex chars
                const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // Flexible matching: allow spaces or hyphens between words
                // e.g. "t shirt" matches "t-shirt" or "t shirt"
                // Replace spaces with pattern matching space or hyphen
                const regexPattern = escapedTerm.split(/\s+/).join('[\\s-]*');
                const searchRegex = new RegExp(regexPattern, 'i');

                // Also split by space to match ANY individual word if the full phrase fails?
                // For now, let's try the flexible full phrase match + individual word fallback if needed?
                // User said "every product related". 
                // Let's stick to the flexible phrase first, but applied BROADLY.

                queryObj.$or = [
                    { name: searchRegex },
                    { description: searchRegex },
                    { brand: searchRegex },
                    { category: searchRegex },
                    { subCategory: searchRegex },
                    { gender: searchRegex },
                    { color: searchRegex },
                    { sneakerTag: searchRegex },
                    { accessoriesTag: searchRegex },
                    { collectionName: searchRegex }
                ];
            }
        }

        // Finding resource with built query object
        query = Product.find(queryObj);

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            // Map frontend sort keys to backend fields
            const sortMap = {
                'price_asc': 'price',
                'price_desc': '-price',
                'newest': '-createdAt',
                'rating_desc': '-rating',
                'bestsellers': '-salesCount'
            };
            const customSort = sortMap[req.query.sort];

            if (customSort) {
                query = query.sort(customSort);
            } else {
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy);
            }
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments(queryObj);

        if (req.query.skip) {
            query = query.skip(parseInt(req.query.skip));
        } else {
            query = query.skip(startIndex);
        }

        query = query.limit(limit);

        // Executing query
        const products = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            pagination,
            data: products
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get dynamic filter options based on context
// @route   GET /api/products/filters
// @access  Public
exports.getFilterOptions = async (req, res) => {
    try {
        const { gender, category, parentCategory } = req.query;
        let matchStage = {};

        if (gender) matchStage.gender = gender;
        if (parentCategory) matchStage.parentCategory = parentCategory;
        if (category) matchStage.category = category;

        // Aggregation to get distinct values
        const stats = await Product.aggregate([
            { $match: matchStage },
            {
                $facet: {
                    brands: [{ $group: { _id: "$brand" } }, { $sort: { _id: 1 } }],
                    colors: [{ $group: { _id: "$color" } }, { $sort: { _id: 1 } }],
                    categories: [{ $group: { _id: "$category" } }, { $sort: { _id: 1 } }], // useful if querying by gender only
                    fabrics: [{ $group: { _id: "$fabric" } }, { $sort: { _id: 1 } }],
                    fits: [{ $group: { _id: "$fit" } }, { $sort: { _id: 1 } }],
                    occasions: [{ $group: { _id: "$occasion" } }, { $sort: { _id: 1 } }],
                    sizes: [{ $unwind: "$sizes" }, { $group: { _id: "$sizes" } }, { $sort: { _id: 1 } }],
                    maxPrice: [{ $group: { _id: null, max: { $max: "$price" }, min: { $min: "$price" } } }]
                }
            }
        ]);

        // Transform aggregation result to simpler arrays
        const result = stats[0];
        const filters = {
            brands: result.brands.map(b => b._id).filter(Boolean),
            colors: result.colors.map(c => c._id).filter(Boolean),
            categories: result.categories.map(c => c._id).filter(Boolean),
            fabrics: result.fabrics.map(f => f._id).filter(Boolean),
            fits: result.fits.map(f => f._id).filter(Boolean),
            occasions: result.occasions.map(o => o._id).filter(Boolean),
            sizes: result.sizes.map(s => s._id).filter(Boolean),
            priceRange: result.maxPrice.length > 0 ? { min: result.maxPrice[0].min, max: result.maxPrice[0].max } : { min: 0, max: 10000 }
        };

        res.status(200).json({
            success: true,
            data: filters
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin/Seller)
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get top rated/bestselling products
// @route   GET /api/products/bestsellers
// @access  Public
exports.getBestsellers = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ rating: -1, numReviews: -1, salesCount: -1 })
            .limit(12);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get trending products
// @route   GET /api/products/trending
// @access  Public
exports.getTrendingProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ views: -1, isNewArrival: -1 })
            .limit(12);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
