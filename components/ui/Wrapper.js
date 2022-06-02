const Wrapper = ({ className, children }) => {
  return (
    <div className={`max-w-screen-2xl px-5 mx-auto w-full ${className}`}>
      {children}
    </div>
  )
}

export default Wrapper
