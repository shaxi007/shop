import {gql} from 'apollo-server'

const schema = gql`
	scalar Password
	scalar Any
	type Query {
		orders(token: String):[Order!]!
		products(pagination: Pagination find:String productId:Int):[Product!]!
	}
	type Mutation {
		register(username: String! email: String! password: Password phoneNumber:String!): String!
		login(username: String! password: Password): String!
		addProduct(productCount: Int! productImage: String! productType: [ProductType!] productTitle: String! productPrice: Int! token: String!):String!
		orders(token: String! productId:Int! productCount: Int!): String!
	}
	type Product{
		productId: String
		productImage: String
		productType: String
		productTitle: String
		productPrice: String
		productCount: String
	}
	input Pagination {
		page: Int!
		limit: Int!
	}
	type Order {
		product: Product
		user: User
		productCount: String
		orderTime: String
	}
	type User {
		userId:String
		username: String
		email:String
		phoneNumber: String
	}
	enum ProductType {
		naushnik
		telefon
		kompyuter
		sichqoncha
		quvvatlagich
		televizor
		muzlatgich
		akksessuarlar
	}
`

export default schema