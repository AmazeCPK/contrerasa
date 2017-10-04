import knex from './../config/knex';
import Project from './../models/Project-Model';

const projectController = {};

projectController.getAllProjects = async (req,res) =>{
	const projects = await knex('projects as p')
	.whereNot('p.is_deleted',true)
	.modify(queryBuilder=>{
		if(req.query.sort)
			queryBuilder.orderBy('id',req.query.sort)
		if(req.query.limit)
			queryBuilder.limit(req.query.limit)
	});

	if(projects.length){
		const mappedProjects = projects.map(mappedProjects=>new Project(mappedProjects))
		res.json(mappedProjects)
	}
	else
		res.json({error:'No projects found'});
}

projectController.getProjectById = async (req,res)=>{
	const project = await knex('projects as p')
	.where('id',req.params.id)
	.whereNot('is_deleted', true);

	if(project.length){
		const mappedProject = new Project(project[0]);
		res.json(mappedProject);
	}
	else
		res.json({error:'Project not found'});
}

projectController.saveNewProject = async (req,res)=>{
	const projectData = new Project(req.body);
	console.log(projectData);

	const newProject = await knex('projects as p')
	.insert(projectData)
	.returning('*');

	const mappedProject = new Project(newProject[0]);
	res.json(mappedProject);
}

projectController.updateProject = async (req,res)=>{
	const projectData = {
		title: req.body.title, 
		description: req.body.description, 
		thumbnail_path: req.body.thumbnail_path, 
		path: req.body.path
	}
	const updatedProject = await knex('projects as p')
	.where('id',req.params.id)
	.update(projectData)
	.returning('*');

	if(updatedProject.length){
		const mappedProject = new Project(updatedProject[0])
		res.json(mappedProject)
	}
	else{
		res.json({error:'Project not updated'});
	}
}

projectController.deleteProject = async (req,res)=>{
	const deletedProject = await knex('projects as p')
	.where('id',req.params.id)
	.update('is_deleted',true)
	.returning('*')

	if(deletedProject.length){
		const mappedProject = new Project(deletedProject[0]);
		res.json(mappedProject)
	}
	else
		res.json({error:'Project not deleted'})
}


export default projectController;