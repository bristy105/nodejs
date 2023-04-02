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
	name:'Sandra',
	industry :'Actress'
});




app.get('/',(req,res)=>{
	res.json("Welcome");
	
});	
app.get('/api/customers',async(req,res)=>{
	
	try{const result = await Customer.find();
	res.json({"customers": result});}
	catch(e){
		res.status(500).json({error:e.message})
	}
	
});


app.post('/api/customers',async(req,res)=>{
	console.log(req.body)
	const customer = new Customer(req.body);
	
	try{
		await customer.save();
		res.status(201).json({customer});}
	catch(e){ 
		res.status(400).json({error:e.message})

	}
	});

app.get('/api/customers/:id', async(req,res)=>{
	console.log(({
		requestParams: req.params,
		requestQuery: req.query
		 	}));
	try{
		const {id: customerId}= req.params
	    console.log('customer id is', customerId);
	    const customer= await Customer.findById(customerId);
	    console.log(customer);
	   
		if(!customer){
			res.status(404).json({error:'id not found'})
		}else{
			res.json({customer})

		}
		
       }
    catch(e){
	   res.status(500).json({error:e.message})
}
});

//updating customer

app.put('/api/customers/:id',async(req,res)=>{
	try{

		const {customerId}= req.params
	    const result=await Customer.replaceOne({id: customerId},req.body);
	    console.log(result);
	    res.json({updateCount: result.modifiedCount})
	}
	catch(e){
		res.status(500).json({error:e.message})
	}
	
})

app.delete('/api/customers/:id', async(req,res)=>{
	try{
		const {customerId}=req.params
		const result= await Customer.deleteOne({id:customerId});
		console.log(result);
		res.json({deletedCount:result.deletedCount})

	}
	catch(e){
		res.status(500).json({error: 'canot be deleted'})
	}
})

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
