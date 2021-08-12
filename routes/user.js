const router = require('express').Router();
const User = require('../models/user_model'); //importing user schema
//const userService = require('../models/user_model'); 

/*
router.get('/', async (req, res) => {
    try {
        let users = await userService.getUsers();
        res.status(200).json({ users: users });
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
})


router.post('/', async (req, res) => {
    try {
        let newUser = await userService.createUser(req.body);
        res.status(200).json(newUser);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
})

router.get('/comments', async (req, res) => {
    try {
        let userComments = await userService.getUserComments(req.body.userId);
        res.status(200).json(userComments);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
})

*/

router.get('/',(req, res) => {
    User.find() // mongoose to see all the documents
        .then(user => res.json(user)) 
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',(req, res) => {
    const userid = req.body.userid;
    const username = req.body.username;

    const newUser = new User({userid,username});
    
    newUser.save()
        .then(() => res.json('user added...'))
        .catch(err => res.status(400).json('Error: ' + err));
});



// (CRUD) D-Delete document 
router.get('/delete/:id',(req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.delete('/delete/:id',(req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json('User deleted...'))
    .catch(err => res.status(400).json('Error: ' + err));
});
    



// (CRUD) U-Update document 
router.post('/update/:id',(req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.userid = req.body.userid;
            user.username = req.body.username;

            user.save()
                .then(() => res.json('User updated...'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;