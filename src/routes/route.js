const express = require('express')
const router = express.Router()
const { getData } = require('../controllers/controller')

router.get('/api/getVendorUsers', async (req, res) => {
    try {
        const { prId, custOrgId } = req.query
        const queryForDb = {}
        queryForDb.custOrgId = custOrgId
        if (prId) {
            queryForDb.prLineItemId = prId
        }
        const data = await getData(queryForDb); // Use async/await for the query
        res.json({
            status: true,
            data: data
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Error fetching data: ' + err.message
        });
    }
})

module.exports = router