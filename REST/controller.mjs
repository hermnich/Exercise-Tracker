import 'dotenv/config';
import * as model from './model.mjs';
import express from 'express';
import * as test from 'express-validator'

const PORT = process.env.PORT;

const app = express();

app.use(express.json());


/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', 
    // Validate new exercise parameters before creation
    test.body('name').isString(),
    test.body('reps').isInt({gt: 0}),
    test.body('weight').isInt({gt: 0}),
    test.body('unit').isString().isIn(['kgs', 'lbs']),
    test.body('date').custom(value => isDateValid(value)),

    (req, res) => {
        const result = test.validationResult(req);
        if (result.isEmpty()) {
            const parameters = {"name": req.body.name, 
                                "reps": req.body.reps, 
                                "weight": req.body.weight, 
                                "unit": req.body.unit, 
                                "date": req.body.date};
            model.createExercise(parameters)
                .then(exercise => {
                    res.status(201).json(exercise);
                })
                .catch(error => {
                    console.error(error);
                    res.status(400).json({ Error: 'Request failed' });
                });
        }
        else {
            res.status(400).json({Error: "Invalid request"});
        };
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const filter = {_id: req.params._id};
    model.retrieveExercises(filter)
        .then(exercise => { 
            if (exercise.length !== 0) {
                res.json(exercise[0]);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', (req, res) => {
    const filter = {};
    model.retrieveExercises(filter)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its attributes to the values provided in the body.
 */
app.put('/exercises/:_id', 
    // Validate new exercise parameters before update
    test.body('name').isString(),
    test.body('reps').isInt({gt: 0}),
    test.body('weight').isInt({gt: 0}),
    test.body('unit').isString().isIn(['kgs', 'lbs']),
    test.body('date').custom(value => isDateValid(value)),

    (req, res) => {
        const result = test.validationResult(req);
        if (result.isEmpty()) {
            const parameters = {"name": req.body.name, 
                                "reps": req.body.reps, 
                                "weight": req.body.weight, 
                                "unit": req.body.unit, 
                                "date": req.body.date};
            model.updateExercise(req.params._id, parameters)
                .then(result => {
                    if (result.modifiedCount === 1) {
                        res.json({ "_id": req.params._id, 
                                   "name": req.body.name, 
                                   "reps": req.body.reps, 
                                   "weight": req.body.weight, 
                                   "unit": req.body.unit, 
                                   "date": req.body.date })
                    } else {
                        res.status(404).json({ Error: 'Resource not found' });
                    }
                })
                .catch(error => {
                    console.error(error);
                    res.status(400).json({ Error: 'Request failed' });
                });
        }
        else {
            res.status(400).json({Error: "Invalid request"});
        };
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    model.deleteExercise(req.params._id)
        .then(result => {
            if (result.deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});