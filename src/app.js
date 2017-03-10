import React, { Component } from 'react'
const url = 'http://localhost:8080/'
import 'tachyons/css/tachyons.css'
import {map, append} from 'ramda'
import CreateTodo from './components/create-todo.js'


class App extends Component {
  constructor () {
    super()
    this.state = {
      currentList: []
    }

  }

  updCurrentList (todo) {
    this.setState({currentList: append(todo, this.state.currentList)})
  }

  componentDidMount () {
    fetch(`http://localhost:8080/todos`)
      .then(res => res.json())
      .then(currentList => this.setState({currentList: currentList}))
  }

  render () {

    const li = todo => {
      return (
        <li key={todo._id}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{todo.label}</label>
            <button className="destroy" />
          </div>
          <input className="edit" defaultValue="Rule the web" />
        </li>
        )
    }

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
          </header>

          <section className="main">
            <CreateTodo />
          </section>

          <section className="main">
          <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              <li className="completed">
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked />
                  <label>Taste JavaScript</label>
                  <button className="destroy" />
                </div>
                <input className="edit" defaultValue="Create a TodoMVC template" />
              </li>
              <li>
                <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>Buy a unicorn</label>
                  <button className="destroy" />
                </div>
                <input className="edit" defaultValue="Rule the web" />
              </li>
              {map(li, this.state.currentList)}
            </ul>
          </section>
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
    			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    			<p>Created by <a href="#">you</a></p>
    			<p>Part of <a href="#">TodoMVC App</a></p>
        </footer>
      </div>
    )
  }
}

export default App
