export const SuccessNotification = ({ message }) => 
    message === null ? null : ( <div className="success"> {message} </div> )
    
export const ErrorNotification = ({ message }) => 
    message === null ? null : ( <div className="error"> {message} </div> )
