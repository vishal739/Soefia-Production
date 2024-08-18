import React from 'react';
import "./notebook.scss";
import Navbar from '../Navbar/Navbar';
import mic from "../../assets/mic.png";
const NoteBook = () => {
    return (
        <>
            <Navbar />
            <div className="notebook-container">
                Notebook here
            </div>
        </>
    );
}

export default NoteBook;
