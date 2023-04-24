fetch('../obj/musica.json')
.then(response=> response.json())
.then(data=>{
  //data è un array di oggetti
  console.log(data);


})