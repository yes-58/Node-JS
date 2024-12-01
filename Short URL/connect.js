const mongoose = require('mongoose');
mongoose.set("strictQuery",true);

async function connectToMongoDb(url) {
    await mongoose.connect(url);

}

module.exports = {connectToMongoDb}