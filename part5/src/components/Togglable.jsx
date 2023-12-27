import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(ref, () => ({ toggleVisibility }))
  const styleWhenVisible = { display: visible ? '' : 'none' }
  const styleWhenHidden = { display: visible ? 'none' : '' }

  return (
    <div>
      <div style={styleWhenHidden}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={styleWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

Togglable.displayName = 'Togglable'

export default Togglable