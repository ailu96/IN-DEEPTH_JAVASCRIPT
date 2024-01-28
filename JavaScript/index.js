// script.js

//Variables
c=200
var a =10
let b=20
const pi=3.19;
console.log(this.a) //10
console.log(this.b)  //undefined
console.log(this.c)  //200
console.log(this.pi)  // undefined

/*
Hoisting we will be able to access functions and variables without intiliazing 
so in above example c is not defined but we are able to access it and var variable can be hoisted and let and const can not be hoisted and const is immutable
var is hoisted and it will be access throughout window and const and let are stored in different memory space so we will not be able to access them like var
let and const is block scoped so its not accessible outside scope.

*/

//block Scope

{
    var y=1
    let x=2
    const z=3
    console.log(x)
}

console.log(y) //1
//Only for Var type the Variables are access outside block scope
//console.log(x) ---> Reference error: x is not defined for let
//console.log(Z) ---> Reference error: z is not defined for const

//Closures
/*
A function bundled with lexical scope forms closure, So closures allows functions 
to retain access to variables from their enclosing scope even after the outer function 
has finished execution
*/ 
function outerFunction(){
    let outerVariable =10;
    function innerFunction()
    {
        console.log('closure function output:',outerVariable)
    }
    return innerFunction
}
const closureFunction=outerFunction()
closureFunction();//output :10

// SET TIMEOUT EXAMPLE
/*To show that JS don't wait for setTimeout to finish for code execution when there 
is setTimeout it stores settimeout in different execution wait queue and  excutes the next lanes
and then executes the execution wait queue code see example as below
*/

function ValidateJSEngineExecution(){
    console.log('Start')
    setTimeout(()=>console.log('inside Timeout'),2000)
    console.log('End')
}

ValidateJSEngineExecution()

/*
So Output here is 
Start
End
Inside Timeout  --> after 2 seconds because time ,tide and jS waits for none - Namaste Javascript
*/

//First Class Functions

// Lets see function types now
//Type-1 Function Statments
function a(){
    console.log('a is called');
}

//TYPE-2 function expressions
var f=function(){
    console.log('b is called');
}

//Type-3 Anonymous functions
//same as above function without name we can assign to variable and use it 

//Type-4 Names Function expressions:
// Give Name to anonymous function 
var mutiply=function mutiply(a,b){
    return a*b;
}
/*
Now first class functions, the ability to use function as values and pass as arguments
or returned as variable from functions is called first class functions see example as below
*/

const greet= function(name){
    return "hello , "+ name +"!";
}
const farewell= function (name){
    return "GoodBye, "+name + "!";
}
//so here is first class function - passing functions as aruguments
function saySomething(messageFunction,name){
    return messageFunction(name)
}

console.log(saySomething(greet,'Santhosh'));
console.log(saySomething(farewell,'Santhosh'));

//FIRST CLASS FUNCTION - Return Functions from functions
function multiplier(factor){
    return function(number){
        return number*factor;
    }
}
const double=multiplier(2);
console.log(double(5));

//Arrow Functions in ES6
add =(a,b)=>{
   return a+b;
}

subtract=(a,b)=>{
   return a-b;
}

console.log("Arrow Function for addition",add(1,2));
console.log("Arrow Function for subtract ",subtract(70,2));

/*
IN arrow function there is no binding for this keyword
so in arrow function this keyword represents the object that defined the arrow function
*/

const person = {
    name: 'John',
    greet: function () {
      // Traditional function expression
      setTimeout(function () {
        console.log('Traditional Greet:', this.name); // 'this' is not person, but the global object (or undefined in strict mode)
      }, 1000);
  
      // Arrow function
      setTimeout(() => {
        console.log('Arrow Greet:', this.name); // 'this' is person so here you can see this is person and personname is jhon so it prints output
      }, 1000);
    },
  };
  
  person.greet();
  
//CALL BACK FUNCTIONS
/* Call back functions , passing a function into another function
   then passed function is callback function for example setTimeout(callback function,time) */
function generalFunction(CallBackFunction){
CallBackFunction();
}
generalFunction(function l(){console.log('Calling CallBackFunction')});

//HIGH ORDER FUNCTIONS
/*
A function which takes another function as arugument or returns a function as a result are high-order functions
for example MAP is a high order function
*/
const numbers=[1,2,3,4,5,6,7,8,9,10]
const doublenumbers=numbers.map(nums=>nums*2)
console.log("Map example with high order functions",doublenumbers);

//MAP,FILTER, REDUCE

