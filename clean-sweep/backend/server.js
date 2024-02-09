const express = require('express')
const app = express()
const PORT = process.env.PROT || 3500 // Change to whatever local port

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

