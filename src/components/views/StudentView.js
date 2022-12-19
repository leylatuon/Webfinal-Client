/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  if(student.campus  == null){
    return (
      <div>
        <img style={{width: '200px',paddingTop: '2rem'}} src={student.imageURL} alt="profile_picture"/>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{"Email: " + student.email}</h3>
        <h3>{"GPA: " + student.gpa}</h3>
        <h3>{"Student has no campus"}</h3>
        <Link to={`/editstudent/${student.id}`}>
          <button>Edit Student</button>
        </Link>
        <Link to={`/students`}>
          <button onClick={() =>deleteStudent(student.id)}>Delete</button>
        </Link>
      </div>
    );
  
  }

  // Render a single Student view 
  return (
    <div>
      <img style={{width: '200px',paddingTop: '2rem'}} src={student.imageURL} alt="profile_picture"/>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{"Email: " + student.email}</h3>
      <h3>{"GPA: " + student.gpa}</h3>
      <Link to={`/campus/${student.campus.id}`}>
        <h3>{"Campus: " + student.campus.name}</h3>
      </Link>
      <Link to={`/editstudent/${student.id}`}>
        <button>Edit Student</button>
      </Link>
      <Link to={`/students`}>
        <button onClick={() => {
          console.log("Should delete student too");
        }}>Delete</button>
      </Link>
      


    </div>
  );

};

export default StudentView;