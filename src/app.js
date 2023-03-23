const express= require('express')
const mongoose= require('mongoose')
const Customer = require('./models/customers')
const dotenv = require('dotenv')


dotenv.config();

const app= express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT=process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION


const customers=[
	{ "name":"Bristy",
		"industry ":"music"
	
	},
	{"name":"Tanmoy",
		"industry ":"Networking"
	
		
	},
	{
		"name":"Shukrity",
		"industry ":"sPORTs"
	
	}];
	
const customer = new Customer({	
	name:'Rio',
	industry :'bird'
});




app.get('/',(req,res)=>{
	res.send('customer');
	
});	
app.get('/api/customers',async(req,res)=>{
	console.log(await mongoose.connection.db.listCollections().toArray());
	try{const result = await Customer.find();
	res.json({"customers": result});}
	catch(e){
		res.status(500).json({error:e.message})
	}
	
})

app.post('/api/customers',(req,res)=>{
	console.log(req.body)
	const customer = new Customer(req.body)
	customer.save();
	});

const start= async()=>{
	try{
			await mongoose.connect(CONNECTION);
			app.listen(PORT,()=>
			{
				console.log('App listening on PORT '+ PORT);
})

		
	}
	catch(error){
		console.log(error.message)
		
	}
	

}

start();
