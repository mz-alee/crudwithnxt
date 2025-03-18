import React from 'react'

const Server = () => {
  console.log(process.env.NODE_ENV);
  console.log("FROM SERVER SIDE",process.env.SERVER_PASSWORD);
  
  return (
    <div>Server</div>
  )
}

export default Server