const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 7777

app.use(cors({ origin: '*' }))
app.set('trust proxy');

const api = require('./api')

app.get('/', api)

app.listen(port, () => console.log(`[server] up :${port}`))