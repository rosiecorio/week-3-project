import express from "express"
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

app.listen('6060', () => {
    console.log('Server is running on http://localhost:6060')
})

/* await fetch(`${api_url}/books`, {
    "headers"  { 
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}*/
