
export function displayUtility(btn) {
    let parent = btn.parentNode.parentNode;
    let utility;
    for (let child of parent.children) {
        if (child.classList.contains("utility-popout")) {
            utility = child;
            break;
        }
    }
    
    if (utility.style.height === "0px" || utility.style.height === "") {
        setTimeout(() => {
            for (let child of utility.children) {
                child.style.display = "block";
            }
        }, 100);
        utility.style.height = "100%";
        utility.style.width = "100%";
    }
    else {
        setTimeout(() => {
            for (let child of utility.children) {
                child.style.display = "none";
            }
        }, 100);
        utility.style.height = "0px";
        utility.style.width = "0px";
    }
}



/* OCR Functionos*/
async function readText(file) {

    const worker = await Tesseract.createWorker('eng');

    document.getElementById('output-text').innerHTML = 'Recognizing text, please wait...';

    const ret = await worker.recognize(file);
    console.log(ret.data.text);
    await worker.terminate();

    return ret.data.text;
}

export function readPaste(event) {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];

        // Check if the clipboard item is an image
        if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();  // Use getAsFile instead of getAsBlob
            const url = URL.createObjectURL(file);  // Create an Object URL for the file

            // Create an img element to display the image
            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '100%';  // Optional: limit image size

            // Append the image to the container
            document.getElementById('image-container').innerHTML = '';  // Clear previous content
            document.getElementById('image-container').appendChild(img);

            readText(file).then(function(result) {
                // Display recognized text in the output div
                document.getElementById('output-text').innerHTML = result;
            }).catch(function(error) {
                console.error(error);
                document.getElementById('output-text').innerHTML = 'Error recognizing text.';
            });
        }
    }
}


