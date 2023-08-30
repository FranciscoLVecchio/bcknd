
const mongoose = require( 'mongoose' )
 
const dbConnection = async() => {
 
    try {
        await mongoose.connect('mongodb+srv://franciscolvecchio:xl92NlPinPMj2UyD@bcknd-prctc.njjeyrs.mongodb.net/bcknd')
        console.log('DBOnline')
    } catch ( error ) {
        console.log(error)
        throw new Error('Error connecting to the DB')
    }
}
 


module.exports = {
    dbConnection
}