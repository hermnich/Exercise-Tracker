import React, {useState, useEffect} from 'react';
import ExerciseTable from '../components/ExerciseTable';
import {useNavigate} from 'react-router-dom';


function HomePage({setExerciseToEdit}){

    const navigate = useNavigate()
    const [exercises, setExercises] = useState([]);
	
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }
        
    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            loadExercises()
        } else {
        console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    }	

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate("/edit");
    }

    return (
        <div className='Exercise-table'>
            <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete}/>
        </div>
    )
}

export default HomePage;