class User{
	constructor(data,adv){
		data.id ? this.data = data.id : null;
		if(adv==true)
			this.password = data.password;
		this.email = data.email;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.role = data.role;
		this.is_deleted = data.is_deleted;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		data.token ? this.token=data.token : null;
		// if(data.token)
			// this.token = data.token
		if(data.social_media){
			this.social_media = {
			facebook: data.social_media.facebook,
			twitter: data.social_media.twitter,
			instagram: data.social_media.instagram
			}
		}
	}
}

export default User;