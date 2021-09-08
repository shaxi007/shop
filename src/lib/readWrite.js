import fs from 'fs'
import path from 'path'

function read(fileName){
	try{
		if(!fileName) throw new Error('fileName is required')
		let data = fs.readFileSync(path.join(process.cwd(),'src','database',fileName+'.json'),'utf8')
		return data.length ? JSON.parse(data) : []
	}catch(err){
		console.log(err)
	}
}

function write(fileName,data){
	try{
		if(!data) throw new Error('data is required')
		if(!fileName) throw new Error('fileName is required')
		return fs.writeFileSync(path.join(process.cwd(),'src','database',fileName+'.json'),JSON.stringify(data,null,4))
	}catch(err){
		console.log(err)
	}
}

export {
	read,
	write
}