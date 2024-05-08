const user_model = require("../models/user.model")
// it will check that body is perfect and correct
const verifySignUpBody = async (req, res, next)=>{
    try{
         //Check for the name
         if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name was not provied in request body"
            })
        }
         //check for the email
         if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! email was not provied in request body"
            })
        }

         //check for the userId
         if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not provied in request body"
            })
        }
          //Check if the user with the same userId is already present
          const user = await user_model.findOne({userId : req.body.userId})

          if(user){
              return res.status(400).send({
                  message : "Failed ! user with same userId is already present"
              })
          }
          next()

    }catch(err){
        console.log("Error while validating request body")
        return res.status(500).send({
            message : "Error while validating request body"
        })
    }
}
const verifySignInBody = async (req, res, next)=>{

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! userId was not provied in request body"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! Password was not provied in request body"
        })
    }
    next()
}
module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody
}