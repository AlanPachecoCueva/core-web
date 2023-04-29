
// Definir rutas para proyectos
const express = require('express');
const router = express.Router();

//User methods
const { createProject } = require('../Firebase/methods/projectMethods.js');




router.post('/create', async (req, res) => {
    try {
        console.log("body: ", req.body);
        const { author, teamName, name, description, teamMembers, estimatedEndDate } = req.body;

        const user = await createProject(author, teamName, name, description, teamMembers, estimatedEndDate);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating project: ', error});
    }
});

module.exports = router;