//MAP - Always creates a new array and used when you wanted to transform the array elements like double elements or find factorial of numbers

const doublenumbers1=numbers.map(nums=>nums*2)
console.log("Map example OUTPUT",doublenumbers1);

//FILTER- Used to filter values in the array for example wants to find only even numbers in array
const evenNumbers=numbers.filter((nums=>nums%2==0))
console.log('Filter Example OUTPUT',evenNumbers);

//REDUCE- USed when take all values of array and wants to give single output from it example to find sum of all elements in array

const sumofArray=numbers.reduce((accumulator,currentValue)=>accumulator+currentValue,0);
console.log('REDUCE Example OUTPUT',sumofArray);

//SEASON-2

/*
Callbacks are functions passed as aruguments to other functuons and they are typically
used to handle asynchronous operations

Advantages:
1.Asychronous Operations:
Callbacks are very useful for handling asynchronous operation sin JS
2.closures
3.Flexible
4.simple
Disadvantages:
So here i wanna concentrate disadvantages because we are gonna talk about how we solve them
1.Callback HELL(Pyramid of DOOM):
Excessive nesting of callbacks can lead to situtaion known as callback hell making
code hard to read and maintain.
// Callback Hell Example in a Web Application

loadUserData(userId, function(userData) {
    // Step 1: Load user data
    loadAdditionalDetails(userData, function(details) {
        // Step 2: Load additional details
        updateUI(userData, details, function() {
            // Step 3: Update the UI
            // More steps...
        });
    });
});


2.Inversion of control:
Callbacks can lead to inversion of control , where the calling function must rely on the call back 
function to complete its operation

3.ERROR handling

*/

// PROMISE
/*
So here we have seen dis-advantages of callbacks now we will see how promise helps 
to solve them.

PROMISE: Promise is an object representation of the evenetual completion or failure of a
aynchronous operations , BY using promise we can solve disdvantages of callbacks.

3 STATES of PROMISE 
1.Pending (intial phase where the promise is stored and JS Engine proceeds to next lanes of code)
2.FULFILLED
3.REJECTED
*/

p1=new Promise(function(resolve,reject){
    setTimeout(()=> {
        resolve('Promise P1')
    },5000);
})

const p2=new Promise((resolve,reject)=>{
    setTimeout(()=> {
        resolve('Promise P2')
    },2000);
});

const p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('Promise P3 Failed')
    },1000)
})
p1.then(result=>{
    console.log('Success:',result);
})

p2.then(result=>{
    console.log('Success:',result)
})

p3.then(result=>{
    console.log('Success:',result)
})
.catch((result)=>console.log(result))

/*
so Output here is 
Promise P3 Failed
Success: Promise P2
Success: Promise P1

So here all the promises consider the settimeout as asynchronus call which takes time so when all the promises P1,P2,P3 are in timeout stack 
it checks for the execution of all promises and here P3 takes 1 second and P2 takes 2 seconds and P1 takes 5 seconds.
so here P3 is failed so it executes first and then P2 and then P1  based on TIME not the code structure 

so  output order is P3--P2---P1
*/

//TYPES OF PROMISES API's

//1.PROMISE.all([])
/*
Used when mutiple promises needed to be executed and takes arrat of promises and it will wait till all promises finish execution.
if any of the promises fails then it returns ERROR . 
*/

Promise.all([p1,p2]).then((results)=>{console.log('Promise.all results',results)});
// Output is AFTER 5 secoonds because P1 takes 5 seconds ['Promise P1','Promise P2']

Promise.all([p1,p2,p3]).then((results)=>{console.log('Promise.all results ERROR CASE',results)}).catch((result)=>console.log('Promise.all results ERROR CASE ',result)) 
// output is after 1 second Promise P3 Failed

//2.PROMISE.allsettled([])
/*
 Here same as promise.all but it waits till all the promise are settled . so it waits
 */

Promise.allSettled([p1,p2]).then((results)=>{console.log('Promise.allsettled results',results)});

// Output is AFTER 5 seconds because P1 takes 5 seconds [{status:'fulfilled',value:'Promise P1'},{status:'fulfilled',value:'Promise P2'}]

Promise.allSettled([p1,p2,p3]).then((results)=>{console.log('Promise.allsettled results ERROR CASE',results)}).catch((result)=>console.log('ERROR ',result)) 
// output is after 5 seconds then [{status:'fulfilled',value:'Promise P1'},{status:'fulfilled',value:'Promise P2'},{status:'rejected',value:'Promise P3 Failed'},]

