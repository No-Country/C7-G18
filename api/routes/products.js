const express = require('express');
const router = express.Router();
const { database } = require('../controllers/helpers');

/* GET ALL PRODUCTS */
router.get('/', function(req, res) {

    database.table('products as p')
        .withFields([
            'p.id',
            'p.cat_id',
            'p.subcat_id',
            'p.brand_id',
            'p.name',
            'p.description',
            'p.discount',
            'p.img_url',
            'p.price',
            'p.precio',
            'p.stock',
            'p.created'
        ])
        .sort({id: 1})
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
});
/* GET A PRODUCT BY ID */
router.get('/:id', (req,res)=>{
    let productId = req.params.id;
    console.log(productId)

    database.table('products as p')
    .withFields([
        'p.id',
        'p.cat_id',
        'p.subcat_id',
        'p.brand_id',
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
});
/* UPLOAD PRODUCT DATA */
router.post('/new', (req, res)=>{
    let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let created = `${year}-${month}-${date}`
    if(req.method == 'POST'){
        let { cat_id, subcat_id, brand_id, name, description, discount, price, precio, stock } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No Files was Uploaded');}
        products = req.files.products;
        console.log(products)
        uploadPath = `../../clientApp/src/assets/images/products/` + products.name  //utilizar carpeta de almacenamiento local del proyecto
        savePath = `assets/images/products/`+ products.name //utilizar carpeta de almacenamiento local del proyecto
        if(products.mimetype == 'image/jpeg' || products.mimetype == 'image/png'|| products.mimetype == 'image/jpg' ){
            products.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
                
                database.table('products')
                    .insert({
                        cat_id: cat_id,
                        subcat_id: subcat_id,
                        brand_id: brand_id,
                        name: name,
                        description: description,
                        discount: discount,
                        img_url: savePath,
                        price: price,
                        precio: precio,
                        stock: stock,
                        created: created
                    })
                    .then(newProduct=>{
                        res.json({message:'The product was uploaded', success: true})
                    })
                    .catch(error=>console.log(error))
            })
        } else {
            message = 'Please select a JPG, JPEG or PNG image',
            res.json({message: message})
        }    
    }
});
/* UPDATE PRODUCT DATA */
router.patch('/update/:id', async (req, res) => {
    let id = req.params.id;     // Get the Product ID from the parameter
    let product = await database.table('products').filter({id: id}).get(); // Search Product in Database if any

    if (product) {
        let {
            cat_id,
            subcat_id,
            brand_id,
            name,
            description,
            discount,
            price,
            precio,
            stock
        } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No Files was Uploaded');
        };
        img = req.files.img;
        uploadPath = `../src/assets/images/products/` + img.name  //Use the Project's local storage
        savePath = `assets/images/products/`+ img.name //Use the Project's local storage
        if(img.mimetype == 'image/jpeg' || img.mimetype == 'image/png'|| img.mimetype == 'image/jpg' ){
            img.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
            // Replace the product's information with the form data ( keep the data as is if no info is modified )
                database
                .table('products')
                .filter({id: id})
                .update({
                    cat_id: cat_id !== undefined ? cat_id : products.cat_id,
                    subcat_id: subcat_id !== undefined ? subcat_id : products.subcat_id,
                    brand_id: brand_id !== undefined ? brand_id : products.brand_id,
                    name: name !== undefined ? name : products.name,
                    description: description !== undefined ? description : products.description,
                    discount: discount !== undefined ? discount : products.discount,
                    img_url: img_url !== undefined ? img_url : products.img_url,
                    price: price !== undefined ? price : products.price,
                    precio: precio !== undefined ? precio : products.precio,
                    stock: stock !== undefined ? stock : products.stock,
                    updated: updated !== undefined ? updated : products.updated
                    })
                    .then(result => res.json({message:'Product was updated successfully', success:true}))
                    .catch(err => res.json(err));
                })
            } else {
                message = 'Please select a JPG, JPEG or PNG image',
                res.json({message: message})
            }    
    }
});
/* DELETE A PRODUCT BY ID*/
router.delete('/delete/:id', (req, res)=>{
    let id = req.params.id;
    database.table('products as p')
    .filter({'p.id': id})
    .get()
    .then(products => {
        if (products) {
            let imgPath = products.img_url
            fs.unlink(imgPath)
                .then(()=>{
                    console.log('File Removed')
                }).catch((e)=>{
                    console.log('Error, something happend: ',e)
                })
            database.table('products')
                .filter({id: products.id})
                .remove()
                .then(novedad => {
                    if (novedad.affectedRows>0) {
                        res.status(200).json({message: 'The product was deleted', success: true});
                    } else {
                        res.json({message: 'Product can not be founded', success: false})
                    }
            });
        } else {
            res.json({message: `No products can be founded with id ${id}`, success: false})
        }
    })
    .catch(err => console.log(err));
})

module.exports = router;
