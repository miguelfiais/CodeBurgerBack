
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const port = 3002
app.use(cors())
const { v4: uuidv4 } = require('uuid');

const orders = []

app.post('/orders', (request, response) => {
    const {burger, name} = request.body
    if(burger === "Selecione um pedido" || name === "") {
        return response.status(400).json()
    }
    const newOrder = {id: uuidv4(), burger, name}
    orders.push(newOrder)
    return response.status(201).json(newOrder)
})
app.get('/orders',(request, response)=> {
        return response.json(orders)
    
})
app.delete('/orders/:id',(request, response)=> {
    const {id} = request.params
    const index = orders.findIndex(order => id===order.id)
    if(index < 0) {
        return response.status(404).json("Order not found")
    }
    orders.splice(index,1)
    return response.status(204).json()
    
})
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})