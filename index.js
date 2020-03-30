let calcBtn = document.getElementById('calc');
//calc.addEventListener("click", calculateBMI);
function verification(height, weight, age, activity){
  
if( height == "" ) {
    alert( "Oops! You forgot to type in your height!" );
    return false;
}
else if( isNaN(height) ) {
    alert( "Your height is supposed to be a number, can you fix that? :)" );
    return false;
}
else if( weight == "" ) {
    alert( "Oops! You forgot to type in your weight!" );
    return false;
}
else if( isNaN(weight) ) {
    alert( "Your weight is supposed to be a number, can you fix that? :)" );
    return false;
}
else if( age == "" ) {
    alert( "Oops! You forgot to type in your age!" );
    return false;
}
else if( isNaN(age) ) {
    alert( "Your age is supposed to be a number, can you fix that? :)" );
    return false;
}
else if( activity == "" ) {
    alert( "Can you tell us something about your activity? :)" );
    return false;
}
else {
    console.log("Data retrieved, calculating BMI...");
    return true;
}



}

function calculateBMI(){

   
    let height = document.getElementById('height').value;
    let weight = document.getElementById("weight").value;
    let age = document.getElementById("age").value;
    let activityOpt = document.getElementById("activity");
    let activity = activityOpt.options[activityOpt.selectedIndex].value;
    let genderMale = document.getElementById("radio-one");
    let genderFemale = document.getElementById("radio-two");
    let gender, baf, bmi, bmr, tdee, carbs, fats, proteins, a;

    
    if(verification(height,weight,age,activity)){
        let dataForm = document.getElementById('dataForm');
        let resultsForm = document.getElementById('resultsForm');

        dataForm.classList.remove("active");
        resultsForm.classList.add("active");

        let resHeight = document.getElementById('res-height');
        let resWeight = document.getElementById('res-weight');
        let resAge = document.getElementById('res-age');
        let resActivity = document.getElementById('res-activity');
        let resGender = document.getElementById('res-gender');

        resHeight.innerHTML += height + ' cm';
        resWeight.innerHTML += weight + ' kg';
        resAge.innerHTML += age;

        switch(parseInt(activity)){
            case 1: resActivity.innerHTML += activity + " - Sedentary (little or no exercise, desk job)";
                    baf = 1.2;
                    break;
            case 2: resActivity.innerHTML += activity + " - Lightly active (light exercise/sports 1-3 days/week)";
                    baf = 1.375;
                    break;
            case 3: resActivity.innerHTML += activity + " - Moderately active (moderate exercise/sports 6-7 days)";
                    baf = 1.55;
                    break;
            case 4: resActivity.innerHTML += activity + " - Very active (hard exercise every day, or 2 xs/day)";
                    baf = 1.725;
                    break;
            case 5: resActivity.innerHTML += activity + " - Extra active (hard exercise 2 or more times per day)";
                    baf = 1.9;
                    break;
        }
        
        if(genderMale.checked) 
            gender = 1;
        if(genderFemale.checked) 
            gender = 0;

        if(gender == 1){
            resGender.innerHTML += 'Male';
            a = 5;
        }
        else{
            resGender.innerHTML += 'Female';
            a = -161;
        }
            
        height /= 100;

        bmi = weight/(height*height);

        bmi = bmi.toFixed(2);
        let bmiRange;
        if(bmi < 16) bmiRange = 1;
        if(16.0 <= bmi && bmi <= 16.99) bmiRange = 2;
        if(17.0 <= bmi && bmi <= 18.49) bmiRange = 3;
        if(18.5 <= bmi && bmi <= 24.99) bmiRange = 4;
        if(25.0 <= bmi && bmi <= 29.99) bmiRange = 5;
        if(30.0 <= bmi && bmi <= 34.99) bmiRange = 6;
        if(35.0 <= bmi && bmi <= 39.99) bmiRange = 7;
        if(bmi >= 40) bmiRange = 8;
        
        document.getElementById('BMI').innerHTML += bmi;
        
        document.getElementById('bmi' + bmiRange).style.fontWeight = 'bold';

        height *= 100;

        bmr = (10 * weight) + (6.25 * height) - (4.92 * age) + a;

        document.getElementById('BMR').innerHTML += bmr.toFixed() + ' kcal';

        tdee = bmr * baf;
        tdee = tdee.toFixed();

        document.getElementById('TDEE').innerHTML += tdee + ' kcal';

        let tdeeInfo;
        if(bmiRange < 4) {
            tdee = tdee * 1.1;
            tdeeInfo = 'You should gain some weight! You should consume ~' + tdee + ' kcal per day';
            proteins = weight * 2;
            fats = (tdee / 4) / 9;
            carbs = (tdee - (proteins * 4) - (fats * 9)) / 4;
        }
        if(bmiRange == 4) {
            tdeeInfo = 'You are in good shape ;) You should consume ~' + tdee + ' kcal per day';
            proteins = weight * 2.1;
            fats = (tdee / 4.5) / 9;
            carbs = (tdee - (proteins * 4) - (fats * 9)) / 4;
        }    
        if(bmiRange > 4) {
            tdee = tdee * 0.9;
            tdeeInfo = 'You should lose some weight! You should consume ~' + tdee + ' kcal per day';
            proteins = weight * 2.2;
            fats = (tdee / 5) / 9;
            carbs = (tdee - (proteins * 4) - (fats * 9)) / 4;
        }

        proteins = proteins.toFixed(1);
        carbs = carbs.toFixed(1);
        fats = fats.toFixed(1);

        document.getElementById('tdeeInfo').innerHTML = tdeeInfo;
        document.getElementById('proteins').innerHTML += proteins + ' g';
        document.getElementById('carbs').innerHTML += carbs + ' g';
        document.getElementById('fats').innerHTML += fats + ' g'; 
        
    }
}

