class Terminal {

    constructor() {
        var text2 = document.createElement('div');
        document.body.appendChild(text2);

        text2.style.position = 'absolute';
        text2.style.width = 50;
        text2.style.fontSize= "small"
        text2.style.height = 50;
        // text2.style.backgroundColor = "blue";
        text2.innerHTML = "Type";
        let position=200;
        text2.style.top =  `${position}px`;
        text2.style.left = 200 + 'px';

    
    }

    createText(){
        
    }
}