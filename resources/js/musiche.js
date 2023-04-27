fetch('../obj/musica.json')
.then(response=> response.json())
.then(data=>{
  //data è un array di oggetti
  console.log(data);

  let radioGenere=document.querySelector('#radioGenere');
  let radioArtista=document.querySelector('#radioArtista');
  let radioAnno=document.querySelector('#radioAnno');
  let containerCards=document.querySelector('#containerCards');
  let btnReset = document.querySelector(`.btn-reset`);




  //-----------------RADIO BUTTON--------------------//
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
          <input class="form-check-input genere" type="radio" name="genere" id="${genere}">
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
          <input class="form-check-input artista" type="radio" name="artista" id="${artista}">
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
          <input class="form-check-input anno" type="radio" name="anno" id="${anno}">
            <label class="form-check-label" for=${anno}>
        ${anno} (${count})
        </label>
      `;
      radioAnno.appendChild(div);
    })
  }
  setAnno(); //eseguo la funzione precedente

  //-----------CARD GENERATOR---------------//

  function createCards(array) {
    // Ripulire il contenuto della sezione
    containerCards.innerHTML = '';
    array.forEach(musica => {
        let div = document.createElement('div');
        div.classList.add('card', 'mb-2', 'mx-2');
        div.style.width='18rem';
        div.innerHTML = `
          <img src="${musica.cover}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${musica.title}</h5>
            <p class="card-text">${musica.artist}</p>
            <p class="card-title">${musica.year}</p>
            <p class="card-title">${musica.price}€</p>
            <p class="card-title">(${musica.genre})</p>
            <a href="#" class="btn riproduci">play</a>
          </div>
        `;
        containerCards.appendChild(div);
    })
}
// Invocare la funzione createCards per creare gli Annunci
createCards(data);
// Pulsante che reinvoca la funzione createcards con data per "ripulire i filtri"!
btnReset.onclick = function (){
  createCards(data);
    }
  

//------------RANGE MANAGER-------------//
  let inputRange=document.querySelector('#inputRange'); //slider range
  let maxValue=document.querySelector('#maxValue'); //valore max
  //trova il prezzo maggiore
  function rangeMax(){
    let prices = data.map(musica => Number(musica.price)); // crea un array con i soli price di data
    let maxPrice = Math.max(...prices); //trova il max in un array di numeri con lo spread operator
    console.log(maxPrice);
    inputRange.max = maxPrice; //accede al parametro max del range
    inputRange.value = maxPrice; //accede al parametro min del range
    maxValue.innerHTML = `${maxPrice}&euro;`//popolo il container
  }
  rangeMax();


  //FILTRO GLOBALE  
  //--------------FILTRO GENERE------------------//
  let radioGenreInput = document.querySelectorAll('.genere'); //prendo tutti radio genere
  function filterByGenere(array) {
      let arrayFromNode=Array.from(radioGenreInput);  //ottengo un array di radio genere
      let checked=arrayFromNode.find(element=> element.checked==true); //seleziono solo quelli checked
      let genereSelected = checked.id; //contiene la categoria selezionata <- id
      //console.log(genereSelected);
      if (genereSelected == 'AllGenres') {
        return array;
      } 
      else {
        let filtered = array.filter(musica => musica.genre == genereSelected);
        //console.log(filtered);
        return filtered;
      }
  }
  //--------------FILTRO ARTISTA------------------//
  let radioArtistInput = document.querySelectorAll('.artista'); //prendo tutti radio artista
  function filterByArtista(array) {
    let arrayFromNode=Array.from(radioArtistInput);  //ottengo un array di radio artusta
    let checked=arrayFromNode.find(element=> element.checked==true); //seleziono solo quelli checked
    let artistaSelected = checked.id; //contiene artista selezionato <- id

    if (artistaSelected == 'AllArtists') {
      return array;
    } 
    else {
      let filtered = array.filter(musica => musica.artist == artistaSelected);
      //console.log(filtered);
      return filtered;
    }
  }

      //--------------FILTRO ANNO------------------//
  let radioYearInput = document.querySelectorAll('.anno'); //prendo tutti radio anno
  function filterByAnno(array) {
    let arrayFromNode=Array.from(radioYearInput);  //ottengo un array di radio genere

    let checked=arrayFromNode.find(element=> element.checked==true); //seleziono solo quelli checked
    let annoSelected = checked.id; //contiene l'anno selezionato <- id
    if (annoSelected == 'AllYears') {
      return array;
    } 
    else {
      let filtered = array.filter(musica => musica.year == annoSelected);
      //console.log(filtered);
      return filtered;
    }
  }

  //--------------------FILTRO PREZZO----------------//
  function filterByPrice(array) {
    let filtered = array.filter(element => Number(element.price) <= Number(inputRange.value));
    return filtered;
  }

  //--------------FILTRO FORM------------------------//
  function filterByWord(array) {
    let filtered =  array.filter(element => element.title.toLowerCase().includes(form.value.toLowerCase()));
    return filtered;
  }

//--------------FILTRO GLOBALE-----------------//
  function globalFilter() {
    let resultGenere=filterByGenere(data);
    let resultArtista=filterByArtista(resultGenere);
    let resultAnno=filterByAnno(resultArtista);
    //console.log(resultAnno);
    let resultPrezzo=filterByPrice(resultAnno);
    let resultParola=filterByWord(resultPrezzo);
    // Se ci sono dei risultati
//  se mancano risultati
    let messaggio = document.querySelector('#messaggio');
    console.log(messaggio);
    if (resultParola.length > 0) {}  // se trova qualcosa non fa niente 
    else { // NESSUN ANNUNCIO DISPONIBILE
      containerCards.innerHTML = '';
      let div = document.createElement('div');

      div.classList.add(`alert`, `alert-primary`,`col-12`,`align-self-center`,`d-flex`,`justify-content-center`);
      div.innerHTML = `ERROR 404 NIGGA NOT FOUND`;
      containerCards.appendChild(div);
    }
  }

  let allRadio=document.querySelectorAll('.form-check-input');
  let range=document.querySelector('#inputRange');
  let form=document.querySelector('#searchWord');

  allRadio.forEach(radio=> {
    radio.addEventListener('click', ()=>{
      globalFilter();
    })
  })

  range.addEventListener('input', () => {
     globalFilter();
  })

  form.addEventListener('input', () => {
    globalFilter();
  })

})

//let buttonReset=?










//FILTRI SINGOLI
/*
//--------------FILTRO GENERE------------------//
let radioGenreInput = document.querySelectorAll('.genere');
function filterByGenere(genre) {
    let filtered = data.filter(musica => musica.genre == genre);
    createCards(filtered);
}

radioGenreInput.forEach(radioButton => {
    radioButton.addEventListener('click', () => {
        // console.log(radioButton.id);
        let genereSelected = radioButton.id;
        // Selezionato Tutte le Categorie
        if (genereSelected == 'AllGenres') {
            // Invocare la funzione createCards
            createCards(data);
        } 
        else {
          filterByGenere(genereSelected);
        }
    })
  })

  //--------------FILTRO ARTISTA------------------//
let radioArtistInput = document.querySelectorAll('.artista');
function filterByArtista(artist) {
    let filtered = data.filter(musica => musica.artist == artist);
    createCards(filtered);
  }

  radioArtistInput.forEach(radioButton => {
      radioButton.addEventListener('click', () => {
          // console.log(radioButton.id);
          let artistSelected = radioButton.id;
          // Selezionato Tutte le Categorie
          if (artistSelected == 'AllArtists') {
              // Invocare la funzione createCards 
              createCards(data);
            } else {
              filterByArtista(artistSelected);
          }
      })
  })


    //--------------FILTRO ANNO------------------//
let radioYearInput = document.querySelectorAll('.anno');
function filterByAnno(year) {
    let filtered = data.filter(musica => musica.year == year);
    createCards(filtered);
  }

  radioYearInput.forEach(radioButton => {
      radioButton.addEventListener('click', () => {
          // console.log(radioButton.id);
          let yearSelected = radioButton.id;
          // Selezionato Tutte le Categorie
          if (yearSelected == 'AllYears') {
              // Invocare la funzione createCards 
              createCards(data);
          } else {
            filterByAnno(yearSelected);
          }
      })
  })

    //--------------------FILTRO PREZZO----------------//
//filtra per prezzo
  function filterByPrice(number) {
    let filtered = data.filter(annuncio => Number(annuncio.price) <= Number(number));
    createCards(filtered);
  }

  let numberPrice=document.querySelector('#valueSelected'); //valore selezionato che sta nel mezzo

  //cattura il value del range ad ogni modifica del value
  inputRange.addEventListener('input', () => {
    //console.log(inputRange.value); 
    filterByPrice(inputRange.value);
    numberPrice.innerHTML = `${inputRange.value}&euro;`
  })

    //contiene la stringa nel form
  let searchWord = document.querySelector('#searchWord');


  //--------------FILTRO FORM------------------------//
  //aggiorna il valore del form ad ogni input
  searchWord.addEventListener('input', () => {
      //console.log( searchWord.value );
      filterByWord(searchWord.value);
  })
  //ricerca la parola inserita
  function filterByWord(word) {
    let filtered;
    //se esiste la parola cercata mettila in filtered
    filtered = data.filter(element => element.title.toLowerCase().includes(word.toLowerCase()));
     createCards(filtered);
  }

})
*/