
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { response } = require('express');
require('dotenv').config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.BUCKET_ACCESS_KEY;
const SECRET_KEY = process.env.BUCKET_SECRET_KEY;

const s3 = new aws.S3({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
    }, 
    region: REGION
})

const uploadWithMulter = () => multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function(req, file, cb) {
            cb(null, {fieldname: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, file.originalname)
        }
    })
}).array("pImage", 2);

const uploadToAws = (req, res) => {
    const upload = uploadWithMulter();
    upload(req, res, function (err) {
      if (err) {
          console.log("There was an error uploading the image.");
      }
      return { 
          success: true,
          message: 'Image uploaded!'
      };
  })
}

module.exports = uploadToAws;

