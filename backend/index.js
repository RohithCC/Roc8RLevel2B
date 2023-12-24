const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8080;



mongoose.connect('mongodb+srv://Rohith:ziBBdZYECRctUQRu@cluster0.4hsfven.mongodb.net/Roc8level2b?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const Restaurant = mongoose.model('Restaurant', {
    name: String,
    cuisine: String,
    address: String,
    rating: Number,
});

app.use(bodyParser.json());
app.use(cors());


const restaurantSchema = Joi.object({
    name: Joi.string().required(),
    cuisine: Joi.string().required(),
    address: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
});


app.post('/api/restaurants', async (req, res) => {
    // Validate the request body against the schema
    const { error } = restaurantSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Create a new restaurant using the Mongoose model
        const newRestaurant = await Restaurant.create({
            name: req.body.name,
            cuisine: req.body.cuisine,
            address: req.body.address,
            rating: req.body.rating,
        });

        // Send the created restaurant as a response
        res.json({ message: 'Restaurant created successfully', restaurant: newRestaurant });
    } catch (err) {
        console.error('Error creating restaurant:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put('/api/restaurants/updateid/:id', async (req, res) => {
    const id = req.params.id;
    const { error } = restaurantSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
      
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                cuisine: req.body.cuisine,
                address: req.body.address,
                rating: req.body.rating,
            },
            { new: true } 
        );

       
        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

     
        res.json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
    } catch (err) {
        console.error('Error updating restaurant by _id:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get('/api/restaurants/:name', async (req, res) => {
    const name = req.params.name;

    try {
      
        const restaurants = await Restaurant.find({ name: { $regex: new RegExp(name, 'i') } });

        res.json({ restaurants });
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/api/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;

    try {
      
        const restaurants = await Restaurant.find({ cuisine: { $regex: new RegExp(cuisine, 'i') } });

        res.json({ restaurants });
    } catch (err) {
        console.error('Error fetching restaurants by cuisine:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/api/restaurants/byid/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Search for a restaurant with a matching _id
        const restaurant = await Restaurant.findById(id);

        // Check if the restaurant with the provided ID exists
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Send the matching restaurant as a response
        res.json({ restaurant });
    } catch (err) {
        console.error('Error fetching restaurant by _id:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/restaurants', async (req, res) => {
    try {
        // Fetch all restaurants
        const restaurants = await Restaurant.find();

        // Send the list of all restaurants as a response
        res.json({ restaurants });
    } catch (err) {
        console.error('Error fetching all restaurants:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/api/restaurants/bydelete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

   
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

  
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (err) {
        console.error('Error deleting restaurant by _id:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/test', (req, res) => {
    res.send("home test page");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
