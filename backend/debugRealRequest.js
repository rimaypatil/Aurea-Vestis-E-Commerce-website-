const axios = require('axios');

const testRequest = async () => {
    try {
        const url = 'http://localhost:5000/api/products';
        const params = {
            parentCategory: 'men',
            'category[nin]': 'Accessories,Sneakers',
            limit: 5
        };

        console.log(`Sending GET to ${url} with params:`, params);

        const res = await axios.get(url, { params });

        console.log(`Status: ${res.status}`);
        console.log(`Count: ${res.data.count}`);

        if (res.data.data && res.data.data.length > 0) {
            console.log("Sample Data:", res.data.data.map(p => `${p.name} (${p.category})`));
        } else {
            console.log("No data found.");
        }

    } catch (err) {
        console.error("Request failed:", err.message);
        if (err.response) {
            console.error("Response data:", err.response.data);
        }
    }
};

testRequest();
