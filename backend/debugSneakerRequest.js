const axios = require('axios');

async function testQuery() {
    try {
        console.log('Sending request: category=Sneakers, subCategory=Casual Sneakers');
        const res = await axios.get('https://aureavestis.netlify.app/api/products', {
            params: {
                category: 'Sneakers',
                subCategory: 'Casual Sneakers'
            }
        });
        console.log('Response Status:', res.status);
        console.log('Product Count:', res.data.count);
        if (res.data.count > 0) {
            console.log('First Product:', res.data.data[0].name);
            console.log('First Product SubCategory:', res.data.data[0].subCategory);
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

testQuery();
