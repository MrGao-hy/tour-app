import { UserInfoType } from "@/typing";

export interface ReplyType {
	id: string;
	markId: string;
	userId: string;
	content: string;
	createTime: string;
	userInfo: UserInfoType;
}
