import { Router } from "express";
import { addToDoListAdd, addToDoListRemove, addToDoListUpdate } from "../Controllers/userToDoList.controller";
const toDoListRouter = Router();


(()=>{

    postRequest();
})();

function postRequest(){
    toDoListRouter.post("/add",addToDoListAdd);
    toDoListRouter.post("/remove",addToDoListRemove);
    toDoListRouter.post("/update",addToDoListUpdate);
}


export default toDoListRouter;
