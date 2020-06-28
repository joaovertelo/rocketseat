const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const app = express();


const projects = [];

const logRequests = (req, res, next) => {
    const {method, url} = req;
    
    const logLabel = `[${method.toUpperCase()}] ${url}`
    
    console.log(logLabel)
    
    return next();
}

const validateId = (req, res, next) => {
    const {id} = req.params;
    console.log('opa')
    if (!isUuid(id)) {
        return res.status(400).json({ error: "Invalid id"});
    }
    return next();
}

app.use(logRequests)
app.use(express.json());

app.use('/projects/:id', validateId);

app.get('/projects', (req, res) => {
    const { title } = req.query;
    const result = title ? projects.filter( p => p.title.toLowerCase().includes(title.toLowerCase())) : projects;
    return res.json(result);
})

app.post('/projects', (req, res) => {

    const { title, owner } = req.body;

    const project = { id: uuid(), title, owner }

    projects.push(project);


    return res.json(project);
})

app.put('/projects/:id', validateId, (req, res) => {

    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(p => p.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "project not found" });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return res.json(project);
})

app.delete('/projects/:id', (req, res) => {

    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "project not found" });
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
})

app.listen(3333, () => {
    console.log("Backend started!! 😀")
});