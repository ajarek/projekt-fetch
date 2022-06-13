export class User{
    constructor(user){
        this.user = user
    }
    render(){
        const {picture, name} = this.user
        return `<div class="user">
        <img src="${picture.large}" alt="${name.first} ${name.last}">
        <h2>${name.first} ${name.last}</h2>`
    }
}