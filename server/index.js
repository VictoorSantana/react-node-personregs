const express = require('express');
const app = express();
const cors = require('cors');
const monk = require('monk');

const db = monk('localhost/mydb');
const persons = db.get('persons');

app.use(express.json());
app.use(cors());

app.get('/person', (req, res) => {    
    persons
    .find()
    .then(personsData => {
        res.json(personsData);
    });    
});

app.post('/person', (req, res) => {    
    
    if(isValidPerson(req.body)) {
        const personData = {
            name: req.body.name.toString(),
            age: req.body.age.toString(),
            sex: req.body.sex.toString(),
            email: req.body.email.toString()            
        }; 

        if(req.body._id.toString() == '0') {
            persons
            .insert(personData);
            
            res.status(200);
            res.json({
                message: 'New person was add'
            });              
        } else {                                                      
            persons
            .findOneAndUpdate({_id: req.body._id}, { $set: personData }).then((updatedDoc) => {
                res.status(200);
                res.json({
                    message: `Id ${updatedDoc._id} has been updated !`
                }); 
            })
        }    
    } else {        
        res.status(400);
        res.json({
            message: 'All fields are required!'
        });
    }    

});

app.post('/personDelete', (req, res) => {        
    const personId = req.body.personId;

    persons.findOneAndDelete({_id: personId}).then((doc) => {
        if(doc != null) {
            res.status(200);
            res.json({
                message: 'Document was found and deleted'
            });
        } else {
            res.status(400);
            res.json({
                message: 'Data not found'
            });
        }
    });
    
});

//
function isValidPerson(data) {
    //name: '', age: 0, sex: 'M', email: ''

    if(!data.name && data.name.toString().trim() === '') {
        return false;
    }
    if(!data.age && data.age.toString().trim() === '') {
        return false;
    }
    if(!data.sex && data.sex.toString().trim() === '') {
        return false;
    }
    if(!data.email && data.email.toString().trim() === '') {
        return false;
    }

    return true;
}

app.listen(5000, () => {
    console.log('listening server nodejs localhost:5000');
});
