import { NextFunction } from "express";

interface IresUser extends Response {
    status:any;
}

 class TokenBucket {
    capacity: number;
    tokens: number;

    constructor(capacity:number, fillPerSecond:number) {
        console.log(">>>>>>>>>>>>",capacity, fillPerSecond)
        this.capacity = capacity;
        this.tokens = capacity;
        setInterval(() =>{
             this.addToken()
            }, 1000 * fillPerSecond);
    }

    addToken() {
        if (this.tokens < this.capacity) {
            this.tokens += 1;
        }
    }

    take() {
        if (this.tokens > 0) {
            this.tokens -= 1;
            return true;
        }

        return false;
    }
}
const limitRequests=(perSecond:number, maxBurst:number)=> {
    const bucket = new TokenBucket(maxBurst, perSecond);
  
    // Return an Express middleware function
    return function limitRequestsMiddleware(req:Request, res:IresUser, next:NextFunction) {
        if (bucket.take()) {
            next();
        } else {
            res.status(429).send('Rate limit exceeded');
        }
    }
  }
  export {
    limitRequests
  }
