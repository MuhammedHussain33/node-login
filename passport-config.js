const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initizlize(passport,getUserByEmail,getUserById){
    const authenticateuser = async (email,password,done) =>{
      const user = getUserByEmail(email)
      if (user == null){
        return done(null,false,{message:'No user with that email'})
      }
    try {
      if(await bcrypt.compare(password,user.password)){
       return done(null,user)
      }else{
        return done (null,false,{ message:'Password incorrect'})
      }
    }catch (e){
      return done(e)
    }
  }
 passport.use(new LocalStrategy({ usernameField: 'email'},
 authenticateuser));
 passport.serializeUser((user,done) => done(null,user.id))
 passport.deserializeUser((id,done) => {
  return done(null,getUserById(id))
 })
}


module.exports = initizlize