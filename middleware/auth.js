const jwt=require('jsonwebtoken')

const jwtMiddleWare=(req,res,next)=>{
    console.log("inside jwt middleware");
    
    try{
        const token=req.headers['authorization'].split(" ")[1];        
        if(token){
            const jwtResponse=jwt.verify(token,process.env.JWT_SECRET)
        //  console.log(jwtResponse.id);
            req.payload=jwtResponse.id
            next()
        }else{
            res.status(406).json("Please Provide token...!!")

        }
    }catch{
        res.status(401).json("Access denied...Please Login")
    }
}
module.exports=jwtMiddleWare