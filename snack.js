

let canvas = document.querySelector('canvas');
let pen = canvas.getContext('2d')

let cellSize = 50;
let snackCell = [[0,0]]
let gameOver = false
let borderW = 1200
let borderH = 550
let direction = 'right'
let count =0;

    function draw(){


        if(gameOver)
       {
        pen.fillStyle ='pink'
        pen.fillText('Game Over',120,120)
        clearInterval(id)
        return;
       }
       
        pen.fillStyle='red'
        pen.clearRect(0,0,1200,550);

        for(let cell of snackCell){

        pen.fillStyle='red'
        pen.fillRect(cell[0],cell[1],cellSize,cellSize)
       
       pen.fillStyle='yellow'
       pen.fillRect(foodCell[0],foodCell[1],cellSize,cellSize)
       pen.font = '30px  san-sarif'
       pen.fillStyle='white'
       pen.fillText(`score${count}`,50,50)
     }
    }
   
    
     document.addEventListener('keydown',(e)=>{
        
        
        if(e.key==='ArrowDown')
        {
               direction ='down'
        }
        else if(e.key==='ArrowUp')
        {
               direction ='up'
        }
        else if(e.key==='ArrowLeft')
        {
               direction ='left'
        }
        else{
             direction = 'right'
        }
     })

     let generateFoodS = function(){

        return([
            Math.round(Math.random()*(borderW-cellSize)/50)*50,
            Math.round(Math.random()*(borderH-cellSize)/50)*50
        ])
    }

    let  foodCell= generateFoodS();  


    function update(){

         let headX = snackCell[snackCell.length-1][0]
         let headY = snackCell[snackCell.length-1][1]

         let newX 
         let newY 

         if(direction==='right')
         {
            newX  = headX+cellSize
            newY = headY
            
            if(newX===borderW  || checkMate(newX,newY) )
            {
                gameOver=true
            }
         }
         else if(direction==='left')
         {
            newX  = headX-cellSize
            newY = headY

            if(newX<0   || checkMate(newX,newY))
            {
                gameOver=true
            }

         }
         else if(direction==='up')
         { 
            newX = headX
            newY = headY-cellSize 

            if(newY<0 || checkMate(newX,newY))
            {
                gameOver=true
            }

         }
         else{
            newX = headX
            newY = headY+cellSize

            if(newY===borderH || checkMate(newX,newY) )
            {
                gameOver=true
            }

         }

         snackCell.push([newX,newY])
         

         if(newX===foodCell[0] && newY===foodCell[1])
         {
            foodCell = generateFoodS();
            count++;
         }
         else{
            snackCell.shift()
         }

    }
     
    let id = setInterval(()=>{
           
        draw();
        update();

    },60)


      function checkMate(newX,newY){

        for(let item of snackCell)
        {
            if(item[0]===newX && item[1]===newY)
            {
                return true
            }
        }
      }

    

