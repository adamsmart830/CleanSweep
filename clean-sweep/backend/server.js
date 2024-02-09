const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500 // Change to whatever local port

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))