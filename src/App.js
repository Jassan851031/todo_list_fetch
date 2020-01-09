import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      msg: ''
    }
  };

  componentDidMount() {

    this.getList('https://assets.breatheco.de/apis/fake/todos/user/jassan851031');
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  getList(url) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          list: data
        })
      })
      .catch(error => console.log(error));
  }

  event(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      this.setState({
        list: this.state.list.concat({ label: e.target.value, done: false })
      });
      e.target.value = "";

      // Actualizar las tareas con el array actual fetch(url)
      fetch('https://assets.breatheco.de/apis/fake/todos/user/jassan851031',
      {
        method: 'PUT',
        body: JSON.stringify(this.state.list),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            msg: data
          })
        })
        .catch(error => console.log(error));

    }
  }
  
  trash(y) {
    console.log(y);
    const { list } = this.state;
    list.splice(y, 1);
    this.setState({
      list: list
    })

    // Actualizar las tareas con el array actual
    fetch('https://assets.breatheco.de/apis/fake/todos/user/jassan851031',
      {
        method: 'PUT',
        body: JSON.stringify(this.state.list),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            msg: data
          })
        })
        .catch(error => console.log(error));


  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center" >TO DO LIST</h1>
            <input type="text" className="form-control" placeholder="Add to do here" onKeyDown={e => this.event(e)} />
            <br />
            <ul className="list-group">
              {
                this.state.list.length > 0 &&
                this.state.list.map((list, i) => {
                  return (
                    <li key={i} className="list-group-item d-flex justify-content-between">
                      {list.label}
                      <i className="fa fa-trash" onClick={y => this.trash(i)}></i>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="col-md-12">
            {
              this.state.msg !== '' && (
                <div class="alert alert-primary" role="alert">
                  {this.state.msg.result}
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;