class Project{
	constructor(data){
		if(data.id)
			this.id = data.id;
		this.title = data.title;
		this.description = data.description;
		this.path = data.path;
		this.is_deleted = data.is_deleted;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}
}

export default Project;