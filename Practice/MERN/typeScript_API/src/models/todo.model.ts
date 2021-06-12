import mongoose from "mongoose";

interface TodoI{
    description:string;
    priority:string;
    date:Date
}

interface TodoDocument extends mongoose.Document{
    description:string;
    priority:string;
    date:Date
}

const todoSchema = new mongoose.Schema({
    description:{
        type: String,
        require:true
    },
    priority:{
        type: String,
        require:true
    },
    date:{
        type: Date,
        require:false
    }
});

interface todoModelInterface extends mongoose.Model<TodoDocument>{
    set(x: TodoI):TodoDocument;
}

todoSchema.statics.set = (x:TodoI) =>{
    return new Todo(x);
}

const Todo = mongoose.model<TodoDocument,todoModelInterface>(
    "Todo",
    todoSchema
);

const cdate: Date = new Date(); 

Todo.set({
    description:"default",
    priority:"LOW_D",
    date: cdate
})

export {Todo};