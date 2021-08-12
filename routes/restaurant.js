const router = require('express').Router();
const Restaurant = require('../models/restaurant_model');

/*
router.get('/', async (req, res) => {
    try {
        let comments = await commentService.getComments(req.body.userId);
        res.status(200).json({ comments: comments });
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
})

router.post('/', async (req, res) => {
    try {
        let newComment = await commentService.createComment(req.body);
        res.status(200).json(newComment);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
})
*/

// (CRUD) C-Create document 
router.get('/',(req, res) => {
    Restaurant.find() // mongoose to see all the documents
        .then(restaurant => res.json(restaurant)) //get it from database and pass it in Json
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',(req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const address = req.body.address;
    const contact = Number(req.body.contact);
    const date = Date.parse(req.body.date);

    const newRestaurant = new Restaurant({
        username,
        description,
        address,
        contact,
        date,
    });
    
    newRestaurant.save() // save the restaurant in the database
        .then(() => res.json('Restaurant added...'))
        .catch(err => res.status(400).json('Error: ' + err));
});




// (CRUD) D-Delete document 
router.get('/delete/:id',(req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.delete('/delete/:id',(req, res) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .then(restaurant => res.json('Restaurant deleted...'))
    .catch(err => res.status(400).json('Error: ' + err));
});
    



// (CRUD) U-Update document 
router.post('/update/:id',(req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            restaurant.username = req.body.username;
            restaurant.description = req.body.description;
            restaurant.address = req.body.address;
            restaurant.contact = Number(req.body.contact);
            restaurant.date = Date.parse(req.body.date);

            restaurant.save()
                .then(() => res.json('Restaurant updated...'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;