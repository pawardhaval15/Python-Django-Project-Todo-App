import React, { Component } from 'react';
import Modal from "./components/Modal"; // code from task 4


// To Do Tasks Items List
const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: todoItems,
      modal: false, //new code from task 4 starts here
      activeItem: {
      title: "",
      description: "",
      completed: false, 
      },
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  
  handleSubmit = (item) => {
    this.toggle();
    alert("save" + JSON.stringify(item));
  };
  
  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  };
  
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  // ----------------------- Code from Task 4 till here -----------------

  // -------------------- Code already from Task 3 ------------------
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTableList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>

        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );


    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align--items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)} //code added in task 4
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)} //code added in task 4
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todoapp
        
        </h1>

        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem} // code added in task 4
                >
                  Add Task
                </button>
              </div>
              {this.renderTableList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? ( //Another Code added in the file in Task 4
          <Modal 
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;