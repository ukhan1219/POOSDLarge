//Inserts health info, or updates if already present
app.post("/api/HealthInfo", async (req, res, next) => 
    {

    let {id, height, weight, bmi, calories} = req.body;
    var error = '';
    try {

        if(height != 0) {height = parseFloat(height); if(isNaN(height)){throw new Error("Invalid format");}}
        if(weight != 0) {weight = parseFloat(weight); if(isNaN(weight)){throw new Error("Invalid format");}}
        if(bmi != 0) {bmi = parseFloat(bmi); if(isNaN(bmi)){throw new Error("Invalid format");}}
        if(calories != 0) {calories = parseFloat(calories); if(isNaN(calories)){throw new Error("Invalid format");}}

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

