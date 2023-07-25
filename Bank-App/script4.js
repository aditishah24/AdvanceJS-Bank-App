'use strict';
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
      "2023-11-18T21:31:17.178Z",
      "2023-12-23T07:42:02.383Z",
      "2023-01-28T09:15:04.904Z",
      "2023-04-01T10:17:24.185Z",
      "2023-05-08T14:11:59.604Z",
      "2023-07-17T17:01:17.194Z",
      "2023-07-18T23:36:17.929Z",
      "2023-07-20T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "en-US",
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
      "2023-11-01T13:15:33.035Z",
      "2023-11-30T09:48:16.867Z",
      "2023-12-25T06:04:23.907Z",
      "2023-01-25T14:18:46.235Z",
      "2023-02-05T16:33:06.386Z",
      "2023-04-10T14:43:26.374Z",
      "2023-06-25T18:49:59.371Z",
      "2023-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,

    movementsDates: [
      "2023-11-18T21:31:17.178Z",
      "2023-12-23T07:42:02.383Z",
      "2023-01-28T09:15:04.904Z",
      "2023-04-01T10:17:24.185Z",
      "2023-05-08T14:11:59.604Z",
      "2023-07-26T17:01:17.194Z",
      "2023-07-28T23:36:17.929Z",
      "2023-08-01T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "en-US",


  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,

    movementsDates: [
      "2023-11-01T13:15:33.035Z",
      "2023-11-30T09:48:16.867Z",
      "2023-12-25T06:04:23.907Z",
      "2023-01-25T14:18:46.235Z",
      "2023-02-05T16:33:06.386Z",
      "2023-04-10T14:43:26.374Z",
      "2023-06-25T18:49:59.371Z",
      "2023-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  };
  
  const accounts = [account1, account2, account3, account4];
  
  /////////////////////////////////////////////////
  // Elements
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');

  const formatMovementDate = function (date,locale){
        // Dates to Numbers 
        const calcDaysPassed = (date1,date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

        const daysPassed = calcDaysPassed(new Date(),date);
        console.log(daysPassed);

        if (daysPassed === 0) return 'Today';
        if (daysPassed === 1) return 'Yesterday';
        if (daysPassed <= 7) return `${daysPassed} days ago`;
        
        //   const day = `${date.getDate()}`.padStart(2,0);
        //   const month = `${date.getMonth() + 1}`.padStart(2,0);
        //   const year = date.getFullYear();
        //   return `${day}/${month}/${year}`;

        //Internationalize API
        return new Intl.DateTimeFormat(locale).format(date);
        };
      
        const formatCurr = function(value,locale,currency){
          return new Intl.NumberFormat(
            locale, {
              style: 'currency',
              currency: currency,
            }).format(value);
        }

 
  const displayMovements = function (acc, sort = false) {
    //Empty every element and then adding new to the list
    containerMovements.innerHTML = "";

    // const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
    const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
    // Now new elements as per account 1 will be added 
    movs.forEach(function (mov, i) {
      const type = mov > 0 ? "deposit" : "withdrawal";
  
      const date = new Date(acc.movementsDates[i]);
      const displayDate = formatMovementDate(date, acc.locale);
        
         // Using Internationalization in DateFormat 
        const formattedMovement = formatCurr(mov,acc.locale,acc.currency);
        

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;


        // afterbegin and beforeend method are used to list the elements in order
        // either straight or in reverse order. 
        containerMovements.insertAdjacentHTML('afterbegin', html);
    }
    );
 };
 
const calcDisplayBalance = function (acc) {
acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//Internationalization NumberFormat
labelBalance.textContent = formatCurr(acc.balance,acc.locale,acc.currency);
};


//Chaining methods
const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov => mov >0)
  .reduce((acc,mov) => acc + mov,0);
  labelSumIn.textContent = formatCurr(incomes,acc.locale,acc.currency);
  

const out = acc.movements
  .filter(mov => mov <0)
  .reduce((acc,mov) => acc + mov,0);
  labelSumOut.textContent = formatCurr(Math.abs(out),acc.locale,acc.currency);

  const interest = acc.movements
  .filter(mov => mov >0)
  .map(deposit => deposit * acc.interestRate/100)
  //condition for interest
  .filter((int,i,arr) => {
    console.log(arr);
    return int >= 1;
  })
  .reduce((acc,int) => acc + int,0);
  labelSumInterest.textContent = formatCurr(interest,acc.locale,acc.currency);
};

//Filter
// const calcPrintBalance = function(movements){
//   const balance = movements.reduce((acc,mov) => acc + mov,0);
//   labelBalance.textContent=`${balance} € `; 
// };

  

//Lec 10
const createUsernames = function(accs){
  accs.forEach(function(acc){
  acc.username  = acc.owner
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('');
  });
};
createUsernames(accounts);

//Refactered so that it can be reused
const updateUI = function(acc){
//Display movements
displayMovements(acc);
//Display balance
calcDisplayBalance(acc);
//Display summary
calcDisplaySummary(acc);
};
// console.log(accounts);

//Set Time Interval
const startLogOutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2,0);
    const sec = String(time % 60).padStart(2,0);
     //In each call,print the remaining time
      labelTimer .textContent = `${min}:${sec}`;
     
    
    //When reach at 0 sec, stop timer and log out user
    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent='Log-in to get Started'
      containerApp.style.opacity = 0;
    };
    time--;
  }
  //Set time to 5 mins
    let time = 300;

  //call timer every second
  tick();
    const timer = setInterval(tick, 1000);
    return timer;

  
};

