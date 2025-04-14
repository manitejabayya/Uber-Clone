const captainModel = require('../models/capatain.model');


module.exports.createCaptain = async({
    firstname,lastname,email,password,vehicle
})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({ // Added 'await' here
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType,
            location:{
                lat:vehicle.location.lat,
                lng:vehicle.location.lng
            }
        }
    });
    return captain;

}