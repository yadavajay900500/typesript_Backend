import { Router } from "express";
import {generatePresignedUrl} from "../Controllers/presignedUrl.controller";


const awsPresignedUrl = Router();

(()=>{
    getpresignedUrl();
})();

function getpresignedUrl(){
    awsPresignedUrl.get('/generatepresignedurl',generatePresignedUrl)
}


export default awsPresignedUrl;