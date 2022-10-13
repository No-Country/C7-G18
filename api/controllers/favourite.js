const {database } = require("../config/db");

const get_favourites = (req,res) => {

    database.table('favourite as b')
        .withFields([
            'b.id',
            'b.name',
            'b.description',
            'b.observation',
            'b.made_in'
        ])
        .sort({id:1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    favourite: prods
                })
            } else {
                res.json({message: 'No favourites can be founded'})
            }
        })
        .catch(err => console.log(err));
}

const get_favourite = (req,res) => {
    let favouriteId = req.params.id;
    console.log(favouriteId)

    database.table('favourite as b')
    .withFields([
        'b.id',
        'b.name',
        'b.description',
        'b.observation',
        'b.made_in'
    ])
    .filter({'b.id' : favouriteId})
    .get()
    .then(favourite => {
        if (favourite) {
            res.status(200).json(favourite);
        } else {
            res.json({message: `No favourite can be founded with id ${favouriteId}`})
        }
    })
    .catch(err => console.log(err));
}

const update_favourite = (req,res) => {
    console.log("updated favourite");
}

const delete_favourite = (req,res) => {
    console.log("deleted favourite");
}

const add_favourite = async (req,res) => {
    if(req.method == 'POST'){
    let { name, description, observation, made_in } = req.body;
    database.table('favourite as b')
    .withFields([
        'b.id',
        'b.name',
        'b.description',
        'b.observation',
        'b.made_in'
    ])
    .filter({'b.name' : name})
    .get()
    .then(favourite => {
        if (favourite) {
            res.json({message: `${name} is already in the database`})
        } else {
            database.table('favourite')
            .insert({
                name: name,
                description: description,
                observation: observation,
                made_in: made_in
            })
            .then(newfavourite=>{
                res.json({message:`The favourite ${name} was uploaded succesfully`, success: true})
            })
            .catch(error=>console.log(error))
        }
    })
    .catch(err => console.log(err));
    
    }
}
module.exports = {get_favourites, get_favourite, update_favourite, delete_favourite, add_favourite};
