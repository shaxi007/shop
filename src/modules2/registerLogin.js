import { read,write } from '../lib/readWrite.js'
import { sign,verify } from '../lib/jwt.js'
import md5 from 'md5'

function REGISTER(_, { username, email, password,phoneNumber:phone_number }) {
	let users = read('users')
	if(users.find(user=>user.username==username)) return 'The user already exists'
	if(!email.includes('@')) return 'invalid email'
	let user_id = users.length ? users[users.length-1].user_id+1 : 1
	users.push({
		user_id,
		username,
		email,
		password:md5(password),
		phone_number
	})
	write('users',users)
	return sign({user_id})
}

function LOGIN(_, { username, email, password })  {
	let users = read('users')
	let user = users.find(user=>user.username==username)
	if(user){
		if(md5(password)!=user.password) return 'Invalid password'
		return sign({user_id:user.user_id})
	}
	return 'User not found'
}

export {
	REGISTER,
	LOGIN
}