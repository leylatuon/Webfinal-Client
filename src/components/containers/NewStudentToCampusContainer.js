import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentToCampusView from '../views/NewStudentToCampusView';
import { addStudentThunk, fetchCampusThunk } from '../../store/thunks';

class NewStudentToCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageURL: "",
      gpa: 0.0,
      campusId: null, 
      redirect: false, 
      redirectId: null,
      named: true
    };
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id)
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.props.campus.id,
        email: this.state.email,
        imageURL: this.state.imageURL,
        gpa: this.state.gpa
    };

    if(this.state.firstname === "" || this.state.lastname === "" || this.state.email === ""){
      this.setState({
        named: false
      });
    }
    else{
      // Add new student in back-end database
      let newStudent = await this.props.addStudent(student);
      this.setState({
        redirectId: newStudent.id
      });
    }

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageURL: "",
      gpa: 0.0,
      redirect: true, 
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentToCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
          campus={this.props.campus}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// The following input argument is passed to the "connect" function used by "NewStudentToCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentToCampusContainer);