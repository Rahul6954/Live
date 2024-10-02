require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./utils/db')
const UserAuthRoutes = require('./router/User/UserAuthRoutes')
const passwordRoutes = require('./router/User/PasswordRoutes')
const authentication = require('./middlewares/authentication')

const VaultRoutes = require('./router/vault/vaultRouter')
const ClientRoutes = require('./router/Client/clientRouter')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow your frontend origin
    credentials: true,
  }),
)

app.use(express.json())

app.use('/api/auth', UserAuthRoutes)
app.use('/api/password', passwordRoutes)
// app.use("/api/form", contactRoute);

app.get('/', (req, res) => {
  res.status(200).send('Welcome!')
})

// ====Vault Routes ====
app.use('/api', VaultRoutes)

// ====Client Routes ====
app.use('/api', authentication, ClientRoutes)

const port = process.env.PORT || 5000

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is Running on : http://localhost:${port}`)
  })
})
