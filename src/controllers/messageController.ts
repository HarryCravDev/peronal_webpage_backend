// src/users/usersController.ts
import {
  Body,
  Controller,
  Post,
  Get,
  Route,
  SuccessResponse,
  Security,
} from "tsoa";
import { MessageService } from "../services/messageService";
import { MessageDto } from "../dtos/message.dto";
import { IGenericResponse } from "../types/IGenericResponse";

@Route("message")
export class MessageController extends Controller {
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createMessage(
    @Body() requestBody: MessageDto
  ): Promise<IGenericResponse> {
    this.setStatus(201); // set return status 201

    const res = await new MessageService().createMessage(requestBody);

    return res;
  }

  @Security("jwt")
  @SuccessResponse("201", "Get messages")
  @Get()
  public async getMessages(): Promise<IGenericResponse> {
    this.setStatus(201);
    try {
      const res = await new MessageService().getMessages();

      return res;
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
