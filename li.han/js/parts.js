const makeAnimalList = templater(o=>`
<div class="animallist-item display-flex animal-jump" data-id="${o.id}">
	<div class="flex-none"><img src="${o.img}" alt="" class="list-image">
	<div class="animallist-body">
		<div style="font-size:1em;font-weight:bold;">${o.name}</div>
		<div style="font-size:0.8em;color:#295F3D;">${o.type}</div>
		<div style="font-style: italic;font-size:0.8em;color:grey;">${o.breed}</div>
	</div>
	</div>
</div>
`);



const UserProfileLocationsPhotoList = templater(o=>`<img src="${o.photo}" class="animal-jump" data-id="${o.animal_id}">`);
const AnimalProfileLocationsPhotoList = templater(o=>`<img src="${o.photo}" data-id="${o.id}">`);


const makeUserProfile = (user,animals,locations) =>{
return `
<div>
	<div class="hero-image">
		<a href="#settings-profile-upload-page"><img src="${user.img}" alt=""></a>
	</div>


<div class="anchor center">
<a href="#settings-profile-upload-page" class="circle_cam" >
<img src="img/wcam.svg" style="width: 30px;padding-top:1em;"></a>
</div>

	<div style="padding:0em 1em;margin-top:0;">
		<h2 class="profile-title">${user.name}</h2>
		<div class="profile-body">
			<div><strong>Username</strong> &nbsp;&nbsp; ${user.username}</div>
			<div><strong>Email</strong>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;${user.email}</div>
			<div><strong>Animals</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ${animals.length}</div>
			<div><strong>Locations</strong> &nbsp;&nbsp;&nbsp;&nbsp;${locations.length}</div>
		</div>
		<div class="profile-photos">
			<h3 style="text-align:center;margin-top:2em;">Photos</h3>
			<div class="profile-location-photos">
				${UserProfileLocationsPhotoList(locations.slice(0,3))}
			</div>
		</div>
	</div>
</div>
`;
}


const makeAnimalProfile = (animal,locations)=>{

return `<div>
<div class="display-flex">
	<div class="flex-none">
		<img src="${animal.img}" alt="" style="width: 6em;
    height: 6em;
    vertical-align: text-bottom;
    margin-top: 1em;
    margin-left: 1em;
    margin-bottom: 2em;" />
	</div>
	<div style="padding:1em">
		<div style="font-size:1em;color:#295F3D;">${animal.type}</div>
		<div style="font-style: italic;font-size:0.9em;color:grey;">${animal.breed}</div>
		<div class="display-flex">
			<div class="flex-none">
				<button data-toggle=".profile-head" style="border:0;background-color:white;padding-top:1.6em;margin-right:1em;"><img src="img/more.svg" alt=""></button>
			</div>
			<div class="flex-none">
				<a href="#settings-animal-profile-page" style="padding-top:0.2em;margin-right:1em;" ><img src="img/edit.svg" alt="" ></a>
			</div>
			<div class="flex-none">
				<a href="#" js-delete-animal" data-id="${animal.id}"style="padding-top:0.2em"; ><img src="img/delete.svg" alt="" style="width:0.8em;"></a>
			</div>
		</div>
	</div>
</div>
<div class="profile-location-photos">
	${AnimalProfileLocationsPhotoList(locations)}
</div>
</div>
`;
}


const makeRecentProfile = o=>`
<div class="display-flex animal-jump" data-id="${o.animal_id}">
	<div class="flex-none">
		<img src="${o.img}" class="list-image" alt="" />
	</div>
	<div style="padding:0.5em">
		<div><strong>${o.name}</strong></div>
		<div>${o.type}</div>
		<div>${o.breed}</div>
	</div>
</div>
`;







// Typing out everything is fine
const makeSettingsProfileInputs = (o,namespace="settings-profile") => `


<div class="form-control">
	<label for="${namespace}-name" class="form-label">Name</label>
	<input id="${namespace}-name" type="text" class="form-input" data-role="none" value="${o.name}">
</div>
<div class="form-control">
	<label for="${namespace}-username" class="form-label">Username</label>
	<input id="${namespace}-username" type="text" class="form-input" data-role="none" value="${o.username}">
</div>
<div class="form-control">
	<label for="${namespace}-email" class="form-label">Email</label>
	<input id="${namespace}-email" type="text" class="form-input" data-role="none" value="${o.email}">
</div>`;

// You can also break things into their smaller reusable parts
const makeSettingsAnimalProfileInputs = (o,namespace="settings-animal-profile") => `
${FormControl({namespace:namespace,label:"Name",name:"name",value:o.name})}
${FormControl({namespace:namespace,label:"Type",name:"type",value:o.type})}
${FormControl({namespace:namespace,label:"Breed",name:"breed",value:o.breed})}`;


const FormControl = ({namespace,label,name,value,type="text"}) => `
<div class="form-control">
	<label for="${namespace}-${name}" class="form-label">${label}</label>
	<input id="${namespace}-${name}" value="${value}" type="${type}" class="form-input" data-role="none">
</div>`;



const makeSelectOptions = (options,selected) => {
	return templater(o=>`
		<option value='${o[0]}' ${o[0]==selected?'selected':''}>${o[1]}</option>
	`)(options);
}


const makeAnimalProfileInputs = (o,namespace="list-add") => {
let types = [
	['alpaca','Alpaca'],
	['llama','Llama'],
	['vicuna','Vicuna']
];
return `
<div class="form-control">
	<label for="${namespace}-description" class="form-label">Add a Photo</label>
	<input type='hidden' id="${namespace}-photo" data-role="none">
	<label class="imagepicker imagepicker-replace thumbnail">
		<input type='file' id="${namespace}-photo-upload" data-role="none">
	</label>
</div>
<div class="form-control">
	<label for="${namespace}-name" class="form-label">Name</label>
	<input type="text" class="form-input" id="${namespace}-name" placeholder="Type Animal Name" data-role="none" value="${o.name}">
</div>
<div class="form-control">
	<label for="${namespace}-type" class="form-label">Type</label>
	<div class="form-select">
		<select id="${namespace}-type" data-role="none">
			${makeSelectOptions(types,o.type)}
		</select>
	</div>
</div>
<div class="form-control">
	<label for="${namespace}-breed" class="form-label">Breed</label>
	<input type="text" class="form-input" id="${namespace}-breed" placeholder="Type Animal Breed" data-role="none" value="${o.breed}">
</div>
<div class="form-control">
	<label for="${namespace}-description" class="form-label">Description</label>
	<textarea class="form-input" id="${namespace}-description" placeholder="Type Animal Description" data-role="none">${o.description}</textarea>
</div>`;
}





const filterList = (animals,type) => {
	let a = [...(new Set(animals.map(o=>o[type])))];
	return templater(o=>`<li><a href="#" data-filter="${type}" data-value="${o}">${o[0]+o.substr(1)}</a></li>`)(a)
}

const listFilters = (animals) => {
	return `
	<li><a href="#" data-filter="type" data-value="">All</a></li>
	${filterList(animals,'type')}
	${filterList(animals,'breed')}
	`;
}