import { Experience } from "../data/experience-data/experience-type";
// import { experience } from "../data/experience-data/experience-data";

export class ExperienceService {
	async getExperience(): Promise<{
		success: boolean;
		message: string;
		experience?: Experience[];
	}> {
		// public createMessage(messageObj: MessageDto): Promise<{ success: boolean; message: string; }> {

		console.log("Experience Service fired...");
		// return { success: true, message: "Get experience.", experience };
		return { success: true, message: "Get experience.", };
	}
}
