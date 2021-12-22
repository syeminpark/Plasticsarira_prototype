let element = document.getElementById('world')
let hammer = new Hammer(element);
hammer.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});

hammer.on("panleft panright panup pandown tap press", function (e) {
    document.getElementById('world').innerHTML = e.type


})

