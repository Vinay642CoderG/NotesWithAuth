import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../UserContext"
import AddEditNoteForm from "../components/AddEditNoteForm"
import NoteCard from "../components/NoteCard"
import Cookies from "js-cookie"


const Notes = () => {
  const {refreshNotes, setRefreshNotes} = useAppContext();
  const [reload, setReload] = useState(null);
  const allNotes = useRef([]);

  const fetchUserNotes = async ()=>{
    const apibase = "http://localhost:3000/api/v1";
    fetch(`${apibase}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${Cookies.get('user-auth')}`,
      },
    }).then((v)=>{
      return v.json();
    }).then((v)=>{
      v.error?allNotes.current=[]:allNotes.current=v.notes;
      setRefreshNotes(true)
    })
    setRefreshNotes(false)
  }

  function handleNotesSearch (e){
    e.preventDefault();
    const userQ = e.target.value;
    const apibase = "http://localhost:3000/api/v1";
    fetch(`${apibase}/notes/?q=${userQ}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${Cookies.get('user-auth')}`,
      },
    }).then((v)=>{
      return v.json();
    }).then((v)=>{
      v.error?allNotes.current=[]:allNotes.current=v.notes;
      setReload(Math.random())
    })
  }

  useEffect(()=>{
    refreshNotes&&!reload?fetchUserNotes():"";
  }, [refreshNotes, reload])


  return (
    <div className="p-2">
    <h1 className="text-center border border-dark py-2 bg-primary text-white">Welcome to notes App</h1>
    <div className="container-fluid">
      <div className="row gap-md-0 gap-4">
        <div className="col-md-4 col-12 shadow">
          <AddEditNoteForm />
        </div>
        <div className="col-md-8 col-12 shadow py-3 px-2">
          <form onChange={handleNotesSearch} id="notesSearchForm" className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between align-items-center">
            <label htmlFor="searchInput" className="text-uppercase fw-medium fs-5">Search Notes Here:</label>
            <input style={{width: "75%"}} name="q" className="form-control" id="searchInput" type="search" required/>
          </form>
          <h3>Your Notes:</h3>
          <div style={{maxHeight: "30rem"}} className="d-flex gap-2 w-100 justify-content-center align-items-start justify-content-md-start
          overflow-y-scroll overflow-x-hidden flex-wrap">
            {
              allNotes.current?.map((v,i)=>{
                return (
                  <NoteCard noteId={v.id} title={v.title} description={v.description} key={"noteskdk"+i} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Notes
