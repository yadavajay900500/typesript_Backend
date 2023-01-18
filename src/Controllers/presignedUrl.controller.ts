import { NextFunction, Request, Response } from "express";
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
const generatePresignedUrl=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let fileurls: any[]= [];
        const params = {
            Bucket: 'YOUR BUCKET NAME',
            Key: req.query.fileName,
            Expires: 60 * 60,
            ACL: 'public-read',
            ContentType: req.query.fileType
        };
    
        s3.getSignedUrl('putObject', params, function async(err: any, url: any) {
            if (err) {
                res.json({
                    success: false, message: 'Pre- Signed URL error', urls: fileurls
                });
            }
            else {
                fileurls[0] = url;
                res.json({ success: true, message: 'AWS SDK S3 Pre- signed urls generated successfully', urls: fileurls });
            }
        });

    }catch(err){
        console.log(err)
    }

}



export { 
    generatePresignedUrl
};