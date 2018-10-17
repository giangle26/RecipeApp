var getJSON = function(url, callback) {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'json';
        
        request.onload = function() {
        
            var status = request.status;
            
            if (status == 200) {
                callback(null, request.responseText);
            } else {
                callback(status);
            }
        };
        
        request.send();
    };

getJSON('http://www.recipepuppy.com/api/?q=Vegetable&i=onion,bacon&p=1',  function(err, data) {
    
    if (err != null) {
        console.error(err);
    } else {
        // CHALLENGE 1: Get data
        console.log(data);

        var text = JSON.parse(data);
        var recipes = text.results;

        // CHALLENGE 2: Clean title
        for(var i = 0; i< recipes.length; i++){
            recipes[i].title = recipes[i].title.replace(/\n\t\r/g, "").trim();
        }
        console.log(recipes);

        // CHALLENGE 3: Sort ingredients
        for(var i = 0; i< recipes.length; i++){
            var ing = recipes[i].ingredients.split(", ");
            ing.sort();
            recipes[i].ingredients = ing.toString();
        }
        console.log(recipes);

        // CHALLENGE 4: Find recipes that can be made using ingredient list
        var ingList = "bacon, broccoli, cauliflower, eggs, lettuce, mayonnaise, peas, raisins, red onions, shallot, spinach, sugar, sunflower seed".split(", ");
        var resultArr = [];
        for(var i = 0; i< recipes.length; i++){
            // array contains ingredients of current recipe
            var ing = recipes[i].ingredients.split(",");
            if(ing.every(e => ingList.indexOf(e) > -1)){
                resultArr.push(recipes[i].title);
            }
        }
        console.log(resultArr.join('\r\n'));

        console.log(recipes);
    }
});