import {User} from './class/user.js'
import {Button} from './class/button.js'
import {Input} from './class/input.js'

class App{
    constructor(){
    this.container = document.querySelector('.app')
      this.users=null  
      this.url='https://randomuser.me/api?results=10'
      this.hasError = null
      this.searchPhrase = '' 
      this.filteredUsers = []  
    }

async  loadUsers() {
    try{
    const response = await fetch(this.url) 
    this.users = await response.json()
    return this.users
    }
    catch(err) {
        // łapie błędy zarówno w Fetch i Response.Json
       this.setError(err)
      }
  }

setError(err){
    console.log(err)
    this.hasError = err
    this.container.innerHTML = `<div class="error">${err.message}</div>`   
}

setSearchPhrase(newSearchPhrase) {
    const div = document.querySelector('.users')
    if(div){
    div.innerHTML = ''
    this.searchPhrase = newSearchPhrase
     this.filteredUsers = this.users.results.filter(user =>( user.name.first.toLowerCase()&&user.name.last.toLowerCase()).includes(this.searchPhrase.toLowerCase()))
       this.filteredUsers.forEach(user => {
        const userNew = new User(user)       
        div.innerHTML += userNew.render()    
    }) 
}     
}
   
createUsers(){
    this.container.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('users')
    this.users = this.loadUsers().then(users => {
        users.results.forEach(user => {
            const userComponent = new User(user)       
            div.innerHTML += userComponent.render()
            this.container.appendChild(div)
        })      
    })
    this.render()   
}

render(){
   this.container.innerHTML = ''
    const button = new Button('Load users', () =>this.createUsers())
    const input = new Input('Search user...',this.searchPhrase, (event) => {
        this.setSearchPhrase(event.target.value)
    })
    input.value=''
    this.container.prepend(button.render(), input.render())
}

}
const app = new App()
app.render()