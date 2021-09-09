import { read,write } from '../lib/readWrite.js'
import { verify } from '../lib/jwt.js'

function pad(argument) {
	return (''+argument).padStart(2,0)
}

function PRODUCT(_,{productImage:product_image,productType:product_type , productTitle: product_title, productPrice: product_price,productCount:product_count,token}) {
	let products = read('products')
	let {user_id} = verify(token)
	if(user_id != 1) return 'siz admin emassiz'
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
	return 'product added'
}

function ORDERS(_,{ productId: product_id,token,productCount:product_count}){
	let { user_id } = verify(token)
	let orders = read('orders')
	product_count = product_count < 1 ? 1 : product_count
	let has = orders.find(order => order.user_id==user_id&& order.product_id==product_id)
	let date = new Date()
	let year = date.getFullYear(),month = pad(date.getMonth()),day = pad(date.getDate()),hours = pad(date.getHours()),min = pad(date.getMinutes()), sekund = pad(date.getSeconds())
	let order_time = `${year}-${month}-${day},${hours}:${min}:${sekund}`
	if(has) {
		has.product_count+= product_count
	}else{
		orders.push({
			user_id,
			product_id,
			product_count, 
			order_time
		})
	}
	let products = read('products')
	let product = products.find(product => product.product_id == product_id)
	product.product_count -= +product_count
	write('products',products)
	write('orders',orders)
	return 'orders added'
}

export {
	PRODUCT,
	ORDERS
}