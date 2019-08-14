const user = require("../Models/user.model");


exports.login = function(req, res, next){
    var Email= req.body.email;
    var Password= req.body.password;
   console.log(Email,Password)
   
   user.findOne({Email:Email},(err, data) =>{
        if (err) {
             next(err)
        }else {
            if(data){
                console.log(data)
                if(data.Password != Password){
                    res.status(200).send({
                        status : true,
                        message : "invalid password"
                        
                    });
                }
                else{
                    res.status(200).json({
                        'status': true,
                        'message': 'Success',
                        'result': data
                    });
                }      
            }
            else {
                res.status(200).send({
                    status : true,
                    message : "invalid account"
                    
                }); 
            }
    }
        
    });
}