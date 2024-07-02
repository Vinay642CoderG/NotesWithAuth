
import {FaEdit, FaPlus} from "react-icons/fa"
import {useAppContext} from "../UserContext"
import Cookies from "js-cookie"

const AddEditNoteForm = () => {
    const {setRefreshNotes, userData} = useAppContext();
    const handleFormSubmit = (e)=>{
      e.preventDefault();
      const apibase = "http://localhost:3000/api/v1";
      const formdata = new FormData(e.target);
      const sumbitBtn = document.querySelector('#addNoteForm>button');
      sumbitBtn.setAttribute('disabled', 'true');
      fetch(`${apibase}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${Cookies.get('user-auth')}`,
        },
        body: JSON.stringify(Object.fromEntries(formdata))
      }).then(()=>{
        alert("Note is added.")
        setRefreshNotes(true)
        sumbitBtn.removeAttribute('disabled');
      }).catch(()=>{
        alert("Something went wrong.")
        sumbitBtn.removeAttribute('disabled');
      })
    }
    return (
      <form id="addNoteForm" onSubmit={handleFormSubmit} className="py-3 px-2" style={{ background: "lightgray" }}>
        <h3 className="d-flex gap-2 align-items-center"><FaEdit/> Add Notes</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            placeholder="Enter Text"
            type="text"
            className="form-control"
            id="exampleInputTitle"
            name="title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Description
          </label>
          <textarea
            placeholder="Enter Description"
            type="text"
            className="form-control"
            id="exampleInputDescription"
            name="description"
            rows={5}
            cols={5}
            style={{resize: "none"}}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary d-flex gap-2 align-items-center">
          <FaPlus/> Add Note
        </button>
      </form>
    );
}

export default AddEditNoteForm
