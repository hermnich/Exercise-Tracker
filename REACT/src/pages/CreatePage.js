import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function CreatePage() {
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date }
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };
    
    return (
        <div>
            <h1>Create Exercise</h1>
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
                        onClick={createExercise} >
                        Create
                    </button>
                </div>
            </fieldset>
        </div>
    )
}

export default CreatePage;