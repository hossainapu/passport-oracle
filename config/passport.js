var LocalStrategy   = require('passport-local').Strategy;
var md5 = require('md5');
var LOGGER = require('log4js').getLogger("sms");
var db = require("../config/oracledb.js");
process.env.UV_THREADPOOL_SIZE = 100;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        
	done(null, user[0]);
    });

    passport.deserializeUser(function(id, done) {       
		var selectSQL = "SELECT ID,USER_NAME,PASSWORD FROM TIGERIDM_USER WHERE id =:id";
		db.doConnect(function(err, connection){
			if (err) {                  
				return done(err,null);
			} else {
				db.doExecute(connection, selectSQL,[id],function(err, result) {
					if (err) {
						db.doRelease(connection);
						done(err,null);
					} else {
						LOGGER.debug('GOT RESULT');
						db.doRelease(connection);
						done(null,result.rows[0]);
					}
				});
			}
		});
	});
    
    passport.use(
        'local-signup',
        new LocalStrategy({            
            usernameField : 'user_name',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, user_name, password, done) {
			LOGGER.debug('SIGNUP IS CALLED');
            var selectSQL = "SELECT * FROM TIGERIDM_USER WHERE user_name =:user_name";
            var param = [];
            param.push(user_name.toUpperCase());
            db.doConnect(function(err, connection){  
				if (err) {
					return done(err);
				}
				db.doExecute(connection, selectSQL,param,function(err, result) {
					if (err) {
						db.doRelease(connection);
						return done(err);
					} 
					else {
						if (result.rows.length) {
							db.doRelease(connection);
							LOGGER.error('USER FOUND');
							return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
						} else {
							LOGGER.debug('USER NOT FOUND AND GOING TO INSERT');
                            var newUserOracle = {
                                username: user_name.toUpperCase(),
                                password: md5(password)
                            };
                            var bindParam = [];
							bindParam.push(user_name.toUpperCase());
							bindParam.push(md5(password));
                            var insertQuery = "INSERT INTO TIGERIDM_USER (user_name,password) values(:user_name,:password)";
                            db.doExecute(connection,insertQuery,bindParam,function(err, insResult) {
                                if (err) {
                                    db.doRelease(connection);
                                    return done(err);
                                } else {
                                    LOGGER.debug('INSERTION RESULT:'+JSON.stringify(insResult));
                                    return done(null,false, req.flash('signupMessage', 'Signed up Successfully!'));
                                }
                            });
                        }
					}
				});
			
			});            
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'user_name',
            passwordField : 'password',
            passReqToCallback : true 
        },
			function(req, user_name, password, done) { 
				var selectSQL = "SELECT ID,USER_NAME,PASSWORD FROM TIGERIDM_USER WHERE user_name =:user_name ";
				var param = [];
				param.push(user_name.toUpperCase());
				db.doConnect(function(err, connection){  
					if (err) {
						return done(err);
					}
					db.doExecute(connection, selectSQL,param,function(err, result) {
						if (err) {
							db.doRelease(connection);
							return done(err);
						} 
						else {
							if (!result.rows.length) {
								db.doRelease(connection);
								return done(null, false, req.flash('loginMessage', 'No user found.'));
							}
							if (md5(password) != result.rows[0][2]) {
								return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
							}
							return done(null, result.rows[0]);
						}
					});
			
				});	
			}
		)
    );
};


