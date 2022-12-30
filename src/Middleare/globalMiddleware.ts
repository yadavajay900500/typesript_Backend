import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const resultValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const errorList: any = result.array()?.map((obj) => {
            
            return `Eorror in Validation----> ${obj.msg} `;
        });

        res.status(401).send({ validatorError: errorList })

        next(errorList);
    } else {
        next();
    }
};
export { resultValidator }


