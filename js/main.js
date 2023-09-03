
                                "use strict"

                        // & === Loading Screen === & //

//~ Document Is Ready ~//
$(function(){
    $('.loading-screen i').fadeOut(500,function(){
        $('.loading-screen').fadeOut(500);
    });
    $("body").css("overflow", "visible");
})
                        // & === Loading Screen === & //


                        // & === SideBar === & //

let width=$("#sidebar .sidebarInner").innerWidth();
let li=$("#sidebar .links li");

//^ Declare closeSidebar() Function ^//
function closeSidebar(){
    $("#iconClicked").attr("class","fa-solid fa-bars fa-3x")
    $("#sidebar").animate({'left':-width},500);
    li.animate({top:"300px"},500);
}

//* when open website close the sidebar *//
$("#iconClicked").attr("class","fa-solid fa-bars fa-3x")
$("#sidebar").css({'left':-width});
li.css({top:"300px"});

//^ Open & Close SideBar
$("#iconClicked").click(function(){
    //* Left =0 === SlideBar Appear *//
    //! Close SideBar !//
    if($("#sidebar").css('left') == '0px'){
        $("#iconClicked").attr("class","fa-solid fa-bars fa-3x")
        $("#sidebar").animate({'left':-width},500);
        li.animate({top:"300px"},500);
    }
    //! Open SideBar !//
    else{
        $("#iconClicked").attr("class","fa-solid fa-xmark fa-3x")
        $("#sidebar").animate({'left':'0px'},500);
        for(let i=0;i<li.length;i++){
            li.eq(i).animate({top:"0px"},((i+li.length)*100))
        }
    }
})

                    // & === SideBar === & //


                    // & === Main Page === & //

                    function appearLoading(){
                        $('.inner-loading-screen').css({'display':'flex'});
                        $('.inner-loading-screen i').fadeIn(300,function(){
                            $('.inner-loading-screen').fadeIn(300);
                        });
                        $("body").css("overflow", "hidden");
                    }

                    function disappearLoading(){
                        $('.inner-loading-screen i').fadeOut(300,function(){
                            $('.inner-loading-screen').fadeOut(300)
                        });
                        $("body").css("overflow", "visible");
                    }

// ^ Declare display(finalRes) Function === cartona Concept And Display Row ^ //
function display(finalRes){
    let cartona="";

    //* if you not find the meal *//
    if(finalRes==null){
        $("#demo").html(cartona) //* cartona now is Empty *//
        return 0;
    }

    for(let i=0;i<finalRes.length;i++){
        cartona+=`<div class="col-md-3">
        <div onclick="mainAfterClick(${finalRes[i].idMeal})" class="inner-col position-relative rounded-2 overflow-hidden">
            <img src="${finalRes[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute d-flex align-items-center p-2">
                <h3>${finalRes[i].strMeal}</h3>
            </div>
        </div>

    </div>`
    }
    $("#demo").html(cartona);
}

