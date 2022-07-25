//JWT tokens work by entering credentials which are taken to authenication server,
//The usuer is authenticated and a JWT token is created and sent back to user, 
//User the passes this JWT token when making any api call (GET, Post, etc...),
//Application verifies the JWT token and then processes the api call 

//Protecting the APIs means only letting users who have a token use the APIs. 

const expressJwt = require ('express-jwt');

function authJwt() {
    const secret =process.env.secret;   //secret is a string upon which we base the token
    const api = process.env.API_URL     //Using this saves inputting '/api/v1/' every time below

    return expressJwt({
        secret, 
        algorithims: ['HS256'],   //token is generated using the secret and the algorithims, lots of options on jwt.io
        isRevoked: isRevoked      //this is a function created below to revoke/take away the token using function below to see if admin

    }).unless({                  //unless excludes certain paths from needing a token such as the login! Without this need a token to get a token not logical!
        path: [                  //path specifies all APIs want to be excluded from authentication

        {url: /\/api\/v1\/teachers(.*)/ , methods: ['GET', 'OPTIONS'] }, //Uses regular expressions rather than indiviudal list of every api for teachers which would be huge....
        {url: /\/api\/v1\/teachercategories(.*)/ , methods: ['GET', 'OPTIONS'] },
         //Accepts and object and the required method to exclude....As of now this lets a list of all teachers be seen for all but not post.
        //RETURN/ REVIEW THIS PART WITHIN OWN PROJECT FUNCTIONALITY rem url also needs to be exact including with/without capitals

        
    `${api}/schools/login`,         //Within a school/user context these are the only 2 APIs we want open without being logged in/authenticated
    `${api}/schools/register` 
        ] 

    })
}

//Function to check/Revoke the options if not an admin
//req is whats coming in, Payload is the data inside the token (isAdmin)
async function isRevoked(req, payload, done) {
if (!payload.isAdmin) {
    done(null, true) //reject the token if not admin 
}
done();                 //go ahead if is admin
}

module.exports = authJwt; //this exports it to be used in app.js 

//Seems to be working now but lost then token generated from Castelgar and haven't any access.....
//Comment out working code and rever to get token and then see if works from there. Defo progress