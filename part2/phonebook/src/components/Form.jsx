export const Input = ({ text, value, onChange }) => { return ( <div><label>{text}<input value={value} onChange={onChange} /></label></div> ) }

export const Button = ({ type, onClick, text }) => { return ( <button type={type} onClick={onClick}> {text} </button> ) }

export const Form = ({ onSubmit, valueName, onNameChange, valueNumber, onNumberChange, buttonText }) => {
    return (
        <form onSubmit={onSubmit}>
            <Input text='name: ' value={valueName} onChange={onNameChange} />
            <Input text='number: ' value={valueNumber} onChange={onNumberChange} />
            <Button type='submit' text={buttonText} />
        </form>
    )
}

