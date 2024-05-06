const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dbb3q0p82', 
  api_key: '276976791732525', 
  api_secret: 'X1bhlPxwcZ4gdMbuGGHRJMAQw2k' 
});

module.exports = cloudinary;