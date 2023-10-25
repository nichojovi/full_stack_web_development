export const Button = ({ handleClick, text }) => ( <button onClick={handleClick}> {text} </button> )

export const Input = ({ text, value, onChange }) => ( <div> <label> {text} <input value={value} onChange={onChange} /> </label> </div> )