import Note from "./Note";
import CreateNote from "./CreateNote";

import "../css/Note.css";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");

    const textHandler = (e) => {
        setInputText(e.target.value)
    };

    const saveHandler = ()=> {
        setNotes((prevState)=>[
            ...prevState,
            {
                id:uuid(),
                text:inputText
            }
        ]);
        // alert('note created!');
        setInputText("");
    }

    const deleteNote = (id)=>{
        //delete one card
        const filteredNotes = notes.filter(note=>note.id !==id);
        setNotes(filteredNotes);
    }

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("Notes"));
        console.log('data', data)
        if(data.length>0){
            //notes posted will all be saved local
            setNotes(data)

        }
    },[])

    useEffect(()=>{
        console.log(notes)
        //saving data to local storage
        localStorage.setItem("Notes",JSON.stringify(notes))
    },[notes])

    return (
        <div className='notes'>
            note map
            {notes.map(note=>(
                <Note
                    key={note.id}
                    text={note.text}
                    id={note.id}
                    deleteNote={deleteNote}
                />
            ))
            }
                {/* <Note/>
                <Note/>
                <Note/>
                <Note/>
                <Note/>
                <Note/>  */}
                <CreateNote 
                    textHandler={textHandler}
                    inputText={inputText}
                    saveHandler={saveHandler}
                />
        </div>
    );
    
}

export default Notes;