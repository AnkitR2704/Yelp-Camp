const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Yelp-camp')
.then(() => {
    console.log('Mongo working properly');
})
.catch((err) => {
    console.log('Error occurred');
    console.log(err);
})

// const seedDB = async () => {
//     await Campground.deleteMany({});
//     const c = new Campground({title : 'purple field'});
//     await c.save();
// }
// seedDB();

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50 ;i++){
    const random1000 = Math.floor(Math.random()*1000);
    const price = Math.floor(Math.random()*20) + 10;
    const camp = new Campground({
        location : `${cities[random1000].city} , ${cities[random1000].state}`,
        title : `${sample(descriptors)} ${sample(places)}`,
        image :  `https://picsum.photos/400?random=${Math.random()}`,
        description : ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo praesentium culpa, optio consequuntur ipsam minima numquam voluptate ad vero quam nulla deserunt exercitationem voluptatem aliquam labore qui repudiandae illo? Modi.',
        price
    })
    await camp.save();
}}

seedDB()
.then(() => {
    mongoose.connection.close();
})

