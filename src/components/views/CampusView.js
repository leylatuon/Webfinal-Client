/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, fetchStudent, editStudent, fetchAllStudents, deleteStudent} = props;

  if(!campus.students.length){
    return (
      <div>
        <img style={{width: '500px',paddingTop: '2rem'}} src={campus.imageURL} alt="campus_image"/>
        <h1>{campus.name}</h1>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        <Link to={`/editcampus/${campus.id}`}>
          <button>Edit Campus</button>
        </Link>
        <Link to={`/campuses`}>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
        </Link>
        <p>{"Campus has no students"}</p>
        <Link to={`/newstudent`}>
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      <img style={{width: '500px',paddingTop: '2rem'}} src={campus.imageURL} alt="campus_image"/>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <Link to={`/campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      </Link>

      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <Link to={`/editstudent/${student.id}`}>
              <button>Edit Student</button>
            </Link>
            <button onClick={() => deleteStudent(student.id)} >Remove Student</button>
          </div>
        );
      })}
      <br></br>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
  );
};

export default CampusView;