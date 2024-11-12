//Inserts health info, or updates if already present
app.post("/api/HealthInfo", async (req, res, next) => 
    {

    const {id, height, weight, bmi, calories} = req.body;
    var error = '';
    try {

        height = parseFloat(height);
        weight = parseFloat(weight);
        bmi = parseFloat(bmi);
        calories = parseFloat(calories);

        if (isNaN(height) || isNaN(weight) || isNaN(bmi) || isNaN(calories)){
            throw new Error("Invalid format");
        }

        const db = client.db();
        const result = await db.collection('HealthInfo').updateOne( {UserID: id}, 
            {$set: 
                {HeightCM: height,
                Weight: weight, 
                BMI: bmi, 
                Calories: calories
            }}, 
            {upsert: true});
        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            error = 'Error HealthInfo';
        }
    }
    catch(e){
        error = e.toString();
    }
    var ret = { error: error };
    if (error) {
        res.status(500).json(ret);
    } else {
        res.status(200).json(ret);
    }
});

