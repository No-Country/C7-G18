const express = require('express');
const router = express.Router();
const { database } = require('../controllers/helpers');

/* GET ALL PRODUCTS */
router.get('/', function(req, res) {

    database.table('category as c')
        .withFields([
            'c.id',
            'c.name',
            'c.img_url'
        ])
        .sort({id: 1})
        .getAll()
        .then(categories => {
            if (categories.length > 0) {
                res.status(200).json({
                    count: categories.length,
                    category: categories
                })
            } else {
                res.json({message: 'No categories can be founded'})
            }
        })
        .catch(err => console.log(err));
});
/* GET A PRODUCT BY ID */
router.get('/:id', (req,res)=>{
    let id = req.params.id;
    database.table('category as c')
    .withFields([
        'c.id',
        'c.name',
        'c.img_url'
    ])
    .filter({'c.id' : id})
    .get()
    .then(product => {
        if (product) {
            res.status(200).json(product);
        } else {
            res.json({message: `No category can be founded with id ${productId}`})
        }
    })
    .catch(err => console.log(err));
});
/* UPLOAD PRODUCT DATA */
router.post('/upload', (req, res)=>{

    if(req.method == 'POST'){
        let { name } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No Files was Uploaded');}
        img = req.files.img;
        console.log(img)
        uploadPath = `../../clientApp/src/assets/images/categories/` + img.name  //Use the Project's local storage
        savePath = `assets/images/categories/`+ img.name //Use the Project's local storage
        if(img.mimetype == 'image/jpeg' || img.mimetype == 'image/png'|| img.mimetype == 'image/jpg' ){
            img.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
                
                database.table('category')
                    .insert({
                        name: name,
                        img_url: savePath
                    })
                    .then(newCategory=>{
                        res.json({message:'The category was uploaded', success: true})
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
    let category = await database.table('category').filter({id: id}).get(); // Search Product in Database if any

    if (category) {
        let {
            name
        } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No Files was Uploaded');
        };
        img = req.files.img;
        uploadPath = `../src/assets/images/categories/` + img.name  //Use the Project's local storage
        savePath = `assets/images/categories/`+ img.name //Use the Project's local storage
        if(img.mimetype == 'image/jpeg' || img.mimetype == 'image/png'|| img.mimetype == 'image/jpg' ){
            img.mv(uploadPath, (error)=>{
                if(error)
                    return res.status(500).send(error);
            // Replace the category's information with the form data ( keep the data as is if no info is modified )
                database
                .table('products')
                .filter({id: id})
                .update({
                    name: name !== undefined ? name : category.name,
                    img_url: img_url !== undefined ? img_url : savePath
                    })
                    .then(result => res.json({message:'Category was updated successfully', success:true}))
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
    database.table('category as c')
    .filter({'c.id': id})
    .get()
    .then(category => {
        if (category) {
            let imgPath = category.img_url
            fs.unlink(imgPath)
                .then(()=>{
                    console.log('File Removed')
                }).catch((e)=>{
                    console.log('Error, something happend: ',e)
                })
            database.table('category')
                .filter({id: category.id})
                .remove()
                .then(novedad => {
                    if (novedad.affectedRows>0) {
                        res.status(200).json({message: 'The category was deleted', success: true});
                    } else {
                        res.json({message: 'Category can not be founded', success: false})
                    }
            });
        } else {
            res.json({message: `No category can be founded with id ${id}`, success: false})
        }
    })
    .catch(err => console.log(err));
})
