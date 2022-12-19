/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageURL: "",
      redirect: false,
      redirectId: null
    };
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
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

    let campus = {
      id: this.props.campus.id,
        name: this.state.name === "" ? this.props.campus.name : this.state.name,
        address: this.state.address === "" ? this.props.campus.address : this.state.address,
        description: this.state.description === "" ? this.props.campus.description : this.state.description,
        imageURL: this.state.imageURL === "" ? this.props.campus.imageURL : this.state.imageURL
    };

    await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the edited campus
    this.setState({
      id: null,
      name: "",
      address: "",
      description: "",
      imageURL: "",
      redirect: true,
      redirectId: this.props.Campus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render edited campus input form
  render() {
    // Redirect to edit campus page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
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

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);