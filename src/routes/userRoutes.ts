import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/userEntity";
import { parse } from "path";

const userRouter = Router();
const userRepo = AppDataSource.getRepository(User);

//create a user
userRouter.post("/", async (req, res) => {
    try {
        const user = userRepo.create(req.body);
        const result = await userRepo.save(user);
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error creating user " ,err);
        res.status(500).json({ message: "Error creating user" });
    }
})

//get all users
userRouter.get("/", async(req, res) => {
    try {
        const allUsers = await userRepo.find();
        return res.status(200).json(allUsers)
    } catch (err) {
        console.log("Error fetching users", err);
        res.status(500).json({message: "Error fetching users"})
    }
})

//get one user by id
userRouter.get("/:id", async(req, res) => {
    try {
        const getOneUser = await userRepo.findOneBy({userid: parseInt(req.params.id)});
        if(!getOneUser){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(getOneUser);
    } catch (err) {
        console.log("Error fetching user by id", err);
        res.status(500).json({message: "Error fetching user by id"})
    }
})

//update a user
userRouter.put("/:id",async (req, res) => {
    
    try {
        const user = await userRepo.findOneBy({userid: parseInt(req.params.id)});
        if(user){
            userRepo.merge(user, req.body);
            const result = await userRepo.save(user);
            return res.status(200).json(result);
        } else{
            return res.status(404).json({message: "User not found"})
        }
    } catch (err) {
        console.error("Error updating user", err)
        res.status(500).json({ message: "Error updating user" });
    }
})

//delete a user
userRouter.delete("/:id", async(req, res) => {
    try {
        const user = await userRepo.delete({userid: parseInt(req.params.id)});
        if(user.affected === 0) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        console.error("Error deleting user", err);
        res.status(500).json({message:"Error deleting user"}); 
    }
})

export default userRouter;