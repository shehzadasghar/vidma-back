const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storageprofile = multer.diskStorage({
    destination: (req, file, cb) => {
        // //console.log("dir",__dirname + "/resources/static/assets/uploads/")
        cb(null, "./resources/static/assets/uploads/profiles/");
    },
    filename: (req, file, cb) => {
        //console.log(file.originalname);
        cb(null, file.originalname);
    },
});
let uploadProfiles = multer({
    storage: storageprofile,
    limits: { fileSize: maxSize },
}).single("file");
let uploadProfilesMiddleware = util.promisify(uploadProfiles);
module.exports = uploadProfilesMiddleware;

// code for scoop solutions.all right reserved.