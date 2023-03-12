

export interface User {
	_id: string;
	name: string
	email: string
	username: string
	role?: string
	phone?: string
	avatar: string
}

export interface ILoginUserBody {
	email_username: string;
	password: string
}
export interface IRegisterUserBody {
	email: string;
	username: string;
	name: string;
	password: string
}