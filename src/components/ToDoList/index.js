import React from "react";
import { v4 } from "uuid";
import "./index.css";

export default class ToDoList extends React.Component {
  state = { list: [] };
  onInputSubmit(itemValue) {
    this.setState({ list: [...this.state.list, { id: v4(), value: itemValue, done: false }] });
  }
  onListItemDelete(id) {
    this.setState({ list: this.state.list.filter((el) => el.id !== id) });
  }
  onListItemDone(id) {
    const copyList = this.state.list.slice();
    copyList.forEach((el) => {
      if (el.id === id) el.done = true;
    });
    this.setState({ list: copyList });
  }
  render() {
    return (
      <div className="ToDoList">
        <ListHeader itemCount={this.state.list.length} />
        <ListInput onInputSubmit={this.onInputSubmit.bind(this)} />
        <ListTable listArr={this.state.list} onListItemDelete={this.onListItemDelete.bind(this)} onListItemDone={this.onListItemDone.bind(this)} />
      </div>
    );
  }
}

class ListHeader extends React.Component {
  render() {
    return (
      <div className="ListHeader">
        <p>You Have {this.props.itemCount} Todos</p>
      </div>
    );
  }
}

class ListInput extends React.Component {
  state = { value: "" };
  onInputChange(e) {
    this.setState({ value: e.target.value });
  }
  onItemSubmit(e) {
    if (!this.state.value) return;
    this.props.onInputSubmit(this.state.value);
    this.setState({ value: "" });
  }
  render() {
    return (
      <div className="ListInput">
        <input type="text" value={this.state.value} onChange={this.onInputChange.bind(this)} />
        <input type="submit" value="Submit" onClick={this.onItemSubmit.bind(this)} />
      </div>
    );
  }
}

class ListTable extends React.Component {
  render() {
    return (
      <ul className="ListTable">
        {this.props.listArr.map(({ id, value, done }) => (
          <ListItem key={id} id={id} value={value} done={done} onListItemDelete={this.props.onListItemDelete} onListItemDone={this.props.onListItemDone} />
        ))}
      </ul>
    );
  }
}

class ListItem extends React.Component {
  onClickDelete(e) {
    this.props.onListItemDelete(this.props.id);
  }
  onClickDone(e) {
    this.props.onListItemDone(this.props.id);
  }
  render() {
    const done = this.props.done ? "\u2714" : " ";
    return (
      <React.Fragment>
        <li className="ListItem">
          <span>{done}</span>
          <span>{this.props.value}</span>
          <button onClick={this.onClickDelete.bind(this)}>&#10006;</button>
          <button onClick={this.onClickDone.bind(this)}>&#10004;</button>
        </li>
      </React.Fragment>
    );
  }
}
