var userAuthenticationRepository = require("../repository/authenticationRepository.js")
const functions = require('../utils/functions.js')
var { generateJWT } = require("../service/jwt.js")

/**
 * Function to authenticate the cliente with User and Password
 * 
 * @param {*} req Request of express function - Consult header of request 
 * @param {*} res Response of express function - Send the response to client
 */
async function userAuthentication(req, res){
    const valuesHeader = await functions.headerSplit(req) // values of positions of vector - [0] -> user [1]-> senha

    const status = await userAuthenticationRepository(valuesHeader[0] ,valuesHeader[1])
                                                   
    switch (status) {
        case 200:
                const token = await generateJWT()
                res.status(200).json({"x-auth-token": token })
            break;
        case 422:
                res.status(422).json({"Error": "No authenticated" })
            break;
        default:
                res.status(503).json({"Error": "Erro in the server" })
    }
       
}

module.exports = userAuthentication

