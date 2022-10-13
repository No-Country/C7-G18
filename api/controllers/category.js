const {database } = require("../config/db");
const { getBuckets } = require('../config/s3');
const { uploadToBucket } = require('../config/s3');

const get_categories = (req,res) => {

    database.table('category as c')
        .withFields([
            'c.id',
            'c.name',
            'c.img_url'
        ])
        .sort({id:1})
        .getAll()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    count: result.length,
                    category: result
                })
            } else {
                res.json({message: 'No category can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_category = (req,res) => {
    let categoryId = req.params.id;
    console.log(categoryId)

    database.table('category as c')
    .withFields([
        'c.id',
        'c.name',
        'c.img_url'
    ])
    .filter({'c.id' : categoryId})
    .get()
    .then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.json({message: `No category can be founded with id ${categoryId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_category = (req,res) => {
    console.log("updated category");
}

const delete_category = (req,res) => {
    console.log("deleted category");
}

const add_category = async (req,res) => {
    if(req.method == 'POST'){
        const data = await getBuckets()
        bucket=data.Buckets[0].Name;
        image = req.files.images;
        let { name } = req.body;
        database.table('category as c')
        .withFields([
            'c.id',
            'c.name',
            'c.img_url'
        ])
        .filter({'c.id' : categoryId})
        .get()
        .then(async result => {
            if (result) {
                res.json({message: `${name} is already in the database`})
            } else {
                if(!req.files || Object.keys(req.files).length === 0){
                    return res.status(400).send('No Files was Uploaded');
                }
                if(image.mimetype == 'image/jpeg' || image.mimetype == 'image/png'|| image.mimetype == 'image/jpg' ){
                    const uploadcategory = await uploadToBucket(bucket, image);
                    console.log(uploadcategory.Location)
                        database.table('category')
                            .insert({
                                name: name,
                                img_url: uploadcategory.Location,
                            })
                            .then(newcategory=>{
                                res.json({message:'The category was uploaded', success: true})
                            })
                            .catch(error=>console.log(error))
                } else {
                    message = 'Please select a JPG, JPEG or PNG image',
                    res.json({message: message})
                }    
            }
        })
    }
}

module.exports = {get_categories, get_category, update_category, delete_category, add_category};
