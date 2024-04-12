export interface LoginResponse {
	token: string;
}

export interface TodoList {
	status: boolean;
	statusCode: number;
	data: {
		_id: string;
		userId: string;
		title: string;
		description: string;
	}[];
}
