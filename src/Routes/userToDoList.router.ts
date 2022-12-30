import { Router } from "express";
import { addToDoListAdd, addToDoListRemove, addToDoListUpdate,getAllTasks } from "../Controllers/userToDoList.controller";
const toDoListRouter = Router();


(()=>{

    postRequests();
    getRequests();
    patchRequests();
})();

function postRequests(){
    toDoListRouter.post("/add",addToDoListAdd);
    toDoListRouter.post("/remove",addToDoListRemove);
    
}

function getRequests(){
    toDoListRouter.get("/getTask",getAllTasks)
}

function patchRequests(){
    toDoListRouter.patch("/update",addToDoListUpdate);
}


export default toDoListRouter;
