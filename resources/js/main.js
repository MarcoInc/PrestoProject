let tracks=[{ 'name' : 'track 1', 'id':'pop' , 'artist': 'artista1' },
            { 'name' : 'track 2', 'id':'rap' , 'artist': 'artista2' },
            { 'name' : 'track 3', 'id':'rock' , 'artist': 'artista3' },
            { 'name' : 'track 4', 'genre':'classic' , 'artist': 'artista4' }
]



// counter

let firstnumber = document.querySelector ('#firstnumber')
let secondnumber = document.querySelector("#secondnumber");
let thirdnumber = document.querySelector("#thirdnumber");

let counter = 0;

function interval(element, finalnumber, frame) {
    let interval = setInterval(() => {
      if (counter < finalnumber) {
        counter++;
        element.innerHTML = counter;
      } else {
        clearInterval();
      }
    }, frame);
}

    interval(firstnumber, 1000, 1);
    interval(secondnumber, 5000, 1);
    interval(thirdnumber, 7000, 1);
// intersection observer
// let observer = new IntersectionObserver ((entries) => {
//     entries.forEach(entry =>{
//         if (entry.isIntersecting) {
//             interval(firstnumber, 1000, 1);
//             interval(secondnumber, 5000, 1);
//             interval(thirdnumber, 7000, 1);
//         }
//     })
// })


