// import { MessageDto } from "src/dtos/message.dto";
import { sendEmail } from "../utils/email/email";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../entity/message.entity";
// import { any } from "src/types/any";
// import { messageData } from "../data/message-data/message-data";
import { IMessage } from "src/types/IMessage";

export class MessageService {
  async createMessage(messageObj: any): Promise<any> {
    if (!messageObj) {
      return { success: false, message: "Message successfully sent." };
    }

    // Apply id to record
    messageObj._id = uuidv4();

    try {
      const res = await Message.create(messageObj);

      sendEmail(messageObj.email, messageObj.subject, messageObj.message);

      return {
        success: true,
        message: "Message successfully sent.",
        data: res,
      };
    } catch (error) {
      return { success: false, message: error as string };
    }
  }

  async getMessages(): Promise<any> {
    try {
      // const res: IMessage[] = messageData;

      return {
        success: true,
        message: "Message successfully sent.",
        // data: res,
      };
    } catch (error) {
      return { success: false, message: error as string };
    }
  }
}
