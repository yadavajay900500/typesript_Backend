import { Router } from "express";
import { addToDoListAdd, addToDoListRemove, addToDoListUpdate,getAlltasks } from "../Controllers/userToDoList.controller";
const toDoListRouter = Router();


(()=>{

    postRequest();
    getRequests();
})();

function postRequest(){
    toDoListRouter.post("/add",addToDoListAdd);
    toDoListRouter.post("/remove",addToDoListRemove);
    toDoListRouter.patch("/update",addToDoListUpdate);
}

function getRequests(){
    toDoListRouter.get("/getTask",getAlltasks)
}


export default toDoListRouter;
