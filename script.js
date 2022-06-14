import {User} from './class/user.js'
import {Button} from './class/button.js'
class App{
    constructor(){
    this.container = document.querySelector('.app')
      this.users=null  
      this.url='https://randomuser.me/api?results=10'
      this.hasError = null
    }

async  loadUsers() {
    try{
    const response = await fetch(this.url)
    this.users = await response.json()
    return this.users.results
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

createUsers(){
    const div = document.createElement('div')
    this.users = this.loadUsers().then(users => {
        users.forEach(user => {
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
    this.container.prepend(button.render())
}

}
const app = new App()
app.render()