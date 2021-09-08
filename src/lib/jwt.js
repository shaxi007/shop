import jwt from 'jsonwebtoken'
import {PRIVATE_KEY} from '../config.js'

function sign(name) {
 	return jwt.sign(name,PRIVATE_KEY)
} 

function verify(name) {
 	return jwt.verify(name,PRIVATE_KEY)
}

export {
	sign,
	verify
}