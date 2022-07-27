import React from 'react'

function Navtest() {
  return (
    <div>
        
<nav className="navbar navbar-inverse" style={{"margin-bottom": 0,"border-radius": 0}}>
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <a className="navbar-brand" href="/">Portfolio</a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        <li className="active"><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Gallery</a></li>
        <li><a href="/">Contact</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav>
  </div>
  )
}

export default Navtest