import AWS   from 'aws-sdk';

const s3=new AWS.S3()

// AWS.config.update({
//     accessKeyId: 'accessKeyId',
//     secretAccessKey: 'secretAccessKey',
//     region: 'region'
// });
const s3Client = new AWS.S3({
    accessKeyId: 'your_access_key_id',
    secretAccessKey: 'your_secret_access_id',
    region :'ur region'
});
let params = {
    Bucket: "yourBucketName",
    Key: 'someUniqueKey',
    Body: 'someFile'
};
try {
    let uploadPromise =  s3.putObject(params).promise();
    console.log("Successfully uploaded data to bucket");
} catch (e) {
    console.log("Error uploading data: ", e);
}
