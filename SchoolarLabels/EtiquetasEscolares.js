let labelSizes = {
  big:    {width: 9,    labelsPerRow: 2,  rowsPerPage: 5},
  medium: {width: 6.5,  labelsPerRow: 3,  rowsPerPage: 6},
  small:  {width: 4.5,  labelsPerRow: 4,  rowsPerPage: 8},
}

function printLabelPage(){
  let page = document.getElementById("labelPage");
  
  var opt = {
    margin: 0.0001,
    filename: "Etiquetas libretas.pdf",
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 2, scrollY: 0, scrollX: -7},
    jsPDF: { unit: "cm", format: "letter", orientation:  "portrait"},
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(page).save();
}

function fillPage(labelID){
  var page =  document.getElementById('labelPage');
  page.innerHTML = '' //Clear
  let labelInfo = schoolLabels.find(label => label.id == labelID)
  console.log(document.getElementById('inputsize').value)
  let selectedSize = document.getElementById('inputsize').value
  let pageConfig = labelSizes[selectedSize];

  //console.log(labelInfo)

  var labelCount = 0
  let n = labelInfo.paths.length

  for (let i = 0; i < pageConfig.rowsPerPage ; i++) {
    var row = document.createElement('div')
    row.classList.add('labelRow')

    for (let j = 0; j < pageConfig.labelsPerRow; j++) {
      var div = document.createElement('div');
      div.classList.add("label-Instance", "text-dark");

      //Get values from input
      let name = document.getElementById('inputName').value;
      let grade = document.getElementById('inputGrade').value;
      let school = document.getElementById('inputSchool').value;
      //console.log(name, grade, school)

      //Add image
      var image = document.createElement('img');
      image.src = labelInfo.paths[Math.abs(labelCount % n)]   //Circular accesss
      image.style.width = pageConfig.width.toString() + "cm";
      div.appendChild(image);
      
      //Add Text
      var textArea = document.createElement('div');
      textArea.classList.add("textArea");
      textArea.style.width = (labelInfo.textArea[2] - labelInfo.textArea[0]) + "%";
      textArea.style.height = (labelInfo.textArea[3] - labelInfo.textArea[1]) + "%";
      textArea.style.left = labelInfo.textArea[0] + "%";
      textArea.style.top = labelInfo.textArea[1] + "%";
      textArea.style.fontSize = labelInfo.textSize[selectedSize] + "cm";
      textArea.style.color = labelInfo.textColor;
      textArea.style.lineHeight = labelInfo.lineHeight;
      textArea.innerHTML = `<div> Nombre: ${name} </div>`;
      textArea.innerHTML += `<div> Grado: ${grade} </div>`;
      textArea.innerHTML += `<div> Escuela: ${school} </div>`;
      textArea.innerHTML += `<div> Materia: </div>`;
      div.appendChild(textArea);
      
      row.appendChild(div);
      labelCount++;
    }
    page.appendChild(row)
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
  loadDesigns()
});