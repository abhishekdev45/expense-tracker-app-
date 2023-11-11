exports.getMainPage =  async (req,res)=>{
    try{
        res.sendFile('sign-up.html' , {root : 'views'})
       
    }catch(e){
       res.status(500).json({error:e});
    }
  
}