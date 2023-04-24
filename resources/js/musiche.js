let tracks=[{ 'name' : 'track 1', 'id':'pop' , 'artist': 'artista1' },
            { 'name' : 'track 2', 'id':'rap' , 'artist': 'artista2' },
            { 'name' : 'track 3', 'id':'rock' , 'artist': 'artista3' },
            { 'name' : 'track 4', 'genre':'classic' , 'artist': 'artista4' }
]



// counter

let firstnumber = document.querySelector ('#firstnumber')
let secondnumber = document.querySelector("#secondnumber");
let thirdnumber = document.querySelector("#thirdnumber");


function interval(element, finalnumber, frame) {
    let counter = 0; //va messo dentro altrimenti il contatore è unico per tutti
    let interval = setInterval(() => {
      if (counter < finalnumber) {
        counter++;
        element.innerHTML = counter;
      } else {
        clearInterval(interval);
      }
    }, frame);
}

// intersection observer
let observer = new IntersectionObserver ((entries) => {
    entries.forEach(entry =>{
        if (entry.isIntersecting) {
            interval(firstnumber, 10000, 500);
            interval(secondnumber, 10000, 90);
            interval(thirdnumber, 10000, 1000); //1000 -> 1 secondo
        }
    })
})
observer.observe(firstnumber)

