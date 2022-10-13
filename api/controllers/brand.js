const {database } = require("../config/db");

const get_brands = (req,res) => {

    database.table('brand as b')
        .withFields([
            'b.id',
            'b.name',
            'b.description',
            'b.observation',
            'b.made_in'
        ])
        .sort({id:1})
        .getAll()
        .then(results => {
            if (results.length > 0) {
                res.status(200).json({
                    count: results.length,
                    brand: results
                })
            } else {
                res.json({message: 'No brands can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_brand = (req,res) => {
    let brandId = req.params.id;
    console.log(brandId)

    database.table('brand as b')
    .withFields([
        'b.id',
        'b.name',
        'b.description',
        'b.observation',
        'b.made_in'
    ])
    .filter({'b.id' : brandId})
    .get()
    .then(brand => {
        if (brand) {
            res.status(200).json(brand);
        } else {
            res.json({message: `No brand can be founded with id ${brandId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_brand = (req,res) => {
    console.log("updated brand");
}

const delete_brand = (req,res) => {
    console.log("deleted brand");
}

const add_brand = async (req,res) => {
    if(req.method == 'POST'){
    let { name, description, observation, made_in } = req.body;
    database.table('brand as b')
    .withFields([
        'b.id',
        'b.name',
        'b.description',
        'b.observation',
        'b.made_in'
    ])
    .filter({'b.name' : name})
    .get()
    .then(brand => {
        if (brand) {
            res.json({message: `${name} is already in the database`})
        } else {
            database.table('brand')
            .insert({
                name: name,
                description: description,
                observation: observation,
                made_in: made_in
            })
            .then(newBrand=>{
                res.json({message:`The brand ${name} was uploaded succesfully`, success: true})
            })
            .catch(error=>console.log(error))
        }
    })
    .catch(err => console.log(err));
    
    }
}
module.exports = {get_brands, get_brand, update_brand, delete_brand, add_brand};
