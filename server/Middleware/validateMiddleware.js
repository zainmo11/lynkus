const {validationResult}=require('express-validator')
const {cleanupTempImages} =require('../utils/cleanupTempImages')
const validatorMiddleware=(req, res, next)=>{
    // validation middleware here
    if (req.tempImg) {
        cleanupTempImages(req.tempImg)
    }
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()

}
module.exports=validatorMiddleware;