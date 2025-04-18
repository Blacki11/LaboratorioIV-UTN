import express from 'express';
import 'dotenv/config';
import router from './routers/index.js';

const app = express()

app.use("/", router)

try {
    const PORT = process.env.PORT || 3000
    app.listen(3000, () => {
        console.log('Server is running on port '+PORT)
    })
}
catch (error) {
    console.error('Error:', error.message)
}