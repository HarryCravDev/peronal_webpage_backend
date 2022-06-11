import { UserService } from "../services/userService";
import { Body, Controller, Get, Post, Route, Security, SuccessResponse } from "tsoa";
import { User } from "../dtos/user.dto";

@Route("user")
export class UserController extends Controller {
	@SuccessResponse("200", "Sign In.")
	@Post("/signin")
	// Todo - Add return generic type
	public async signIn(@Body() user: User): Promise<any> {
		console.log("Signin fired: ", user);
		this.setStatus(200);
		try {
			const token = await new UserService().userSignIn(user);

			console.log({token});
	
			return { success: true, token };
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if(error.message.includes("Invalid credentials")){
				this.setStatus(401);
				message = error.message;
			}

			if(error.message.includes("No user found")){
				this.setStatus(404);
				message = error.message;
			}

			return { success: false, message };
		}
	}

	@SuccessResponse("201", "Sign Up.")
	@Post("/signup")
	// Todo - Add return generic type
	public async signUp(@Body() user: User): Promise<any> {
		this.setStatus(200);
		try {
			const token = await new UserService().userSignUp(user);
	
			return { success: true, message: "User successfully created.", token };
		} catch (error: any) {
			this.setStatus(500);
			let message = error.message;

			if(error.message.includes("Email already in use")){
				this.setStatus(404);
				message = error.message;
			}

			return { success: false, message };
		}
	}

	@Security("jwt")
	@Get("/test")
	public async test(): Promise<any> {
		return { success: true, protected: true, message: "You reached a protected route."}
	}
}
