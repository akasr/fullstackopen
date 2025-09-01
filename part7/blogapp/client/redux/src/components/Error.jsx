const Error = ({ message }) => {
  return (
    <div
      style={{
        border: '5px solid red',
        fontSize: '1.3rem',
        padding: '1rem',
      }}
    >
      {message}
    </div>
  )
}

export default Error
