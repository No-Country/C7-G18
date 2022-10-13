const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const storage = new S3({
    region,
    accessKey,
    secretKey
})

const getBuckets = () =>{
    return storage.listBuckets().promise()
}

const uploadToBucket = (bucketName, file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket: bucketName,
        Key: file.name,
        Body: stream
    }
    return storage.upload(params).promise();
}

module.exports = {
    getBuckets,
    uploadToBucket
}