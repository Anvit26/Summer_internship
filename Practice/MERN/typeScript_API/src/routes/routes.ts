import { errorMonitor } from "events";
import express,{request, Request,Response} from "express";
import { Todo } from "../models/todo.model";

const router = express.Router();

router.post("/add",async(req:Request,res:Response) =>{
    console.log(req);
    const {description,date,priority} = req.body;
    
    const item = Todo.set({description,date,priority});
    await item.save();

    return res.status(200).json({data:item});
});

router.get("/",async(req:Request,res:Response) =>{
    
    try{
        const item = await Todo.find({});

        return res.status(200).json({
            data:item,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:error,
        })
    }
}); 

router.get("/:_id",async(req:Request,res:Response) =>{
    
    try{
        const item = await Todo.findById(req.params._id);

        return res.status(200).json({
            data:item,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:error,
        })
    }
}); 

//update
router.put("/update",async(req:Request,res:Response) =>{
    console.log(req.body);
    try{

        const filter ={
            description:req.body.description,
        };
        const updateParam = {
            description:req.body.description,
            priority:req.body.priority
        }
        const item = await Todo.updateOne(filter,updateParam,{
            new: true,
        });

        return res.status(200).json({
            data:item,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:error,
        })
    }
}); 

//delete
router.delete("/delete",async(req:Request,res:Response) =>{
    console.log(req.body);
    try{

        const filter ={
            priority:req.body.priority,
        };
        const item = await Todo.updateOne(filter)
        .then((data) => res.json({
            data:data,
        })).catch((e) => {
            console.log(e)
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:error,
        })
    }
}); 


export {router}