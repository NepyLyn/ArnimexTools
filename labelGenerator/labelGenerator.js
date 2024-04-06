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
    const filteredSize = getSelectedSize();
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
    const margin = 0.5;

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
    await fillPage();

    //to pdf
    let page = document.getElementById('page');
    console.log(page)

    var opt = {
        margin: 0,
        filename: "Plantilla.pdf",
        image: { type: "svg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
    };

    //To avoid white space on top
    window.scrollTo(0, 0);
    setTimeout(() => {
        html2pdf().set(opt).from(page).save();
    }, 300);
};

//#region On Load
window.onload = function() {
    loadSizes();
    loadBarcodes();
    changeColor();
    changeSize();
    changeBarcode();
};