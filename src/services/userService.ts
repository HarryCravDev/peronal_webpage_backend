import { User } from "src/dtos/user.dto";
import { UserModel } from "../entity/user.entity";
import jwt from 'jsonwebtoken';
import config from "config";
const bcrypt = require('bcrypt');

export class UserService {

    // Todo - Add return generic type
    async userSignIn({ email, password }: User): Promise<any> {
        const foo = password;

        const user = await UserModel.findOne({ email });

        if(!user){
            throw new Error("No user found");
        }
        
        const result = await await bcrypt.compare(password, user.password);

        if(!result){
            throw new Error("Invalid credentials.");
        }

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, config.get("app.secret"));

        return token;
    }

    // Todo - Add return generic type
    async userSignUp({ email, password }: User): Promise<any> {
        const foo = password;

        const user = await UserModel.findOne({ email });

        if(user){
            throw new Error("Email already in use.");
        }
        
        const createUser = await UserModel.create({ email, password });

        // Create token
        const body = { _id: createUser._id, email: createUser.email };
        const token = jwt.sign({ user: body }, config.get("app.secret"));

        // Todo - Decide what to return and how to return it
        return {token, createUser};
    }
}
