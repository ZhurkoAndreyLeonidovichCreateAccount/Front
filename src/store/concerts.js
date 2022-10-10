
export default {
	namespaced: true,
	state: {
		items: [],
		search: "",
		filterType: "",
		user:null,
		error: '',
		errorsArray:{
			400: "400 BadRequest",
			404: "Not found",
			500: "Internal Server Error",
			0:   "Server not respond"

		},
		success:''

	},
	getters: {
		//all: state => state.items.filter(item=>item.eventName.toLowerCase().includes(state.search.toLowerCase())),
		all (state, getters, rootState, rootGetters){
				return  state.items.filter(item=>item.eventName.toLowerCase().includes(state.search.toLowerCase()))
		},
		filteredEvent(state, getters, rootState, rootGetters ) {
			let value = rootGetters['concerts/all']
			return value.filter(item=>item.eventType.toLowerCase().includes(state.filterType.toLowerCase()))		
		},
		user: state=>state.user,
		error: state=>state.error,
		errorsArray:state=>state.errorsArray,
		success:state=>state.success,

		
	},
	mutations: {
		setItems(state, concerts){
			state.items = concerts;
		},
		setUser(state, user){
			state.user = user
		},
		setSearch(state, data) {
			state.search = data

		},
		setFilterType(state, data) {
			state.filterType = data
		},
		setError(state, data){
			state.error = data
		},
		setSuccess(state, data){
			console.log(data)
			state.success = data
		}

		

	},
	actions: {
		async load({ commit, getters }){
			try{
				let response = await fetch(`https://localhost:7090/api/concerts`);
				if(response.status===200)
				{
					let concerts = await response.json();
					commit('setItems', concerts);
				}
				else {
					commit('setError',getters.errorsArray[response.status])
				}
				
			} 
			catch{
				commit('setError',getters.errorsArray[0])
			}
			
		},
		setUser({commit}, user) {
			commit('setUser', user)
		}
		 
	} 
	
}



/* let concerts=[
				{
				Id:1,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	
			 {
				Id:2,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	 
			 {
				Id:3,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	 
			 {
				Id:4,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	 
			 {
				Id:5,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	
			 {
				Id:6,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	 
			 {
				Id:7,
				NamePerformer:"Владислав Витушко",
				Image:"МузыкальнаяКапела.jpg",
				Voicetype:"баритон",
				DateConcert:'2022,04,30', 
				LocationConcert:"Минск, проспект Независимости, 50",
				AmountOfTickets:20,
				NameOfConcert : "Праздничный концерт ко дню открытия Белорусской государственной филармонии",
			 },	 
			] */