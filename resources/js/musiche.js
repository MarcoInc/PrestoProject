fetch('../obj/musica.json')
.then(response=> response.json())
.then(data=>{
  //data è un array di oggetti
  console.log(data);

  let radioGenere=document.querySelector('#radioGenere');
  let radioArtista=document.querySelector('#radioArtista');
  let radioAnno=document.querySelector('#radioAnno');



  function setGenere(){
    let generi=[];

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!generi.includes(element.genre)){
        generi.push(element.genre)
      }
    });

    //conta quanti ce ne stanno per ogni categoria
    generi.forEach(genere=>{
      let count=0;
      data.forEach(element => {
        if(genere==element.genre){
          count++;
        }
      });
      
      let div=document.createElement('div');

      div.classList.add('form-check');
      div.innerHTML=` 
        <div class="form-check">
          <input class="form-check-input" type="radio" name="genere" id="${genere}">
            <label class="form-check-label" for=${genere}>
        ${genere} (${count})
        </label>
      </div>
      `;
      radioGenere.appendChild(div);
    })
  }
  setGenere();

  function setArtista(){
    let artisti=[];

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!artisti.includes(element.artist)){
        artisti.push(element.artist)
      }
    });

    //conta quanti ce ne stanno per ogni categoria
    artisti.forEach(artista=>{
      let count=0;
      data.forEach(element => {
        if(artista==element.artist){
          count++;
        }
      });
      
      let div=document.createElement('div');

      div.classList.add('form-check');
      div.innerHTML=` 
        <div class="form-check">
          <input class="form-check-input" type="radio" name="artista" id="${artista}">
            <label class="form-check-label" for=${artista}>
        ${artista} (${count})
        </label>
      </div>
      `;
      radioArtista.appendChild(div);
    })
  }
  setArtista();

  function setAnno(){
    let anni=[];

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!anni.includes(element.year)){
        anni.push(element.year)
      }
    });

    //conta quanti ce ne stanno per ogni categoria
    anni.forEach(anno=>{
      let count=0;
      data.forEach(element => {
        if(anno==element.year){
          count++;
        }
      });
      
      let div=document.createElement('div');

      div.classList.add('form-check');
      div.innerHTML=` 
        <div class="form-check">
          <input class="form-check-input" type="radio" name="anno" id="${anno}">
            <label class="form-check-label" for=${anno}>
        ${anno} (${count})
        </label>
      </div>
      `;
      radioAnno.appendChild(div);
    })
  }
  setAnno();



})
