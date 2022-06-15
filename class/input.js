export class Input {

    constructor(placeholder,value, onInput) {
        this.value = value
        this.onInput = onInput
        this.placeholder = placeholder
    }

    render() {

        const input = document.createElement('input')
        input.classList.add('input')
        input.placeholder = this.placeholder
        input.value = this.value
        input.addEventListener(
            'input',
            this.onInput
        )

        setTimeout(
            () => input.focus(),
            0
        )

        return input

    }

}