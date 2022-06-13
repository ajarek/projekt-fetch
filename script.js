import {User} from './class/user.js'
class App{
    constructor(){
    this.container = document.querySelector('.app')
      this.users=''  
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
render(){
    this.container.innerHTML = ''
    this.loadUsers().then(users => {
        users.forEach(user => {
            const userComponent = new User(user)
            this.container.innerHTML += userComponent.render()
        })
    })
}
}
const app = new App()
app.render()