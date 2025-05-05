let rowNum = 0;
let cellNum = 0;
let setStartPointRow,setStartPointCell;
let setTargetPointRow,setTargetPointCell;

let setStarte = false;
let setStarteCondition = false;
let setTargetCondition = false;
let setTargete = false;

let obstacles = {
}
function createButtons(){
  
  document.getElementById('slots-container').innerHTML += `<button id="R${rowNum}C${cellNum}" class="terrain" onclick="imbored();setStart(${rowNum},${cellNum});"></button>`;
  cellNum ++;
  if(cellNum > 9){
    cellNum = 0;
    rowNum ++;
  }
}
let createCell = setInterval(()=>{
  if(rowNum <= 9 && cellNum <= 10){
    createButtons();
  }else{
    setStarteCondition = true;
    clearInterval(createCell);
  }
},5)

let createCell2;

function imbored(){
  rowNum = 0;
  cellNum = 0;
  document.getElementById('slots-container').innerHTML = '';
}

function setStart(row,cell){
  
  if(!setStarteCondition){return}
  if(row !== undefined && cell !== undefined){
    setStartPointRow = row;
    setStartPointCell = cell;
  }
  
  setStarte = true;
  document.getElementById('slots-container').innerHTML += `
    <button id="R${rowNum}C${cellNum}" class="terrain" onclick="imbored();setTarget(${rowNum},${cellNum}); "></button>
  `
  if(rowNum === setStartPointRow && cellNum === setStartPointCell){
    document.getElementById(`R${rowNum}C${cellNum}`).removeAttribute("onclick")
    document.getElementById(`R${rowNum}C${cellNum}`).style.backgroundColor = 'green';
    console.log(`Operator go vote is set TRUE we are GO for CATCH at R${rowNum}C${cellNum}.`)
  }
   cellNum ++;
  if(cellNum > 9){
    cellNum = 0;
    rowNum ++;
  }
}

createCell2 = setInterval(()=>{
  if(rowNum <= 9 && cellNum <= 10 && setStarte){
    setStart();
  }else if(setStarte){
    document.getElementById('setstart').innerText = `click on a grey slot to choose target.`
    clearInterval(createCell2);
    setTargetCondition = true;
  }
},5)

function setTarget(row,cell){
  if(!setTargetCondition){return}
  if(row !== undefined && cell !== undefined){
    setTargetPointRow = row;
    setTargetPointCell = cell;
    console.log(`Booster Offshore Divert`)
  }
  
  setTargete = true;
  document.getElementById('slots-container').innerHTML += `
    <button id="R${rowNum}C${cellNum}" class="terrain" onclick="setObstacle(${rowNum},${cellNum})"></button>
  `
  if(rowNum === setStartPointRow && cellNum === setStartPointCell){
    document.getElementById(`R${rowNum}C${cellNum}`).style.backgroundColor = 'green';
    document.getElementById(`R${rowNum}C${cellNum}`).removeAttribute("onclick");
    console.log(`Operator go vote is set TRUE we are GO for CATCH at R${rowNum}C${cellNum}.`)
  }

  if(rowNum === setTargetPointRow && cellNum === setTargetPointCell){
    document.getElementById(`R${rowNum}C${cellNum}`).removeAttribute("onclick");
    document.getElementById(`R${rowNum}C${cellNum}`).style.backgroundColor = 'blue';
    console.log(`Flight directors GO for SHIP return to LAUNCH SITE at R${rowNum}C${cellNum}.`)
  }
   cellNum ++;
  if(cellNum > 9){
    cellNum = 0;
    rowNum ++;
  }
  if(!document.getElementById('pathfind'))
  document.body.innerHTML += `<button id="pathfind" onclick="pathfind(${setStartPointRow},${setStartPointCell})">Start Pathfinding</button>`
}

let createCell3 = setInterval(()=>{
  if(rowNum <= 9 && cellNum <= 10 && setTargete){
    setTarget();
  }else if(setTargete){
    document.getElementById('setstart').innerText = `select gray squares to be obstacles.`
    clearInterval(createCell3);
    
  }
},5)

function setObstacle(row,cell){
  document.getElementById(`R${row}C${cell}`).removeAttribute("onclick");
  document.getElementById(`R${row}C${cell}`).setAttribute("onclick",`removeObstacle(${row},${cell})`);
  document.getElementById(`R${row}C${cell}`).style.backgroundColor = 'rgb(50,50,50)';
  obstacles[`R${row}C${cell}`] = [row,cell];
  console.log('Booster and Ship avionics power and telemetry nominal')
}

