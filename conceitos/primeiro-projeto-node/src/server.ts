import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (request, response) => {

    console.log("dfdf")
    return response.json({})
})


app.listen(3333, () => {
    console.log("Server started on por 3333!!!!")
})