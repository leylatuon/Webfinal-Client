import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email: "",
      imageURL: "",
      gpa: 0.0,
      redirect: false, 
      redirectId: null
    };
  }
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id)
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
      id: this.props.student.id,
      firstname: this.state.firstname === "" ? this.props.student.firstname : this.state.firstname,
      lastname: this.state.lastname === "" ? this.props.student.lastname : this.state.lastname,
      campusId: this.state.campusId === null ? this.props.student.campusId : this.state.campusId,
      email: this.state.email === "" ? this.props.student.email : this.state.email,
      imageURL: this.state.imageURL === "" ? this.props.student.imageURL : this.state.imageURL,
      gpa: this.state.gpa === 0.0 ? this.props.student.gpa : this.state.gpa,
    };

    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the student
    this.setState({
      id: null,
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageURL: "",
      gpa: 0.0,
      redirect: true, 
      redirectId: this.props.student.id
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
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
          student={this.props.student}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};
// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return({
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);