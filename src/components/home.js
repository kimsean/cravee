import React from 'react'
import { Link } from "react-router-dom"

export default class Home extends React.Component {
  constructor () {
    super() 
    this.state = {
      welcome_message: 'Cravee 2019'
    }
  }
  render () {
    return (
      <section id="home">
        <div className="container-fluid">
          <div className="row">
            <div className="col text-center">
              <div>
                <h1>cravee</h1>
              </div>
              <div>
              <Link to="/app">
                <button className="btn-start">start craving now! <i className="fas fa-search-location"></i></button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
