const {database } = require("../config/db");
const { getBuckets } = require('../config/s3');
const { uploadToBucket } = require('../config/s3');

const get_products = (req,res) => {
    database.table('products as p')
        .withFields([
            'p.id',
            'p.cat_id',
            'p.subcat_id',
            'p.brand_id',
            'p.pets_id',
            'p.name',
            'p.description',
            'p.discount',
            'p.img_url',
            'p.price',
            'p.stock',
            'p.created'
        ])
        .sort({id:1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({message: 'No products can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_product = (req,res) => {
    let productId = req.params.id;
    console.log(productId)

    database.table('products as p')
    .withFields([
        'p.id',
        'p.cat_id',
        'p.subcat_id',
        'p.brand_id',
        'p.pet_id',
        'p.name',
        'p.description',
        'p.discount',
        'p.img_url',
        'p.price',
        'p.precio',
        'p.stock',
        'p.created'
    ])
    .filter({'p.id' : productId})
    .get()
    .then(product => {
        if (product) {
            res.status(200).json(product);
        } else {
            res.json({message: `No products can be founded with id ${productId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_product = (req,res) => {
    console.log("updated product");
}

const delete_product = (req,res) => {
    console.log("deleted product");
}

const add_product = async (req,res) => {
    if(req.method == 'POST'){
        const data = await getBuckets()
        bucket=data.Buckets[2].Name;
        image = req.files.images;
        let { cat_id, subcat_id, brand_id, pets_id, name, description, discount, price, precio, stock } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No Files was Uploaded');}
            if(image.mimetype == 'image/jpeg' || image.mimetype == 'image/png'|| image.mimetype == 'image/jpg' ){
                console.log(req._startTime)
                const uploadProduct = await uploadToBucket(bucket, image);
                console.log(uploadProduct.Location)
                    database.table('products')
                        .insert({
                            cat_id: cat_id,
                            subcat_id: subcat_id,
                            brand_id: brand_id,
                            pets_id: pets_id,
                            name: name,
                            description: description,
                            discount: discount,
                            img_url: uploadProduct.Location,
                            price: price,
                            precio: precio,
                            stock: stock,
                            created: req._startTime
                        })
                        .then(newProduct=>{
                            res.json({message:'The product was uploaded', success: true})
                        })
                        .catch(error=>console.log(error))
            } else {
                message = 'Please select a JPG, JPEG or PNG image',
                res.json({message: message})
            }    
        }
}
module.exports = {get_products, get_product, update_product, delete_product, add_product};