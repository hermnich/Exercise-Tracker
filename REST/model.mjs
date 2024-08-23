import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema)

const createExercise = async (parameters) => {
    /**
     * Creates a new exercise with the specified parameters
     */
    const exercise = new Exercise(parameters);
    return exercise.save();
};

const retrieveExercises = async (filter) => {
    /**
     * Finds all exercises matching the specified filter
     */
    const query = Exercise.find(filter);
    return query.exec();
}


const updateExercise = async (_id, parameters) => {
    /**
     * Updates the exercise with the specified id, and sets its attributes to the values provided
     */
    const query = Exercise.updateOne({_id: _id}, parameters)
    return query.exec()
}

const deleteExercise = async (exerciseId) => {
    /**
     * Deletes the exercise with the specified id
     */
    const query = Exercise.deleteOne({_id: exerciseId});
    return query.exec();
}

export {createExercise, retrieveExercises, updateExercise, deleteExercise}
