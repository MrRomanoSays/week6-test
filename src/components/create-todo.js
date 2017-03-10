import React, { Component } from 'react'
import { toLower, replace, append } from 'ramda'

class CreateTodo extends Component {
  constructor () {
    super()
    this.state={
      label: "",
      updatedList: []
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({label: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    fetch('http://localhost:8080/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        label: this.state.label,
        active: true,
        _id: this.state.label
      })
    })
    .then(
      fetch(`http://localhost:8080/todos`)
        .then(res => res.json())
        .then(updatedList => this.setState({updatedList: updatedList}))
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
            <input
              placeholder="What do you need to do?"
              className="w-100 tc bg-green"
              type="text"
              id="createTodo"
              name="createTodo"
              value={this.state.value}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus={true}
            />
          </fieldset>
          <button className="w-100 bg-light-gray pa2">Enter Your todo Above & Push Enter, or Click Here, to Save</button>
      </form>
    )
  }
}

export default CreateTodo
