//#region Functions
function getSelectedSize(){
    const radioGroup = document.getElementsByName('size-options');
    var selectedSizeID;

    radioGroup.forEach(radio => {
        if(radio.checked){
            selectedSizeID = radio.id.slice(-1);    //Get last character and cast to int
            return false;
        }
    });
    //console.log(selectedSizeID)
    return LABELSIZES.filter(item => item.id == selectedSizeID).pop();
};

function changeSize(){
    let filteredSize = getSelectedSize();
    console.log(filteredSize)
    //console.log(filteredSize.height + ' | ' + filteredSize.width)

    //Set size
    var label = document.getElementById('label');
    label.style.width = filteredSize.width + 'cm';
    label.style.height = filteredSize.height + 'cm';
    //Set properties
    //Title
    var title = document.getElementById('labelTitle');
    title.style.fontSize = filteredSize.titleFontSize + 'rem'
    //Subtitle
    var subtitle = document.getElementById('labelSubtitle');
    subtitle.style.fontSize = filteredSize.subtitleFontSize + 'rem'
    //Legend
    var quantity = document.getElementById('quantity');
    quantity.style.fontSize = filteredSize.subtitleFontSize + 'rem'

    let slogans = document.getElementsByName('slogan');
    console.log(slogans)

    // Iterar sobre la colección de elementos
    for (let i = 0; i < slogans.length; i++) {
        // Acceder al elemento actual en la iteración
        let slogan = slogans[i];
        
        // Realizar acciones con el elemento actual, por ejemplo, mostrar su contenido
        slogan.style.fontSize = filteredSize.sloganSize + 'rem'
    }
};

function changeTitle(){
    //get
    const titleInput = document.getElementById('labelTitleInput');
    let title = document.getElementById('labelTitle');

    //Set
    title.innerHTML = titleInput.value;
};

function changeSubtitle(){
    //get
    let subtitleInput = document.getElementById('labelSubtitleInput');
    let subtitle = document.getElementById('labelSubtitle');

    //Set
    subtitle.innerHTML = subtitleInput.value;
};

function changeColor(){
    //Get
    const color = document.getElementById('labelColor');
    var border = document.getElementById('border');
    var band = document.getElementById('labelTitle');

    //Set
    border.style.borderColor = color.value;
    band.style.backgroundColor = color.value;

    applyColorToBG();
}

function changeQuantity(){
    //Get
    const qtyInput = document.getElementById('labelQuantity');
    var qty = document.getElementById('quantity');
    
    const radioGroup = document.getElementsByName('unit-options');
    var selectedUnits;
    radioGroup.forEach(radio => {
        if(radio.checked){
            selectedUnits = radio.value;    //Get last character and cast to int
            return false;
        }
    });

    //Set
    qty.innerHTML = qtyInput.value + ' ' + selectedUnits
};

function changeBarcode(){
    //Get
    let barcodePrev = document.getElementById('barcodePrev');
    let selectedBarcode = document.getElementById('labelBarcode');
    let barcode = document.getElementById('barcode');
    
    //Set
    barcodePrev.src = 'resources/barcodes/' +  selectedBarcode.value + '.png'
    barcode.src = 'resources/barcodes/' +  selectedBarcode.value + '.png'

}

function loadSizes(){
    //Get the label type
    const labelType = document.getElementById('labelType').value
    
    //Filter array
    const filteredSizes = LABELSIZES.filter(item => item.type == labelType)
    //console.log(filteredSizes)

    //Set sizes on dropdown
    let radioGroup = document.getElementById('labelSize')
    radioGroup.innerHTML = ''
    let checkFlag = true;

    filteredSizes.forEach(item => {
       let inputElement = document.createElement('input');
       inputElement.type = 'radio';
       inputElement.className = 'btn-check';
       inputElement.name = 'size-options';
       inputElement.autocomplete = 'off';
       inputElement.id = 'labelSize' + item.id;
       if (checkFlag) {
        inputElement.checked = true;
        checkFlag = false;
       };

       let labelElement = document.createElement('label');
       labelElement.className = 'btn';
       labelElement.htmlFor = inputElement.id;
       labelElement.innerText = item.sizeName;

       radioGroup.appendChild(inputElement);
       radioGroup.appendChild(labelElement);
    });

    reset()
};

