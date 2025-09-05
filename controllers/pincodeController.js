const Pincode = require('../models/Pincode');
const { ROLES } = require('../utils/constants');

const addPincodes = async (req, res) => {

    if(req.role !== ROLES.admin) {
        return res.status(401).json({ success: false, message: 'Access denied' });
    }
    const { pincodes } = req.body;
    if(!pincodes || pincodes.length === 0) {
        return res.status(400).json({ success: false, message: 'Pincodes are required' });
    }

    try {
        const existingPincodes = await Pincode.find({ pincode: { $in: pincodes.map((p) => p.pincode) } });

        const existingPincodesValues = existingPincodes.map((p) => p.pincode);

        const newPincodes = pincodes.filter((p) => !existingPincodesValues.includes(p.pincode));

        if(newPincodes.length === 0) {
            return res.status(400).json({ success: false, message: 'All pincodes already exist' });
        }

        await Pincode.insertMany(newPincodes);

        return res.status(200).json({ success: true, message: 'Pincodes already exist'});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getPincode = async (req, res) => {
    const {pincode} = req.params;

    try {
        const existingPincode = await Pincode.find({ pincode });

        if (existingPincode.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Delivery available for this area",
            });
        }

        return res.status(200).json({ success: true, message:"Delievery Available"})
    } catch (error) {
        return res.status(500).json({message: error.message, success: false});
    }
}
module.exports = {
    addPincodes, getPincode
};