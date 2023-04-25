fetch('../obj/musica.json')
.then(response=> response.json())
.then(data=>{
  //data è un array di oggetti
  console.log(data);

  let radioGenere=document.querySelector('#radioGenere');
  let radioArtista=document.querySelector('#radioArtista');
  let radioAnno=document.querySelector('#radioAnno');


  //genera radio button con generi univoci
  function setGenere(){
    let generi=[]; //generi univoci

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!generi.includes(element.genre)){
        generi.push(element.genre)
      }
    });

    generi.sort((a, b) => a.localeCompare(b)); //ordina i generi per ordine alfabetico

    //conta quanti ce ne stanno per ogni genere
    generi.forEach(genere=>{
      let count=0;
      data.forEach(element => {
        if(genere==element.genre){
          count++;
        }
      });
      
      //popolo il contenitore Genere
      let div=document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML=` 
          <input class="form-check-input" type="radio" name="genere" id="${genere}">
            <label class="form-check-label" for=${genere}>
        ${genere} (${count})
        </label>
      `;
      radioGenere.appendChild(div);
    })
  }
  setGenere(); //eseguo la funzione precedente

  //genera radio button con artisti univoci
  function setArtista(){
    let artisti=[]; //artisti univoci

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!artisti.includes(element.artist)){
        artisti.push(element.artist)
      }
    });

    artisti.sort((a, b) => a.localeCompare(b)); //ordina gli artisti per ordine alfabetico

    //conta quanti ce ne stanno per ogni categoria
    artisti.forEach(artista=>{
      let count=0;
      data.forEach(element => {
        if(artista==element.artist){
          count++;
        }
      });
      
      //popolo il contenitore Artista
      let div=document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML=` 
          <input class="form-check-input" type="radio" name="artista" id="${artista}">
            <label class="form-check-label" for=${artista}>
        ${artista} (${count})
        </label>
      `;
      radioArtista.appendChild(div);
    })
  }
  setArtista(); //eseguo la funzione precedente

  //genera radio button con anni univoci
  function setAnno(){
    let anni=[]; //anni univoci

    //popolo l'array di generi unici
    data.forEach(element => {
      if(!anni.includes(element.year)){
        anni.push(element.year)
      }
    });

    anni.sort((a,b) => b-a); //ordine scescente

    //conta quanti ce ne stanno per ogni categoria
    anni.forEach(anno=>{
      let count=0;
      data.forEach(element => {
        if(anno==element.year){
          count++;
        }
      });
      
      //popolo il contenitore Anno
      let div=document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML=` 
          <input class="form-check-input" type="radio" name="anno" id="${anno}">
            <label class="form-check-label" for=${anno}>
        ${anno} (${count})
        </label>
      `;
      radioAnno.appendChild(div);
    })
  }
  setAnno(); //eseguo la funzione precedente



})
