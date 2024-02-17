let isMouseDown = false; // Track mouse state
var colorToChange = 'rgb(255, 0, 0)'
// Set isMouseDown to true when mouse is pressed
document.addEventListener('mousedown', function() {
  isMouseDown = true;
});

// Set isMouseDown to false when mouse is released
document.addEventListener('mouseup', function() {
  isMouseDown = false;
});

function attachEventListenersToCells() {
    // Add event listener to each color-cell for mouseenter
    document.querySelectorAll('.color-cell').forEach(function(cell) {
      cell.addEventListener('mouseenter', function() {
        if (isMouseDown && pressedBrush) {
          this.style.backgroundColor = colorToChange;
        } else if (isMouseDown && pressedEraser) {
          this.style.backgroundColor = 'white';
        }
        
      });
      cell.addEventListener('dragstart', function(e) {
        e.preventDefault(); // Prevent the drag start
      });
    });
  
    // Add event listener to each color-cell for click
    document.querySelectorAll('.color-cell').forEach(function(cell) {
        cell.addEventListener('click', function() {
        if (pressedBrush) {
            this.style.backgroundColor = colorToChange;
        } else if (pressedEraser) {
            this.style.backgroundColor = 'white';
        }
        });
    });
}
  

var colorWheel = new iro.ColorPicker("#colorWheel", {
    // ColorPicker options
    width: 100,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "black",
});
    const screenWidth = window.innerWidth;
    let colorWheelSize;
    if (screenWidth <= 500) { // You can adjust this value based on your needs
        colorWheelSize = screenWidth - 300; // Subtract some pixels for padding/margin
    } else {
        colorWheelSize = 120; // Default size for non-mobile devices
    }
    colorWheel.resize(colorWheelSize);
    colorWheel.on('color:change', function(color) {
    colorToChange = color.hexString ;
});
  
  var pressedBrush = true;
  var pressedEraser = false;

  document.getElementById('brush').addEventListener('click',function() {
    if(pressedEraser)
    {
        this.style.backgroundColor = colorToChange;
        document.getElementById('eraser').style.backgroundColor = 'rgb(184, 184, 184)';
        pressedBrush = true;
        pressedEraser = false;
    }

  
  });
  document.getElementById('eraser').addEventListener('click',function() {
    if(pressedBrush)
    {
        this.style.backgroundColor = colorToChange;
        document.getElementById('brush').style.backgroundColor = 'rgb(184, 184, 184)';
        pressedBrush = false;
        pressedEraser = true;
    }
  });

  attachEventListenersToCells();
  var buttomSizeName = '16x16';

  document.querySelectorAll('.sizes div').forEach(function(div) {
    div.addEventListener('click', function() {
        this.style.backgroundColor = 'red';
      const index = this.textContent.indexOf('x');
      var size = this.textContent.substring(0, index);
      buttomSizeName = this.textContent;
      console.log(size);
      center = document.querySelector('.center');
      Array.from(center.querySelectorAll('div')).forEach(div => div.remove());
      for(var i = 0; i < Math.pow(size, 2); i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'color-cell';
        center.appendChild(newDiv);
      }
      center.style.gridTemplateColumns =  `repeat(${size}, auto)`;
      center.style.gridTemplateRows =  `repeat(${size}, auto)`;
  
      const divsNodeList = document.querySelectorAll('.sizes div');

        // Convert NodeList to an array
        const divsArray = Array.from(divsNodeList);
      attachEventListenersToCells();
      divsArray.forEach(function(element){
        if(buttomSizeName != element.textContent){
            element.style.backgroundColor = "rgb(168, 168, 168)";
        }
      });
    });
});
document.getElementById('clear-button').addEventListener('click', function(){
    document.querySelectorAll('.color-cell').forEach(function(cell) {
       cell.style.backgroundColor = 'white';
    });
});