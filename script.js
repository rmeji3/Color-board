let isMouseDown = false;
var colorToChange = 'rgb(255, 0, 0)'
var pressedBrush = true;
var pressedEraser = false;

document.addEventListener('mousedown', function() {
    isMouseDown = true;
  });
  
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });
  
  document.addEventListener('touchstart', function(e) {
    isTouching = true;
    if (e.target.classList.contains('color-cell')) {
      applyColor(e.target);
    }
  }, { passive: false });
  
  document.addEventListener('touchend', function() {
    isTouching = false;
  });
  
  document.addEventListener('touchcancel', function() {
    isTouching = false;
  });
  
  function attachEventListenersToCells() {
      // Existing mouse event handling
      document.querySelectorAll('.color-cell').forEach(function(cell) {
          cell.addEventListener('mouseenter', function() {
              if (isMouseDown) {
                  applyColor(this);
              }
          });
          cell.addEventListener('click', function() {
              applyColor(this);
          });
          cell.addEventListener('dragstart', function(e) {
              e.preventDefault(); 
          });
  
          // New touchmove event handling
          cell.addEventListener('touchmove', function(e) {
              e.preventDefault(); 
              if (isTouching) {

                  let touch = e.touches[0];
                  let target = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (target && target.classList.contains('color-cell')) {
                      applyColor(target);
                  }
              }
          }, { passive: false });
      });
  }
  
  function applyColor(cell) {
      if (pressedBrush) {
          cell.style.backgroundColor = colorToChange;
      } else if (pressedEraser) {
          cell.style.backgroundColor = 'white';
      }
  }
  
  attachEventListenersToCells();

var colorWheel = new iro.ColorPicker("#colorWheel", {
    width: 100,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "black",
});
    const screenWidth = window.innerWidth;
    let colorWheelSize;
    if (screenWidth <= 500) { 
        colorWheelSize = screenWidth - 300; 
    } else {
        colorWheelSize = 120; 
    }
    colorWheel.resize(colorWheelSize);
    colorWheel.on('color:change', function(color) {
    colorToChange = color.hexString ;
});
  


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