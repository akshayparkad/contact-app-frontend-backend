const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/contact_model')
const connectDB = require('./connectMongo')

require('dotenv').config();

app.use(cors());
app.use(express.json());

connectDB();


//create contact endpoint
app.post('/api/create', async (req, res) => {

    console.log(req.body.phoneNumbers);

    try {
        await User.create({

            name: req.body.name,
            phoneNumbers: req.body.phoneNumbers
        })

        res.json({ status: 'ok' })

    } catch (err) {
        console.log(err);
        res.json({ status: 'error' })
    }

})

//fetch all contacts

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await User.find();

        res.json({ status: 'ok', contacts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
});

//delete contact
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.json({ status: 'ok', message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
});


//update contact
app.put('/api/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phoneNumbers: req.body.phoneNumbers,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.json({ status: 'ok', user: updatedUser });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
});

//search contact
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q; // Get the search query from the URL parameter 'q'

        const contacts = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive name search
                { phoneNumbers: { $regex: query } } // Fuzzy search among phone numbers
            ]
        });

        res.json({ status: 'ok', contacts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
});

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log('Server Started.....' + PORT);
})