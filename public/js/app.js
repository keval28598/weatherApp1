// const { response } = require("express");

console.log('client side js');

 
const message1 = document.querySelector('p');
const message2 = document.querySelector('p').nextElementSibling
const form = document.querySelector('form');
const input = document.querySelector('input');

console.log(message1,message2);

form.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log(input.value);

  message1.textContent = 'Loading';
  message2.textContent = '';

    fetch(`/weather?address=${input.value}`).then((response)=>{
        //console.log(response.json());
      response.json().then((data)=>{
          if(data.errorMessage){
              console.log(data.error);
              message1.textContent = data.errorMessage;
          }
          else{
              console.log(data);
              message1.textContent = data.location;
              message2.textContent = data.forecast;
            }
      })
   
  })

})