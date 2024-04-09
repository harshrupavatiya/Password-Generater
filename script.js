// ******PASSWORD GENERATER******

// DOM elements
const passdisplay = document.querySelector('#showPass');

const cpybtm = document.querySelector('#copytext');

const rangespan = document.querySelector('#rangevalue');
const rangeinput = document.querySelector('#lengthrange');

const allcheck = document.querySelectorAll('.checks');
const upper = document.querySelector('#uppercase');
const lower = document.querySelector('#lowercase');
const number = document.querySelector('#numbers');
const symbol = document.querySelector('#symbol');
const symbolArr = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

const color = document.querySelector('.color');


// variables which will needed in future
let password = "";
let passlength = 10;
let countcheck = 0;

// set input:range value
function handleSlider() {
    rangeinput.value = passlength;
    rangespan.innerHTML = passlength;

    const min = rangeinput.min;
    const max = rangeinput.max;
    rangeinput.style.backgroundSize = ( (passlength - min)*100/(max - min)) + "% 100%"
}
handleSlider();

// set value of passlength after change in input:range
rangeinput.addEventListener( 'input', function () {
    passlength = rangeinput.value;
    handleSlider();
});

// copy to clipboard
function copyToClipboard() {
    
    // password empty then don't copy
    if(password == "")
    {
        return;
    }

    navigator.clipboard.writeText(passdisplay.value);
    cpybtm.innerText = "copied"

    setTimeout( () => {
        cpybtm.innerHTML = "";
    }, 2000);

}

// get random integer between given range
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// get ramdon number in 0-9
function getRandomNumber() {
    return  getRandomInteger(0,9);
}
// get random uppercase alphabet letter
function getUppercase() {
    return String.fromCharCode(getRandomInteger(65, 90)); // ASCII value of A is 65 and Z
}
// get random lowercase alphabet letter
function getlowercase() {
    return String.fromCharCode(getRandomInteger(97, 123)); //ASCII value of a if 97 ans z
}
// get randon symbol from symbolArr array
function getsymbol() {
    return symbolArr.charAt(getRandomInteger(0, symbolArr.length));
}


// count checked checkboxes & set passlength if needed 
function handlechecks() {
    countcheck = 0;
    allcheck.forEach( (elem) => {
        if(elem.checked) {
            countcheck++;
        }
    })
    
    // passlength = countcheck if countcheck > passlength
    if(countcheck > passlength) {
        passlength = countcheck;
        handleSlider();
    }
}


// calculate the strength of password from checked boxes & length of password
function calcStrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (upper.checked) hasUpper = true;
    if (lower.checked) hasLower = true;
    if (number.checked) hasNum = true;
    if (symbol.checked) hasSym = true;
  
    if(hasUpper && hasLower && (hasNum || hasSym) && passlength >= 8) {
      color.style.backgroundColor = '#0f0';
      color.style.boxShadow = '0px 0px 13px #0f0';
    }

    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passlength >= 6) {
        color.style.backgroundColor = '#ff0';
        color.style.boxShadow = '0px 0px 13px #ff0';
    }

    else {
        color.style.backgroundColor = '#f00';
        color.style.boxShadow = '0px 0px 13px #f00';
    }
}


// suffle the array of password's character & convert int ostring & return it.
function suffleString(array) {
    //Fisher Yates Method

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    
    }
    
    // array to string convertion
    let str = "";
    array.forEach((el) => {
        str += el;
    });
    
    return str;
}


// main generate function when generate button clicked.
function generatepass() {
    
    // initial password as empty
    password = "";

    // count the checked checkboxes & set passlengh if countccheck > passlength.
    handlechecks();

    // if no checkboxes checked then end the function.
    if(countcheck == 0)
    {
        return;
    }
    
    // making array of checked boxes
    let funcArr = [];
    if(upper.checked) {
        funcArr.push(getUppercase);
    }
    if(lower.checked) {
        funcArr.push(getlowercase);
    }
    if(number.checked) {
        funcArr.push(getRandomNumber);
    }
    if(symbol.checked) {
        funcArr.push(getsymbol);
    }

    // push a checked alphabet, number & symbol atleast onetime in password from checked array
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }

    // push remaining elements as random from checked array
    for(let i = 0; i < passlength-funcArr.length; i++) {
        password += funcArr[getRandomInteger(0, funcArr.length)]();
    }

    //suffle the password
    password = suffleString(Array.from(password));

    // diaspaly the password
    passdisplay.value = password;

    // calculate strength func call
    calcStrength();
}