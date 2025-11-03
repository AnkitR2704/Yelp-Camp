const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Yelp-camp')
.then(() => {
    console.log('Mongo working properly');
})
.catch((err) => {
    console.log('Error occurred');
    console.log(err);
})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended : true}));
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    res.render('home');
})

// app.get('/makecampground', async (req,res) => {
//     const camp = new Campground({title : 'My backyard', description : 'cheap camping!'});
//     await camp.save();
//     res.send(camp);
// })

app.get('/campground', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campground/new', async(req,res) => {
    res.render('campgrounds/new');
})

app.post('/campground', async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`campground/${ campground._id }`);
})

app.get('/campground/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show' , { campground });
})

app.get('/campground/:id/edit', async (req,res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id);
    res.render('campgrounds/edit', { campground});
})

app.put('/campground/:id', async (req,res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campground/${campground._id}`);
})

app.delete('/campground/:id', async (req,res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campground');
})

app.listen(5000, () => {
    console.log('Listening to port 5000');
})