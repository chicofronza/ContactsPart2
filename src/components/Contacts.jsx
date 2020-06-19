import React, { Component } from "react";
import Contact from "./Contact";

class Contacts extends React.Component {
	state = {
		contacts: [],
		contactsFiltered: [],
		filter: null
	}

	componentDidMount() {
		fetch("https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				contacts: result,
				contactsFiltered: result
			  });
			},
			// Nota: É importante lidar com os erros aqui
			// em vez de um bloco catch() para não recebermos
			// exceções de erros dos componentes.
			(error) => {
			}
		  );
	  }

	  setFilter = () =>{

	  }

	  order = (arg) => {
		console.log('entrou set filter')
		console.log('filter = '+ arg)
		let result = [];
		switch(arg){
			case 'name':
				 result = this.state.contacts.sort((a, b) => {
					if(a.name < b.name) return -1;
					if(a.name > b.name) return 1;
					return 0; 
				 })
				 console.log('filtrou name')				 
				break;
			case'country':
				result = this.contacts.sort((a, b) => {
					if(a.country < b.country) return -1;
					if(a.country > b.country) return 1;
					return 0; 
				})	
				console.log('filtrou pais')						
				break;
			case'admissionDate':
			result = this.contacts.sort((a, b) => {
				if(a.admissionDate < b.admissionDate) return -1;
				if(a.admissionDate > b.admissionDate) return 1;
				return 0; 
			 })
				 break;				 				 
			case'company':
			result = this.contacts.sort((a, b) => {
				if(a.company < b.company) return -1;
				if(a.company > b.company) return 1;
				return 0; 
			 })				
				 break;	
			case 'department':
				result = this.contacts.sort((a, b) => {
					if(a.department < b.department) return -1;
					if(a.department > b.department) return 1;
					return 0; 
				 })					
				break;			 
			default:
	}
	this.setState({
		contactsFiltered: result
	  });
}	  

	  contactTextGeneral = (contact, strSearch) => {
		return (
			contact.name.toLowerCase().includes(strSearch) || 
			contact.company.toLowerCase().includes(strSearch) || 
			contact.department.toLowerCase().includes(strSearch) ||
			contact.country.toLowerCase().includes(strSearch)  || 
			contact.admissionDate.toLowerCase().includes(strSearch) || 
			contact.phone.toLowerCase().includes(strSearch) 
		);
	}

	inputSearchHandler = (event) => {
		console.log(event.target.value)
		const res = this.state.contacts.filter(n => this.contactTextGeneral(n, event.target.value))
		console.log(res)
		this.setState({
			contactsFiltered: res
		  });
		//setContactsFilter(res)
	}
	
	teste = ()=> {
		alert('teste')
	}

	render() {
		const { contacts } = this.state		
		return (
		<>
			<div className="container" data-testid="filters">
			<section className="filters">
				<div className="filters__search">
				<input type="text" className="filters__search__input" placeholder="Pesquisar" 
				onChange={(event) => this.inputSearchHandler(event)}/>

				<button className="filters__search__icon">
					<i className="fa fa-search"/>
				</button>
				</div>

				<button className="filters__item is-selected" 
				onClick={()=> {
					this.setFilter('name');
				}}>
				Nome <i className="fas fa-sort-down" />
				</button>

				<button className="filters__item"
				onClick={()=> this.setFilter('country')}>
				País <i className="fas fa-sort-down" />
				</button>

				<button className="filters__item"
				onClick={()=> this.setFilter('company')}>
				Empresa <i className="fas fa-sort-down" />
				</button>

				<button className="filters__item">
				Departamento <i className="fas fa-sort-down" />
				</button>

				<button className="filters__item">
				Data de admissão <i className="fas fa-sort-down" />
				</button>
			</section>
			</div>

			<div className="container" data-testid="contacts">
				<section className="contacts">
				<article className="contact">
					<span className="contact__avatar" />
					<span className="contact__data">Nome</span>
					<span className="contact__data">Telefone</span>
					<span className="contact__data">País</span>
					<span className="contact__data">Admissão</span>
					<span className="contact__data">Empresa</span>
					<span className="contact__data">Departamento</span>
				</article>
				<Contact data={this.state.contactsFiltered}/>
				</section>
			</div>
		</>
		);
	}
}

export default Contacts;