function removeObstacle(row,cell){
  document.getElementById(`R${row}C${cell}`).removeAttribute("onclick");
  document.getElementById(`R${row}C${cell}`).setAttribute("onclick",`setObstacle(${row},${cell})`);
  document.getElementById(`R${row}C${cell}`).style.removeProperty("background-color")
  delete obstacles[`R${row}C${cell}`]
  console.log(obstacles)
  console.log(`Hold hold hold, hold for this big ass nigga removing an obstacle at R${row}C${cell}`);
}

let closedBlocks = {};
let closedAmount = 0;
function pathfind(row,cell){
  // get coords of surrounding blocks
  // [row,cell,distanceTarget,distanceStart,Fcost,obstacle]
  let surroundingCoords = {};
  surroundingCoords['S0'] = [row - 1,cell - 1,'','','','']
  surroundingCoords['S1'] = [row - 1,cell,'','','','']
  surroundingCoords['S2'] = [row - 1,cell + 1,'','','','']
  surroundingCoords['S3'] = [row,cell - 1,'','','','']
  surroundingCoords['S4'] = [row,cell,'','','','']
  surroundingCoords['S5'] = [row,cell + 1,'','','','']
  surroundingCoords['S6'] = [row + 1,cell - 1,'','','','']
  surroundingCoords['S7'] = [row + 1,cell,'','','','']
  surroundingCoords['S8'] = [row + 1,cell + 1,'','','',''];

  

  // distance between block and target
  let calculatedDistanceT = 0;
  while(calculatedDistanceT<9){
    let dc = (surroundingCoords[`S${calculatedDistanceT}`][1] - setTargetPointCell);
    let dr = (surroundingCoords[`S${calculatedDistanceT}`][0] - setTargetPointRow);
    console.log(surroundingCoords);
    
    surroundingCoords[`S${calculatedDistanceT}`][2] = (((dc**2)+(dr**2))**0.5)*10;
    calculatedDistanceT ++;
    
  }
  // distance between block and start
  let calculatedDistanceS = 0;
  while(calculatedDistanceS<9){
    let dc = (surroundingCoords[`S${calculatedDistanceS}`][1] - setStartPointCell);
    let dr = (surroundingCoords[`S${calculatedDistanceS}`][0] - setStartPointRow);
    surroundingCoords[`S${calculatedDistanceS}`][3] = (((dc**2)+(dr**2))**0.5)*10;
    calculatedDistanceS ++;
  }
  //fcost
  let calculatedFCost = 0;
  Object.keys(surroundingCoords).forEach((block)=>{
    surroundingCoords[block][4] = surroundingCoords[block][3] + surroundingCoords[block][2]
    
  })
  //is it an obstacle
  let obstacleChecked = 0;
  surroundingCoords['S4'][5] = true;
  
  Object.keys(surroundingCoords).forEach((block)=>{
    let sR = surroundingCoords[block][0];
    let sC = surroundingCoords[block][1];
    if(sR === setStartPointRow && sC === setStartPointCell){
      surroundingCoords[block][5] = true;
    }
    Object.keys(obstacles).forEach( obstacle =>{
      if(`R${sR}C${sC}` === obstacle){
        surroundingCoords[block][5] = true;
      } 
    })
  })

  //check if block is already closed
  Object.keys(surroundingCoords).forEach(blocks =>{
    let sR = surroundingCoords[blocks][0];
    let sC = surroundingCoords[blocks][1];
    if((sR<0 || sR>9)||(sC<0||sC>9)){surroundingCoords[blocks][5]=true;}
  Object.keys(closedBlocks).forEach(block=>{
    if(sR === closedBlocks[block][0] && sC === closedBlocks[block][1]){surroundingCoords[blocks][5] = true;}
  })
})

  //find best path
  let bestFCOST;
  let bestBlock;
  Object.keys(surroundingCoords).forEach(block =>{
    if(!surroundingCoords[block][5]){
    if(bestFCOST === undefined){
    bestFCOST = surroundingCoords[block][4];
    bestBlock = block;
    }else{
      if(surroundingCoords[block][4] <= bestFCOST){
        bestFCOST = surroundingCoords[block][4]
        bestBlock = block;
      }
    }
  }
  })
  
  //close best path
  console.log(surroundingCoords)
  if(surroundingCoords[bestBlock][0] === setTargetPointRow && surroundingCoords[bestBlock][1] === setTargetPointCell){return}
  console.log(surroundingCoords[bestBlock][0])
  console.log(surroundingCoords[bestBlock][1])
  console.log(closedBlocks)
  document.getElementById(`R${surroundingCoords[bestBlock][0]}C${surroundingCoords[bestBlock][1]}`).style.backgroundColor = 'red';
  closedBlocks[closedAmount] = [surroundingCoords[bestBlock][0],surroundingCoords[bestBlock][1]];
  closedAmount ++;
  setTimeout(()=>{
    pathfind(surroundingCoords[bestBlock][0],surroundingCoords[bestBlock][1])
  },1000)
  

//omfg what is going on
}
