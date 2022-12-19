/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  
  if(campus.students.length == 0){
    return (
      <div>
        <img style={{width: '500px',paddingTop: '2rem'}} src={campus.imageURL} alt="campus_image"/>
        <h1>{campus.name}</h1>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        <p>{"Campus has no students"}</p>
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
            <button onClick={() => {
              console.log(campus.students);
              let index = -1;
              for(let i = 0; i < campus.students.length; i++){
                if(campus.students[i].id == student.id){
                  index = i;
                  break;
                }
              }
              console.log(index);
              //campus.students.splice(index, 1);
              console.log("Should delete student from campus");
            }}>Delete</button>
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