//Event Handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Expermenting with API 


btnLogin.addEventListener('click',function(e)
{
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  //optimal chainning
  if(currentAccount?.pin === Number(inputLoginPin.value));
  {
    //Display Ui and message 
    labelWelcome.textContent=`Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    const now = new Date();
    
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    // for month - numeric,long,2-digit 
    month: 'long',
    year: 'numeric',
    // weekday - ShadowRoot, narrow 
    weekday: 'long',
    };
// const locale = navigator.language;


labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);
    // const day = `${now.getDate()}`.padStart(2,0);
    // const month = `${now.getMonth() + 1}`.padStart(2,0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2,0);
    // const minutes = `${now.getMinutes()}`.padStart(2,0);
    // labelDate.textContent =`${day}/${month}/${year}, ${hour}:${minutes}`;

    //clear the username and pin onces logged in
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Calling setInterval Function here
    //Timer
    if (timer) clearInterval (timer);
    timer = startLogOutTimer();
    //updateUI
    updateUI(currentAccount);

   
  }
});

  btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  //clean transfer values
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && 
    receiverAcc &&
    currentAccount.balance >= amount 
    && receiverAcc?.username !== currentAccount.username)
    {
      //Doing Transfer and updating
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      //updateUI
      updateUI(currentAccount);
       //Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  // const amount = Number(inputLoanAmount.value);
  const amount = Math.floor(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1))
  {
    //Add movement
    setTimeout (function() {
    currentAccount.movements.push(amount);

    // Add Loan date
    currentAccount.movementsDates.push(new Date().toISOString());


    //update ui
    updateUI(currentAccount);
     //Reset Timer
     clearInterval(timer);
     timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click',function(e){
e.preventDefault();


  if(inputCloseUsername.value === currentAccount.username
  && Number(inputClosePin.value) === currentAccount.pin)
  {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    //delete acc
    accounts.splice(index,1);
    //hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Map Method
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd );

// console.log(movements);
// console.log(movementsUSD);

// const movementsDescriptions = movements.map((mov,i) => 

//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
// );
// console.log(movementsDescriptions);

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0, 2, 4, 6
//     if (i % 2 === 0) row.style.backgroundColor = '#ff585f';
//     // 0, 3, 6, 9
//     if (i % 2 === 1) row.style.backgroundColor = '#39b385';
//   });
// });