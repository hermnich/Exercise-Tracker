import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function EditPage({exerciseToEdit}) {
    const navigate = useNavigate()

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({name: name, reps: reps, weight: weight, unit: unit, date: date}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the exercise!");
        } else {
             alert(`Failed to edit exercise, status code = ${response.status}`);
        }     
        navigate("/");
    };
    
    return (
        <div>
            <h1>Edit Exercise</h1>
            <fieldset>
                <div className='Data-input'>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className='Data-input'>
                    <label>Reps: </label>
                    <input
                        type="number"
                        value={reps}
                        onChange={e => setReps(e.target.valueAsNumber)} />
                </div>
                <div className='Data-input'>
                    <label>Weight: </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.valueAsNumber)} />
                </div>
                <div className='Data-input'>
                    <label>Unit: </label>
                    <select
                        value={unit}
                        onChange={e => setUnit(e.target.value)}>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                    </select>
                </div>
                <div className='Data-input'>
                    <label>Date: </label>
                    <input
                        type="text"
                        value={date}
                        onChange={e => setDate(e.target.value)} />
                </div>
                <div className='Data-input'>
                    <button
                        onClick={editExercise} >
                        Save
                    </button>
                </div>
            </fieldset>
        </div>
    )
}

export default EditPage;