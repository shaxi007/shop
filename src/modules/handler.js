import { REGISTER,LOGIN } from '../modules2/registerLogin.js'
import { PRODUCT,ORDERS} from '../modules2/Product.js'
import { read } from '../lib/readWrite.js'
import { Password } from '../modules2/Password.js'
import { verify } from '../lib/jwt.js'

const handler = {
	Password,
	Mutation: {
		register: REGISTER,
		login: LOGIN,
		addProduct:PRODUCT,
		orders:ORDERS
	},
	Query :{
		orders: (_,{ token })=>{
			console.log(token)
			let orders = read('orders')
			if(!token) return orders
			if(token) {
				var { user_id } = verify(token)
				return orders.filter(order => order.user_id == user_id)
			}
		},
		products: (_,{pagination:p, find,productId:product_id})=>{
			let products = read('products')
			if(find) return products.filter(product => product.product_title.toLowerCase().includes(find.toLowerCase()))
			if(product_id) return [products.find(product => product.product_id==product_id)]
			if(p) return products.slice((p.page-1)*p.limit,p.page*p.limit)
			return products
		}
	},
	Product:{
		productId: global => global.product_id,
		productImage: global => global.product_image,
		productType: global => global.product_type,
		productTitle: global => global.product_title,
		productPrice: global => global.product_price,
		productCount: global => global.product_count
	},
	Order: {
		product: global=>{
			let products = read('products')
			return products.find(product => global.product_id == product.product_id)
		},
		user: global=>{
			let users = read('users')
			return users.find(user => global.user_id == user.user_id)
		},
		productCount: global=> global.product_count,
		orderTime: global=> global.order_time,
	},
	User: {
		userId: global=> global.user_id,
		phoneNumber: global=> global.phone_number
	}
} 

export default handler