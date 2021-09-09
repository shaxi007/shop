import { UserInputError } from 'apollo-server'
import { GraphQLScalarType,Kind} from 'graphql'

let Password = new GraphQLScalarType({
	name:'Password',
	description:'none',
	parseLiteral(ast){
		if(ast.kind == Kind.STRING){
			if(!(/[a-z]/).test(ast.value)) throw new UserInputError('passwordda kichik harflar qtnashmadi')
			if(!(/[A-Z]/).test(ast.value)) throw  new UserInputError('passwordda katta harflar qatnashmadi')
			if(ast.value.length<8) throw  new UserInputError('passwordda 8 tadan ko\'p belgi ishlating')
			if(!(/[0-9]/).test(ast.value)) throw new UserInputError('passwordda raqamlar  qatnashmadi')
			if(!(/[!@#$%^&*<>?]/).test(ast.value)) throw new UserInputError('simvollardan foydalaning')
			return ast.value
		}else throw new UserInputError('String kiriting')
	},
	parseValue(value){
		if(!(/[a-z]/).test(value)) throw new UserInputError('passwordda kichik harflar qtnashmadi')
		if(!(/[A-Z]/).test(value)) throw  new UserInputError('passwordda katta harflar qatnashmadi')
		if(!(/[0-9]/).test(value)) throw new UserInputError('passwordda raqamlar  qatnashmadi')
		if(value.length<8) throw  new UserInputError('passwordda 8 tadan ko\'p belgi ishlating')
		if(!(/[!@#$%^&*<>?]/).test(value)) throw new UserInputError('simvollardan foydalaning')
		return value
	},
	serialize(value){
		if(!(/[a-z]/).test(value)) throw new UserInputError('passwordda kichik harflar qatnashmadi')
		if(!(/[0-9]/).test(value)) throw new UserInputError('passwordda raqamlar  qatnashmadi')
		if(!(/[A-Z]/).test(value)) throw  new UserInputError('passwordda katta harflar qatnashmadi')
		if(value.length<8) throw  new UserInputError('passwordda 8 tadan ko\'p belgi ishlating')
		if(!(/[!@#$%^&*<>?]/).test(value)) throw new UserInputError('simvollardan foydalaning')
		return value
	}
})

export {
	Password
}