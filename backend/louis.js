//Inserts health info, or updates if already present
app.post("/api/HealthInfo", async (req, res, next) => 
    {

    const {id, HeightCM, Weight, BMI, Calories} = req.body;
    var error = '';
    try {

        const db = client.db();
        const result = await db.collection('HealthInfo').updateOne( {UserID: id}, 
            {$set: 
                {HeightCM: parseFloat(HeightCM),
                Weight: parseFloat(Weight), 
                BMI: parseFloat(BMI), 
                Calories: parseFloat(Calories)
            }}, 
            {upsert: true});
        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            error = 'Error HealthInfo';
        }
        res.status(200).json({message: 'Successful'});
    } catch(error){
        res.status(500).json({message: 'Error with inserting/updating Health Info'});
    }
});