function loadBarcodes(){
    let barcodeDropdown = document.getElementById('labelBarcode');
    barcodeDropdown.innerHTML = ""

    BARCODENAMES.forEach(barcode => {
        let barcodeNode = document.createElement('option');
        barcodeNode.value = barcode;
        barcodeNode.innerHTML = barcode;
        barcodeDropdown.appendChild(barcodeNode);
    });
};

function hexToRgb(hexColor) {
    // Convertir el valor hexagonal a RGB
    var r = parseInt(hexColor.substr(1, 2), 16);
    var g = parseInt(hexColor.substr(3, 2), 16);
    var b = parseInt(hexColor.substr(5, 2), 16);

    return [r,g,b]
}

// Función para cargar la imagen y aplicar el color
function applyColorToBG() {
    let opacity = 0.2;

    //Get color
    color = hexToRgb(document.getElementById('labelColor').value)

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
  
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Dibujar la imagen original en el canvas
      ctx.drawImage(img, 0, 0);
  
      // Obtener los datos de píxeles de la imagen
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var pixels = imgData.data;
  
      // Iterar sobre los píxeles y aplicar el color
      for (var i = 0; i < pixels.length; i += 4) {
        // Saltar los píxeles transparentes
        if (pixels[i + 3] === 0) continue;
  
        // Aplicar el color al píxel
        pixels[i] = color[0];
        pixels[i + 1] = color[1];
        pixels[i + 2] = color[2];

        // Aplicar la transparencia al píxel
        pixels[i + 3] = Math.round(pixels[i + 3] * opacity);
      }
  
      // Establecer los datos de píxeles modificados en el canvas
      ctx.putImageData(imgData, 0, 0);
  
      // Convertir el canvas a un data URL
      var dataURL = canvas.toDataURL();
  
      // Establecer el data URL como fondo del div
      var coloredBackground = document.getElementById('label');
      coloredBackground.style.backgroundImage = 'url(' + dataURL + ')';
    };
  
    // Cargar la imagen
    img.src = 'resources/background.png';
}

function loadTemplate(){
    // Obtener una referencia al div donde deseas insertar el contenido
    let divContenedor = document.getElementById('labelContainer');
    let selectedLabel = document.getElementById('labelType')

    // URL del archivo HTML que deseas cargar
    let url = selectedLabel.value + '.html'

    // Usar fetch para obtener el contenido del archivo HTML
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Insertar el contenido en el div contenedor
            divContenedor.innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el archivo:', error);
    });
};

//#region Save
function saveAsImage(){
    const labelNode = document.getElementById('label');
    htmlToImage.toSvg(labelNode).then(function (dataUrl){
        var link = document.createElement('a');
        link.download = 'my-image-name.svg';
        link.href = dataUrl;
        link.click();
    });
};

async function fillPage(){
    //Get
    let page = document.getElementById('page');

    //Clear
    page.innerHTML = ''

    //Calculate how many items
    const pageSize = {width: 21.59, height: 27.94};
    const labelSize = getSelectedSize();
    const margin = 0;

    //x
    const columns = Math.floor((pageSize.width - margin*2)/labelSize.width);
    const rows = Math.floor((pageSize.height - margin*2)/labelSize.height);
    console.log(`rows: ${rows} columns: ${columns}`);
    const labelNode = document.getElementById('label');
    var labelUnit = document.createElement('div')

    const dataUrl = await htmlToImage.toSvg(labelNode);
    const svg = decodeURIComponent(dataUrl.split(',')[1]);
    labelUnit.innerHTML = svg
    //console.log(svg)

    //Get node to append
    
    for (let index = 0; index < rows*columns; index++) {
        //Create element
        page.appendChild(labelUnit.cloneNode(true));
    };
    
};

async function saveAsPDF(){
    //To avoid white space on top
    window.scrollTo(0, 0);

    await fillPage();

    //to pdf
    let page = document.getElementById('page');
    console.log(page)

    var opt = {
        margin: 0,
        filename: "Plantilla.pdf",
        image: { type: "svg", quality: 3 },
        html2canvas: { scale: 3, y: 0,  scrollY: 0},
        jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(page).save();
};

//#region On Load
function reset(){
    loadTemplate();
    changeSize();
    changeColor();
    changeBarcode();
}

window.onload = function() {
    //Load
    loadSizes();
    loadBarcodes();
    reset();
    
};