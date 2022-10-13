const {database } = require("../config/db");
const { getBuckets } = require('../config/s3');
const { uploadToBucket } = require('../config/s3');

const get_subcategories = (req,res) => {

    database.table('subcategory as sc')
        .withFields([
            'sc.id',
            'sc.name',
            'sc.img_url'
        ])
        .sort({id:1})
        .getAll()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    count: result.length,
                    subcategory: result
                })
            } else {
                res.json({message: 'No subcategory can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_subcategory = (req,res) => {
    let id = req.params.id;
    console.log(id)

    database.table('subcategory as sc')
    .withFields([
        'sc.id',
        'sc.name',
        'sc.img_url'
    ])
    .filter({'c.id' : id})
    .get()
    .then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.json({message: `No subcategory can be founded with id ${subcategoryId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_subcategory = (req,res) => {
    console.log("updated subcategory");
}

const delete_subcategory = (req,res) => {
    console.log("deleted subcategory");
}

const add_subcategory = async (req,res) => {
    if(req.method == 'POST'){
        const data = await getBuckets()
        bucket=data.Buckets[4].Name;
        image = req.files.images;
        let { name } = req.body;
        database.table('subcategory as sc')
        .withFields([
            'sc.id',
            'sc.name',
            'sc.img_url'
        ])
        .filter({'c.id' : categoryId})
        .get()
        .then(async result => {
            if(!req.files || Object.keys(req.files).length === 0){
                return res.status(400).send('No Files was Uploaded');
            }
            if(image.mimetype == 'image/jpeg' || image.mimetype == 'image/png'|| image.mimetype == 'image/jpg' ){
                const uploadsubcategory = await uploadToBucket(bucket, image);
                console.log(uploadsubcategory.Location)
                    database.table('subcategory')
                        .insert({
                            name: name,
                            img_url: uploadsubcategory.Location,
                        })
                        .then(newsubcategory=>{
                            res.json({message:'The subcategory was uploaded', success: true})
                        })
                        .catch(error=>console.log(error))
            } else {
                message = 'Please select a JPG, JPEG or PNG image',
                res.json({message: message})
            }    
        })
    }
}
module.exports = {get_subcategories, get_subcategory, update_subcategory, delete_subcategory, add_subcategory};