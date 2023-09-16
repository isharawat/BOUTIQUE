const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const s3 = new aws.S3({
    credentials: {

    }, 
    ke
})