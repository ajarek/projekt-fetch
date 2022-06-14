export const Button = class {

    constructor(label, onClick) {
        this.label = label
        this.onClick = onClick
    }

    render() {
        const button = document.createElement('button')
        button.classList.add('button')
        button.innerText = this.label
        button.addEventListener(
            'click',
            () => this.onClick()
        )
        return button
    }
}