//3.PROMISE.Race()
/*
Takes promises and but returns the promise which finish first and means returns who wins the race so it gives result of first setteleted promise,
if there is error then the error will be throwed for first settleted promise.
*/

Promise.race([p1,p2]).then((result)=>console.log('Promise.race RESULtS',result))
//OUTPUT: Promise.P2 because p2 takes only 2 seconds so it comes first
Promise.race([p1,p2,p3]).then((result)=>console.log('Promise.race RESULTS',result)).catch((result)=>console.error('PROMISE.RACE FAILED RESUlt',result))
//OUTPUT : PRomise P3 because it takes 1 second it returns error as we rejected P3

//4.PROMISE.ANY
/*
Takes promise and it waits till  when 1st promise is resolved (means first sucess promise), if all promises failed it gives ERROR
*/

Promise.any([p1,p2]).then((result)=>console.log('Promise.any RESULtS',result))
//OUTPUT: Promise.P2 because p2 takes only 2 seconds so it comes first
Promise.any([p1,p2,p3]).then((result)=>console.log('Promise.any RESULTS',result)).catch((result)=>console.error('PROMISE.any FAILED RESUlt',result))
//OUTPUT : PRomise P2 because it takes 2 second it returns error as we rejected P2
Promise.any([p3]).then((result)=>console.log('Promise.any RESULTS',result)).catch((result)=>console.error('PROMISE.any -case 2FAILED RESUlt',result))
//OUTPUT : PRomise P3  becuase its error if all promises throws error it gives us aggregated error

//ASYNC AWAIT:
/*
Async function will always return promise, if we just return a string it wraps it into promise and returns it.
->so async keyword is used to create asynchronous functions
->async await  are used to manage promises and so it pauses the promised .
->await can only be used in async functions so it makes JS engine wait till promise is resolved. 
*/

function somePromiseFunction(){
console.log('START')
const val=p1.then((result)=>console.log('Promise result for somePromiseFunction',result))
console.log('END of some Promise function')
}
somePromiseFunction();

/*
EXPECTED OUTPUT:
START
END of some Promise function
Promise result for some promise function is PROMISE P1
*/
async function myAsyncFunction(){
    console.log('START')
    const val=await p1.then((result)=>console.log('Promise result for ASYNCFUNCTION is',result))
    console.log('END of some ASYNC Promise function')
    }
myAsyncFunction(); 

/*
EXPECTED OUTPUT:
START
Promise result for ASYNCFUNCTION is PROMISE P1
END of some Promise function
*/


//THIS KEYWORD:

/**
 Firstly we have to know about global space , so what ever we declared outside of functions is global space so here this keyword 
 will have value of the global object 
 */
var test='this keyword'
console.log('THIS TESTING',this.test)

/*
THIS SUBSTITUTION: according to this substitution if value of this keyword is undefined or null this will be replaced with global object only in NON STRICT MODE

value of this keyword inside function is undefined in STRICT MODE

THIS KEYWORD behaves different inside arrow function so arrow functions don't have their own this, they take enclosing lexical contest this value 

//THIS KEYWORD IN DOM,
value will be refference to the html element

 */

function myFunction() {
    console.log(this);
  }
  
  myFunction(); // refers to the global object
  
  const myObject = {
    myMethod: myFunction,
  };
  
  myObject.myMethod(); // refers to myObject
  

  //THIS KEYWORD IN ARROR function examples

  // In the global context, this refers to the global object (e.g., window in a browser).
const globalArrowFunction = () => {
    console.log(this);
  };
  
  globalArrowFunction(); // Refers to the global object (e.g., window in a browser).

  //THIS KEYWORD in ARROW FUNCTION in an object model 

  const myObject2 = {
    data: "I am part of myObject2",
    regularFunction: function () {
      console.log(this.data);
    },
    arrowFunction: () => {
      console.log(this.data); // Inherits 'this' from the surrounding code, not from myObject2.
    },
  };
  
  myObject2.regularFunction(); // Outputs: "I am part of myObject2"
  myObject2.arrowFunction();   // Outputs: undefined (inherits 'this' from the surrounding code)
  

  //CLASSES AND OBJECTS

  /*
  Introduces in ES6
  Class iis used to create one or more objects 

  class will be used to create a structure or template , so we can create n number of objects

  */

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    greet() {
      console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
  }
  
  // Example usage of Person class
  const john = new Person("John", 25);
  const alice = new Person("Alice", 30);
  
  john.greet();   // Outputs: Hello, my name is John and I'm 25 years old.
  alice.greet();  // Outputs: Hello, my name is Alice and I'm 30 years old.
  
