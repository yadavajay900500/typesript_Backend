import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const resultValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const errorList: any = result.array()?.map((obj) => {
            console.log("Error in validation", `${obj.msg}`)
            return `Eorror in Validation----> ${obj.msg} `;
        });
        // res.status:(Number) = 400;
        res.status(401).send({ validatorError: errorList })

        next(errorList);
    } else {
        next();
    }
};
export { resultValidator }


