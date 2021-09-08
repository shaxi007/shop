import {gql} from 'apollo-server'

const schema = gql`
	type Query {
		orders:[Order!]!
		products(pagination: Pagination find:String productId:Int):[Product!]!
	}
	type Mutation {
		register(username: String! email: String! password: String! phoneNumber:String!): String!
		login(username: String! password: String!): String!
		addProduct(productImage: String! productType: String! productTitle: String! productPrice: Int! token: String!):String!
		orders(token: String! productId:Int!): String!
	}
	type Product{
		productId: String!
		productImage: String!
		productType: String!
		productTitle: String!
		productPrice: String!
		productCount: String!
	}
	input Pagination {
		page: Int!
		limit: Int!
	}
	type Order {
		product: Product!
		user: User!
		productCount: String!
	}
	type User {
		userId:String!
		username: String!
		email:String!
		phoneNumber: String!
	}
`

export default schema