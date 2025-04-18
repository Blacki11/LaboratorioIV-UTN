import express from 'express';
import 'dotenv/config';

const app = express()

try {
    const PORT = process.env.PORT || 3000
    app.listen(3000, () => {
        console.log('Server is running on port '+PORT)
    })
}
catch (error) {
    console.error('Error:', error.message)
}