const jwt = require('jsonwebtoken')

module.exports = {
  isLoggedIn : function(req,res,next){
    const token = req.headers['Authorization'] || req.headers['authorization'] || null;

    if (!token) return res.json({ message: 'unAuthorized user' });
    const BearerToken = token.split(' ');
    const headerBearer = BearerToken[1];
    jwt.verify(headerBearer, 'thisisfreakingawesome', (err, decode) => {
      if (err) return res.json({
        unVerified:true,
        message: 'Send proper token dude'
      }) 
      req.userId = decode.userId;
      next()  
    })
  }
}