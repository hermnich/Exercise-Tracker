import React from 'react';
import {MdDeleteForever, MdEditNote} from 'react-icons/md';


function ExerciseRow({row, onEdit, onDelete}) {
    return (
        <tr>
            <td>{row.name}</td>
            <td>{row.reps}</td>
            <td>{row.weight}</td>
            <td>{row.unit}</td>
            <td>{row.date}</td>
            <td>{<MdEditNote onClick={() => onEdit(row)}/>}</td>
            <td>{<MdDeleteForever onClick={() => onDelete(row._id)}/>}</td>
        </tr>
    );
  }
  

export default ExerciseRow;