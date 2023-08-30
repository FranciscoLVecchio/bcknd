
const mongoose = require( 'mongoose' )
 
const dbConnection = async() => {
 
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DBOnline')
    } catch ( error ) {
        console.log(error)
        throw new Error('Error connecting to the DB')
    }
}
 


module.exports = {
    dbConnection
}