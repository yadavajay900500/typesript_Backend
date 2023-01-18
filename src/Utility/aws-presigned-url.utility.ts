import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';


aws.config.update({
    //     secretAccessKey: 'IAM User Secrect Access Key',
    //     accessKeyId: 'IAM User Access Key',
    //     region: 'Selected TIme Zone on S3 bucket',
    useAccelerateEndpoint: true,
    // endpoint: 'jspicload123.s3-accelerate.amazonaws.com',
    signatureVersion: 'v4',
});

const s3 = new aws.S3();