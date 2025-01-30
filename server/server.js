import express, { request } from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})

app.get('/', (request, response) => {
    response.json('Welcome!')
})

app.get('/guestbook', async (request, response) => {
    const result = await db.query(`SELECT * FROM guestcomments`)
    const guestComments = result.rows
    response.json(guestComments)
})

app.post('/guestbook', async (request, response) => {
    const nameFromClient = request.body.name
    const commentFromClient = request.body.comment
    const data = await db.query(`INSERT INTO guestcomments (name, comment) VALUES ('${nameFromClient}', '${commentFromClient}')`)
    response.json(data)
})

// app.put('/guestbook/:id', async (request, response) => {
//     console.log(request.params.id, request.body)
//     const update = await db.query(`UPDATE guestcomments SET name=$1, comment=$2 WHERE id=$3` [request.body.name, request.body.comment, request.params.id])
//     response.json({params: request.params.id})
// })

app.delete('/guestbook/:id', async (request, response) => {
    console.log(request.params.id)
    const response = await db.query(`DELETE FROM guestcomments WHERE id=$1`, [req.params.id])
    response.send(request.params.id)
})

app.listen('6060', () => {
    console.log('Server is running on http://localhost:6060')
})

/* await fetch(`${api_url}/books`, {
    "headers"  { 
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}*/
