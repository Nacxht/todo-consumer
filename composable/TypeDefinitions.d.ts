export interface LoginResponse {
	token: string;
}

export interface TodoList {
	status: boolean;
	statusCode: number;
	data: {
		title: string;
		description: string;
	}[];
}
