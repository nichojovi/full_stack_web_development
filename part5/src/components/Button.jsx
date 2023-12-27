const Button = ({ onClick, text, id }) => {
  return <button onClick={onClick} id={id}>{text}</button>
}

export default Button
