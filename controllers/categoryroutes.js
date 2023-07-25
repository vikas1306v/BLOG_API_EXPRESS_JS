const router = require("express").Router();
const Category = require("../models/Category");
const {body , validationResult} = require("express-validator");




//creating a post request for creating a category

router.post('/create', async (req, res) => 
{
    try{
        const category= await Category.create({
            category_name:req.body.category_name

        })
        return res.status(200).json(category);

    }
    catch(error){
        res.status(500).send("Internal server error");
    }

});


module.exports = router;
