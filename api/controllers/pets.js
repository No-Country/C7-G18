const {database } = require("../config/db");
const { getBuckets } = require('../config/s3');
const { uploadToBucket } = require('../config/s3');

const get_pets = (req,res) => {

    database.table('pets as p')
        .withFields([
            'p.id',
            'p.name',
            'p.img_url'
        ])
        .sort({id:1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    pets: prods
                })
            } else {
                res.json({message: 'No pets can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_pet = (req,res) => {
    let petId = req.params.id;
    console.log(petId)

    database.table('pets as p')
    .withFields([
        'p.id',
        'p.name',
        'p.img_url'
    ])
    .filter({'p.id' : petId})
    .get()
    .then(pet => {
        if (pet) {
            res.status(200).json(pet);
        } else {
            res.json({message: `No pets can be founded with id ${petId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_pet = (req,res) => {
    console.log("updated pet");
}

const delete_pet = (req,res) => {
    console.log("deleted pet");
}

const add_pet = async (req,res) => {
    if(req.method == 'POST'){
        const data = await getBuckets()
        bucket=data.Buckets[2].Name;
        image = req.files.images;
        let { name } = req.body;
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No Files was Uploaded');
        }
            if(image.mimetype == 'image/jpeg' || image.mimetype == 'image/png'|| image.mimetype == 'image/jpg' ){
                const uploadpet = await uploadToBucket(bucket, image);
                console.log(uploadpet.Location)
                    database.table('pets')
                        .insert({
                            name: name,
                            img_url: uploadpet.Location,
                        })
                        .then(newpet=>{
                            res.json({message:'The pet was uploaded', success: true})
                        })
                        .catch(error=>console.log(error))
            } else {
                message = 'Please select a JPG, JPEG or PNG image',
                res.json({message: message})
            }    
        }
}
module.exports = {get_pets, get_pet, update_pet, delete_pet, add_pet};