// ^ Declare display(finalRes) Function === cartona Concept And Display Row with maximum 20 meals ^ //
function display20Meals(finalRes){
    let cartona="";
        //* if you not find the meal *//
        if(finalRes==null){
            $("#demo").html(cartona) //* cartona now is Empty *//
            return 0;
        }

    for(let i=0;i<finalRes.length;i++){
        //~ Display Maximum 20 meals ~//
        if(i>=20){
            break;
        }
        cartona+=`<div class="col-md-3">
        <div onclick="mainAfterClick(${finalRes[i].idMeal})" class="inner-col position-relative rounded-2 overflow-hidden">
            <img src="${finalRes[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute d-flex align-items-center p-2">
                <h3>${finalRes[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    $("#demo").html(cartona);
}


//^ Declare getMainData() Function === get data from API by meals name ^//
async function getMainData(){
    let data=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let {meals:result}=await data.json();
    return result;
}

//^ Declare displayMain() Function ^//
async function displayMain(){
    let finalRes=await getMainData();

    //* Call Display(finalRes) To Display Row *//
    display(finalRes);
}

//* Call displayMain() Function === display main page *//
displayMain();

//^ Declare getDataById(idMeal) Function === get data from API by meals id ^//
async function getDataById(idMeal){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare mainAfterClick(id) Function ^//
async function mainAfterClick(id){
    let finalRes=await getDataById(id);
    // console.log(finalRes[0]);
    closeSidebar();

    //* Declare Array to hold substrings of tags *//
    let tagsArray=[];

    //? Handle Case Null ?//
    if(finalRes[0].strTags==null)
    {
        tagsArray=[];
        //! Kda m4 hy5o4 3la l array because length of array = 0 !//
    }
    else{
        tagsArray=finalRes[0].strTags.split(",");
        // console.log(tagsArray);
    }

    let tags="";  //? Concept Cartona ?//
    for(let i=0;i<tagsArray.length;i++){
        tags+=`<li class="alert alert-danger p-1 m-2">${tagsArray[i]}</li>`
    }
    // console.log(tags);


    let recipes=""; //? Concept Cartona ?//
    for(let i=1;i<=20;i++){

        //? Handle Case Empty String ?//
        if(finalRes[0][`strIngredient${i}`]==""||finalRes[0][`strMeasure${i}`]==""){
            break;
        }

        recipes+=`<li class="alert alert-danger p-1 m-2">
        ${finalRes[0][`strMeasure${i}`]} ${finalRes[0][`strIngredient${i}`]}
        </li>`
    }

    // console.log(recipes);

    //* Display The Page *//
    let cartona="";

    cartona+=`<div class="col-md-4 text-white">
    <img src="${finalRes[0].strMealThumb}" alt="photo-main"
        class="img-fluid">
    <h2>${finalRes[0].strMeal}</h2>
</div>

<div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${finalRes[0].strInstructions}</p>

    <h3><span class="fw-bolder">Area : </span>${finalRes[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${finalRes[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">${recipes}</ul>

    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">${tags}</ul>

    <a href="${finalRes[0].strSource}" target="_blank" class="btn source-meal btn-success">Source</a>
    <a href="${finalRes[0].strYoutube}" target="_blank" class="btn youtube-meal btn-danger">Youtube</a>

</div>`

$("#demo").html(cartona)

}


                    // & === Main Page === & //


                    // & === Search Section === & //

// ^ Click On Search <li> ^ //
$("#search").click(function(){
    closeSidebar();
    $(".main").css({'display':'block'});
    $("#demo").css({'display':'none'});
    $("#searchSection").css({'display':'block'});
    $("#showContact").css({'display':'none'});
})

//^ Declare getMealByName(term) Function === get meal by name from API ^//
async function getMealByName(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare displayByName(item) Function === item : input.value ^//
async function displayByName(item){
    let finalRes = await getMealByName(item);
    // console.log(finalRes);
    display20Meals(finalRes)
    $("#demo").css({'display':'flex'})
}

//* Declare Variable to hold the search by name input *//
let nameInput=document.getElementById("searchByName");

//* Write In Search By Name Input *//
nameInput.addEventListener("input",function(){
    // console.log(nameInput.value);
    closeSidebar();
    displayByName(nameInput.value);
})



//^ Declare getMealByFirstLetter(term) Function === get meal by first letter from API ^//
async function getMealByFirstLetter(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare displayByFirstLetter(item) Function === item : input.value ^//
async function displayByFirstLetter(item){
    let finalRes = await getMealByFirstLetter(item);
    // console.log(finalRes);
    display20Meals(finalRes)
    $("#demo").css({'display':'flex'})
}

//* Declare Variable to hold the search by first letter input *//
let letterInput=document.getElementById("searchByFirstLetter");

//* Write In Search By First Letter Input *//
letterInput.addEventListener("input",function(){
    // console.log(letterInput.value);
    closeSidebar();

    //? lw ms7t l 7rf mn l input w b2a l input Empty -> display meals starts by 'a'  ?//
    displayByFirstLetter(letterInput.value?letterInput.value:'a');
})

                    // & === Search Section === & //


                    // & === Categories Section === & //

//^ Declare getCategories() Function === get categories from API ^//
async function getCategories(){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let {categories:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare  displayCategories() Function ^//
async function displayCategories(){
    let finalRes=await getCategories();
    // console.log(finalRes);
    let cartona="";

    for(let i=0;i<finalRes.length;i++){
        cartona+=`<div class="col-md-3">
        <div onclick="displayMealsByCategory('${finalRes[i].strCategory}')" class="inner-col position-relative rounded-2 overflow-hidden">
            <img src="${finalRes[i].strCategoryThumb}" class="img-fluid" alt="photo-category">
            <div class="layer position-absolute text-center p-2">
                <h3>${finalRes[i].strCategory}</h3>
                <p>${finalRes[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>

    </div>`
    }
    $("#demo").html(cartona);
    $("#demo").css({'display':'flex'});
}

// ^ Click On Categories <li> ^ //
$('#Categories').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'block'});
    $("#showContact").css({'display':'none'});

    //* Call displayCategories() Function === display All Categories *//
    displayCategories();
})

//^ Declare getMealsByCategory(term) Function === get meals by categories from API ^//
async function getMealsByCategory(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare  displayMealsByCategory(item) Function ^//
async function displayMealsByCategory(item){
    let finalRes=await getMealsByCategory(item);
    console.log(finalRes);
    closeSidebar();
    display20Meals(finalRes);
}

                    // & === Categories Section === & //


                    // & === Area Section === & //

//^ Declare getArea() Function === get Areas from API ^//
async function getArea(){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare  displayArea() Function ^//
async function displayArea(){
    let finalRes=await getArea()
    // console.log(finalRes);

    let cartona="";
    for(let i=0;i<finalRes.length;i++){
        cartona+=`<div onclick="displayMealsByArea('${finalRes[i].strArea}')" class="col-md-3 text-white">
        <div  class="inner-col rounded-2 text-center">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${finalRes[i].strArea}</h3>
        </div>
    </div>`
    }
    $("#demo").html(cartona);
    $("#demo").css({'display':'flex'});
}

// ^ Click On Area <li> ^ //
$('#Area').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'block'});
    $("#showContact").css({'display':'none'});

    //* Call displayArea() Function === display All Areas *//
    displayArea();
})

//^ Declare getMealsByArea(term) Function === get meals by Areas from API ^//
async function getMealsByArea(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare displayMealsByArea(item) Function ^//
async function displayMealsByArea(item){
    let finalRes=await getMealsByArea(item);
    // console.log(finalRes);
    closeSidebar();
    display20Meals(finalRes);
}

                   // & === Area Section === & //


                   // & === Ingredients Section === & //

//^ Declare getIngredients() Function === get Areas from API ^//
async function getIngredients(){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

//^ Declare displayIngredients() Function ^//
async function displayIngredients(){
    let finalRes=await getIngredients();
    // console.log(finalRes);
    let cartona="";
    for(let i=0;i<finalRes.length;i++){
        //~ Display Maximum 20 Ingredients  ~//
        if(i>=20){
            break;
        }
        cartona+=`<div onclick="displayMealsByIngredients('${finalRes[i].strIngredient}')" class="col-md-3 text-white">
        <div  class="inner-col rounded-2 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${finalRes[i].strIngredient}</h3>
        <P>${finalRes[i].strDescription.split(" ").slice(0,20).join(" ")}</P>
        </div>
    </div>`
    }
    $("#demo").html(cartona);
    $("#demo").css({'display':'flex'});
}

// ^ Click On Ingredients <li> ^ //
$('#Ingredients').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'block'});
    $("#showContact").css({'display':'none'});

    //* Call displayIngredients() Function === display All Ingredients *//
    displayIngredients();
})


//^ Declare getMealsByIngredients(term) Function === get meals by Ingredients from API ^//
async function getMealsByIngredients(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}
//^ Declare displayMealsByIngredients(item) Function ^//
async function displayMealsByIngredients(item){
    let finalRes=await getMealsByIngredients(item);
    // console.log(finalRes);
    closeSidebar();
    display20Meals(finalRes);
}

                   // & === Ingredients Section === & //


                   // & === Contact Us Section === & //

// ^ Declare GlobaL Variables ^ //
let inputName=document.getElementById("name");
let inputEmail=document.getElementById("email")
let inputPhone=document.getElementById("phone");
let inputAge=document.getElementById("age");
let inputPassword=document.getElementById("password");
let inputRePassword=document.getElementById("rePassword");

// ^ Click On Contact Us <li> ^ //
$('#contactUs').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'none'});
    $("#showContact").css({'display':'flex'});
})


//* on input -> on input name
inputName.addEventListener('input',function(){
    validateName(inputName.value);
})

// ^ Declare validateName(term) === to check validate of name ^ //
function validateName(term){
    let regex=/^[a-zA-Z ]+$/gi;
    if(regex.test(term)){
        $("#wrongName").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongName").css({'display':'block'})
        return false;
    }
}


//* on input -> on input email
inputEmail.addEventListener('input',function(){
    validateEmail(inputEmail.value);
})

// ^ Declare validateEmail(term) === to check validate of email ^ //
function validateEmail(term){
    let regex=/^[a-zA-Z]+(\.?[a-zA-Z\d]+)*@[a-zA-Z]+\.[a-zA-Z]{2,}$/g;
    if(regex.test(term)){
        $("#wrongEmail").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongEmail").css({'display':'block'})
        return false;
    }
}


//* on input -> on input phone
inputPhone.addEventListener('input',function(){
    validatePhone(inputPhone.value);
})

// ^ Declare validatePhone(term) === to check validate of phone ^ //
function validatePhone(term){
    let regex=/^(\+\d{1,2})?\d{11}$/g;
    if(regex.test(term)){
        $("#wrongPhone").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongPhone").css({'display':'block'})
        return false;
    }
}


//* on input -> on input age
inputAge.addEventListener('input',function(){
    validateAge(inputAge.value);
})

// ^ Declare validateAge(term) === to check validate of age ^ //
function validateAge(term){
    let regex=/^[1-9](\d{0,2})$/g;
    if(regex.test(term)){
        $("#wrongAge").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongAge").css({'display':'block'})
        return false;
    }
}


//* on input -> on input password
inputPassword.addEventListener('input',function(){
    validatePassword(inputPassword.value);
})

// ^ Declare validatePassword(term) === to check validate of password ^ //
function validatePassword(term){
    let regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    if(regex.test(term)){
        $("#wrongPassword").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongPassword").css({'display':'block'})
        return false;
    }
}


//* on input -> on input rePassword
inputRePassword.addEventListener('input',function(){
    validateRePassword(inputRePassword.value);
})



// ^ Declare validateRePassword(term) === to check validate of rePassword ^ //
function validateRePassword(term){
    if(term==inputPassword.value){
        $("#wrongRePassword").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongRePassword").css({'display':'block'})
        return false;
    }
}

// ^ Declare checkNotEmpty() Function === to check all inputs not empty ^ //
function checkNotEmpty(){
    if(inputName.value !="" && inputEmail.value != "" && inputPhone.value !="" && inputAge.value !="" &&
    inputPassword.value !="" && inputRePassword.value !=""){
        // console.log("done");
        return true;
    }
}


//* When key up on any input will check to enable or disable submit *//
$("#showContact input").keyup(function(){
    if(checkNotEmpty()==true){
        //* Call toggleButton() Function *//
        toggleButton();
    }
})

// ^ Declare toggleButton() Function === Enable & Disable Button ^ //
function toggleButton(){
    if( validateName(inputName.value) && validateEmail(inputEmail.value) && validatePhone(inputPhone.value)
     && validateAge(inputAge.value) && validatePassword(inputPassword.value) &&
    validateRePassword(inputRePassword.value) ){
        $("#submitBtn").attr("disabled",false);
        // $("#submitBtn").removeAttr("disabled");
    }
    else{
        $("#submitBtn").attr("disabled", true)
    }
}

                   // & === Contact Us Section === & //



