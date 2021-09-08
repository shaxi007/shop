import { read,write } from '../lib/readWrite.js'
import { verify } from '../lib/jwt.js'

function PRODUCT(_,{productImage:product_image,productType:product_type , productTitle: product_title, productPrice: product_price,token}) {
	let products = read('products')
	let {user_id} = verify(token)
	if(user_id==1) return 'siz admin emassiz'
	let product_id = products.length ? products[products.length-1].product_id+1 : 1
	products.push({
		product_title,
		product_id,
		product_type,
		product_price,
		product_image,
		product_count
	})
	write('products',products)
	return 'ok'
}

function ORDERS(_,{ productId: product_id,token}){
	let { user_id } = verify(token)
	let orders = read('orders')
	let product_count = 1
	let has = orders.find(order => order.user_id==user_id&& order.product_id==product_id)
	if(has) {
		has.product_count+=1
	}else{
		orders.push({
			user_id,
			product_id,
			product_count
		})
	}
	let products = read('products')
	let product = products.find(product => product.product_id == product_id)
	product.product_count -= 1
	write('products',products)
	write('orders',orders)
	return 'ok'
}

export {
	PRODUCT,
	ORDERS
}