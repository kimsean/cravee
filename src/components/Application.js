import React from 'react'
import Data from '../data/data'
import Icons from '../icons'

import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

class Application extends React.Component {
  constructor() {
    super()
    this.state = {
      data: Data,
      longitude: 7.070093,
      latidude: 125.614553,
      selected: false,
      search_field: '',
      list: Data,
      style: {
        selected_class_name: ''
      }
    }
  }
  searchRestaurant(input) {
    try {
      let value = this.state.data.filter(function (val) {
        if(val.restaurant_name.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
          return val
        }
      })
      if (value === 0) {
        let data = this.state.data
        this.setState({
          list: data
        })
      } else {
        this.setState({
          list: value
        })
      }
    } catch (err) { console.log(err) }
  }
  filterByCategoryOrTags(tag_name) {
    try {
      if (tag_name === 'all') {
        let data = this.state.data
        this.setState({
          list: data
        })
      } else {
        let value = this.state.data.filter(function (val) {
          let tag_val = val.tags.filter(function (name) {
            if (name.name.toLocaleLowerCase().includes(tag_name.toLocaleLowerCase())) {
              return val
            }
          })
          if (tag_val.length >= 1) {
            return val
          }
        })
        this.setState({
          list: value
        })
      }
    } catch (err) { console.log(err) }
  }
  componentDidMount () {
  }
  render () {
    let search_result
    if (this.state.list.length > 0) {
      search_result = false
    } else {
      search_result = true
    }
    return (
      <div>
        <div id="header-bar" className="container-fluid">
          <div className="row">
            <div className="col-2 text-right title-container">
              <span className="title">cravee</span>
            </div>
            <div className="col-8">
              <input type="text" className="search-bar" placeholder="Search now..."
                onChange={(event)=>{
                this.searchRestaurant(event.target.value)
              }}
            />
              <ul className="category-list">
              <li onClick={(event) => {this.filterByCategoryOrTags('all')}}><img className="category-icons" src={Icons.all} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('pizza')}}><img className="category-icons" src={Icons.pizza} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('pasta')}}><img className="category-icons" src={Icons.ramen} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('coffee')}}><img className="category-icons" src={Icons.coffee} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('chicken')}}><img className="category-icons" src={Icons.chicken} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('beer')}}><img className="category-icons" src={Icons.beer} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('shawarma')}}><img className="category-icons" src={Icons.shawarma} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('beef')}}><img className="category-icons" src={Icons.beef} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('crab')}}><img className="category-icons" src={Icons.crab} alt=""/></li>
                <li onClick={(event) => {this.filterByCategoryOrTags('shrimp')}}><img className="category-icons" src={Icons.shrimp} alt=""/></li>
              </ul>
            </div>
            <div className="col-2">
            </div>
          </div>
        </div>
        <div className="row m-0 p-0 container-fluid content-container">
          <div className="col-3 restaurant-list">
          {
            search_result ? 
            <div className="no-result">
              <b>No Results Found</b>
              <br/>
              We can't find any Restaurant matching your search.
            </div> : ''
          }
            {
              this.state.list.map((restaurant, index)=> {
                return (
                  <div key={index} id={'restaurant_id_'+restaurant.id} className={'row m-0 p-0 restaurant-item-list ' + this.state.style.selected_class_name}
                    onClick={(event)=> {
                      this.setState({
                        longitude: restaurant.longitude,
                        latidude: restaurant.latitude,
                        selected: true
                      })
                      let restaurant_list_elements = document.getElementsByClassName("restaurant-item-list")
                      for (let x = 0; x < restaurant_list_elements.length; x++) {
                        restaurant_list_elements[x].classList.remove('selected-restaurant')
                      }
                      document.getElementById("restaurant_id_"+restaurant.id).classList.add('selected-restaurant')
                    }}>
                    <div className="col pb-2">
                      <div className="restaurant-name">{restaurant.restaurant_name}</div>
                      <div className="retaurant-address">{restaurant.address}</div>
                      <div className="restaurant-contact">{restaurant.contact}</div>
                      <div className="restaurant-tags">
                        <ul>
                          {
                            restaurant.tags.map((tags,index) => {
                              return (
                                <li key={tags.name}>{tags.name}</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="col p-0">
            <Map defaultCenter={[this.state.longitude, this.state.latidude]} center={[this.state.longitude, this.state.latidude]} zoom={16}>
              {
                this.state.selected ?
                <Marker anchor={[this.state.longitude, this.state.latidude]} payload={1} onClick={({ event, anchor, payload }) => {}} />
                : null
              }
            </Map>
          </div>
        </div>
      </div>
    )
  }
}
export default Application