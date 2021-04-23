function schemaChecker(body, schema){
    var returned = true;
    //For loop to iterate over each schema entry
    for (const [key, value] of Object.entries(schema)) {
        //Check to see if a value is required and if it exists
        if (schema[key].required && body[key] == undefined){
            returned = false;
        } else {
            //Checks if there needs to be a recurive call at this entry
            if (schema[key].type == "object"){
                //Creates new mini schema to send into recursive call.
                var newSchema = schema[key];
                delete newSchema.type;
                delete newSchema.required;
                
                //Specific case fixer
                if (body[key] == undefined){
                    if (schema[key].required == true){
                        returned = false;
                    }
                    continue;
                }
                //Recursive call
                if (!schemaChecker(body[key], newSchema)){
                    returned = false;
                }
            //Checks types to see if body follows schema    
            } else {
                if (schema[key].required == false && body[key] == undefined){
                    continue;
                }
                if (!(typeof body[key] == schema[key].type)){
                    returned = false;
                }
            }
        }
    }
    return returned;
}