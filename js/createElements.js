export function createText(tag, textContent) {
    const element = document.createElement(tag);
    element.innerHTML = textContent;
    return element;
}

export function createImage(src) {
    const element = document.createElement('img');
    element.src = src;
    return element;
}

export function createIcon(iconClass, fontSize, color, cursor, clickHandler) {
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.fontSize = fontSize;
    icon.style.color = color;
    icon.style.cursor = cursor;
    icon.onclick = clickHandler;
    return icon;
}

export function createIconWithLink(iconClass, link) {
    const icon = createIcon(iconClass);
    const iconLink = document.createElement("a");
    iconLink.href = link;
    iconLink.target = "_blank";
    iconLink.appendChild(icon);
    return iconLink;
}

export function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = clickHandler;
    return button;
}

export function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

export function createInput(type, id, placeholder, style) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.style.cssText = style;
    return input;
}

export function createLabel(text, forId) {
    const label = document.createElement('label');
    label.textContent = text;
    label.htmlFor = forId;
    return label;
}

export function createTableContainer() {
    const tableContainer = createElementWithClass('div', 'tableContainer');
    const table = createElementWithClass('div','vulnerabilityTable');
    const vulnerabilityTable = document.createElement('table');
    vulnerabilityTable.id = 'vulnerabilityTable';
    menu = createMenu();
    tableContainer.appendChild(menu);
    table.appendChild(vulnerabilityTable);
    tableContainer.appendChild(table)
    return tableContainer;
}

export function createSelectElement(id, onchange) {
    const select = document.createElement('select');
    select.id = id;
    select.onchange = onchange;
    return select;
}

export function createOption(value, text, disabled, selected) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    option.disabled = disabled;
    option.selected = selected;
    return option;
}

export function createVideo(link) {
    const iframeElement = document.createElement('iframe');
    iframeElement.src = link;
    iframeElement.title = "YouTube video player";
    iframeElement.frameborder = "0";
    iframeElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframeElement.allowfullscreen = true;
    return iframeElement;
}

export function createOverlayImage(src) {
    return createImageElement('img', 'overlay-image', src, 'Image de coin bas droit');
}

export function createImageElement(tag, className, src, alt) {
    const element = document.createElement(tag);
    element.className = className;
    element.src = src;
    element.alt = alt;
    return element;
}

export function createVideoWithOverlay(link, imageSrc) {
    const videoContainer = createElementWithClass('div', 'video-projet');
    const videoElement = createVideo(link);
    const overlayImage = createOverlayImage(imageSrc);

    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(overlayImage);

    return videoContainer;
}


export function createVideoElement(videoUrl, description) {
    var videoDiv = createElementWithClass("div", "video");
    var videoElement = createVideo(videoUrl);

    // Ajouter l'attribut allowfullscreen à l'élément vidéo
    videoElement.setAttribute('allowfullscreen', '');

    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(createText('p', description));
    return videoDiv;
}



/************************** UPDATES  ******************************************/
export function updateVideoElement(videoUrl) {
    var videoElement = document.querySelector('iframe');
    if (videoElement){
        console.log('video trouvee' + videoElement.src);
    }
    videoElement.src = videoUrl;

}

export function updateImageElement(imageSrc) {
    var divprojet = document.querySelector('.video-projet');
    var imageElement = divprojet.querySelector('.overlay-image');
    if (imageElement) {
        console.log('Image trouvée ' + imageElement.src);
        imageElement.src = imageSrc;
    } else {
        console.log('Image non trouvée');
    }
}
