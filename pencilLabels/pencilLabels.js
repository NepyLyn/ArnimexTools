function calcLabelNumber(labelW, labelH){
  useAreaWidth = pageSize.width - margins.page
  useAreaHeight = pageSize.height - margins.page

  columnsNumber = Math.floor(useAreaWidth/(parseFloat(labelW) + margins.x))
  rowsNumber = Math.floor(useAreaHeight/(parseFloat(labelH) + margins.y))
  let labelNumber = {cols: columnsNumber, rows:rowsNumber, total: columnsNumber*rowsNumber}
  console.log(columnsNumber, (parseInt(labelH) + margins.y))
  return labelNumber
}

function printLabelPage(){
  let page = document.getElementById("labelPage");
  
  var opt = {
    margin: 0.0001,
    filename: "Etiquetas lapices.pdf",
    image: {type: "png", quality: 1},
    html2canvas: {scale: 2, scrollY: 0, scrollX: -7},
    jsPDF: {unit: "cm", format: "letter", orientation:  "portrait"},
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(page).save();
}

function fillPage(){
  var page =  document.getElementById('labelPage');
  page.innerHTML = ''; //Clear

  let width = document.getElementById('inputWidth').value;
  let height = document.getElementById('inputHeight').value;
  let text = document.getElementById('inputText').value;
  let labelsNumber = calcLabelNumber(width, height);
  console.log(`W:${width} H:${height} T:${text} #:${labelsNumber.total}`);

  var labelCount = 0
  for (let i = 0; i < labelsNumber.total ; i++) {
    var label = document.createElement('div')
    label.classList.add('label-Instance', "text-dark")

    label.innerHTML = text
    label.style.width = width + "cm"
    label.style.height = height + "cm"
    label.style.marginRight = margins.x + "cm"
    label.style.marginBottom = margins.y + "cm"
    label.style.fontSize = height*0.8 + "cm"
      
    labelCount++;
    page.appendChild(label)
  }
}

function loadDesigns(){
  labelContainer = document.getElementById('schoolLabels')
  
  schoolLabels.forEach(function(schoolLabel){
    label = document.createElement('img')
    label.src = schoolLabel.paths[0]
    label.onclick = function() { fillPage(schoolLabel.id); };
    label.classList.add('schoolLabel')
    labelContainer.appendChild(label)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  
});