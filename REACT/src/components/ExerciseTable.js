import React from 'react';
import ExerciseRow from './ExerciseRow';


function ExerciseTable({exercises, onEdit, onDelete}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Reps</th><th>Weight</th><th>Unit</th><th>Date</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((row, i) => <ExerciseRow row={row} onEdit={onEdit} onDelete={onDelete} key={i} />)}
            </tbody>
        </table>
    );
  }
  

export default ExerciseTable;