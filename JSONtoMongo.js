'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');


/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri, { useNewUrlParser: true });
executeAsyncTask();

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */


//read file into array
function read() {
    return new Promise((resolve, reject) => {
        fs.readFile('listings.json', "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function executeAsyncTask() {
    const listingDataUnParsed = await read().catch((err) => {
        throw err
    });
    const listingData = JSON.parse(listingDataUnParsed);
    listingData.entries.forEach(function (listing) {

        new Listing({
            name: listing.name,
            code: listing.code,
            coordinates: listing.coordinates,
            address: listing.address,
            created_at: listing.created_at,
            updated_at: listing.updated_at
        }).save(function (err) {
            if (err) throw err;
        });

    });
    return;
}



//for each
    //save to database




/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */