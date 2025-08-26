import { useReducer, createContext } from "react"

export const NotificationContext = createContext()
let timer;

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SET":
      if(timer) {
        clearTimeout(timer)
      }
      timer = action.payload.timer
      return action.payload.notification
    case "CLEAR":
      return null
    default:
      return state
  }
}

const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null)

  return(
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider
