import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import reducer from './reducers/index';
import addItem from './actions/addItem';
import changeStatus from './actions/changeStatus';
import setFilter from './actions/setFilter';
import deleteItems from './actions/deleteItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class Footer extends Component {
  constructor(props) {
    super(props);
    this.allFilter = this.allFilter.bind(this);
    this.activFilter = this.activFilter.bind(this);
    this.compleatFilter = this.compleatFilter.bind(this);
  }

  allFilter() {
    return this.props.onfilter("SHOW_ALL")
  }
  activFilter() {
    return this.props.onfilter("SHOW_ACTIV")
  }
  compleatFilter() {
    return this.props.onfilter("SHOW_COMPLEAT")
  }
  listAllSum() {
    let sum = 0;
    this.props.list.map(t => sum++ )
    return sum
  }
  listActivSum() {
    let sum = 0;
    this.props.list.map(t => {if(!t.compleat) return sum++})
    return sum;
  }
  listCompleteSum() {
    let sum = 0;
    this.props.list.map(t => {if(t.compleat) return sum++})
    return sum;
  }

  render() {
    return (
        <div>
          <span className="FilterShow">Show:</span>
          {" "} 
          <span className="FilterStyle" onClick = {this.allFilter}> All </span>
          {" "}
          <span className="FilterStyle" onClick = {this.activFilter}> Activ </span>
          {" "}
          <span className="FilterStyle" onClick = {this.compleatFilter}> Completed </span>
          <div>
            <span className="AllItems"> All items: {this.listAllSum()} </span>
            <span className="AllItems"> Activ: {this.listActivSum()}</span>
            <span className="AllItems"> Complete: {this.listCompleteSum()}</span>
          </div>
        </div>
      );
  }
}

class List extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this);
    this.check = this.check.bind(this);
    this.forDeletItem = this.forDeletItem.bind(this);
  }

  change() {
    this.props.onChangeStatus(this.props.id);
  }

  check(bool) {
    if (bool) {
      return true
    } else {
      return false
    }
  }

  forDeletItem(index) {
    this.props.onDeleteItems(this.props.index)
  }

  render() {
    return(
  <div className="Aaa">    
      <div className="IDontNow">
          <input type = 'checkbox'
                 onClick = {this.change}
                 checked = {this.check(this.props.compleat)}
          />
          {(this.props.compleat) ? 
              <del>{this.props.value} </del> : 
              <span>{this.props.value} </span>
            }
            <span className="IDontNow"
                    className="DeleteButton" 
                    onClick={this.forDeletItem}>
                    X
            </span>
      </div>
  </div>
      )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.addNewItem = this.addNewItem.bind(this);
  }

  addNewItem(){
    if(this.refInput.value.trim() === "") {
      return
    } else {
      this.props.onAddItem(this.refInput.value);
      this.refInput.value = "";
    }
  }

  todoList() {
    return (
        (value, key) => <ListMap 
                          value = {value.name} 
                          index = {key}
                          key = {key} 
                          id = {value.id} 
                          compleat = {value.compleat}
                        />
        )
  }

  render() {
    console.log(this.props.rezervList.length)
    return (
          <div className="App">
          <div className="Title">todo</div>
              <div className= "InputBut">
                <input 
                  className="Input"
                  type='text' 
                  ref={(input) => {this.refInput = input}}  
                  placeholder='Enter new item' 
                />
                <span className="AddButton" onClick = {this.addNewItem}> Add </span>
              </div >
            {this.props.list.map(this.todoList())} 
            <FooterFilter />       
          </div>
    );
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    onAddItem: bindActionCreators(addItem,dispatch),
    onChangeStatus: bindActionCreators(changeStatus,dispatch),
    onfilter: bindActionCreators(setFilter,dispatch),
    onDeleteItems: bindActionCreators(deleteItems,dispatch)
  }
} 

const mapStateToProps = (state) => {
      switch (state.visibilityFilter) {
        case "SHOW_ALL":
            return {list: state.addList,
                    rezervList: state.addList}
        case "SHOW_ACTIV":
            return {list: state.addList.filter(t => !t.compleat),
                    rezervList: state.addList}
        case "SHOW_COMPLEAT":
            return {list: state.addList.filter(t => t.compleat),
                    rezervList: state.addList}
          }
}

const mapActionsToPropsFoot = (dispatch) => {
  return {
    onfilter: bindActionCreators(setFilter,dispatch)
  }
} 

const mapStateToPropsFoot = (state) => {
      return {list: state.addList}
          
}

const WrappedApp = connect (mapStateToProps,mapActionsToProps)(App);
const ListMap = connect (mapStateToProps,mapActionsToProps)(List);
const FooterFilter = connect (mapStateToPropsFoot,mapActionsToPropsFoot)(Footer);

export default WrappedApp;
 
