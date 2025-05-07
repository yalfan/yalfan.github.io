import { displayUtility, readPaste } from './ocr.js';
import { shiftSubtitleFile } from "./subtitle.js";

window.onload = init;

/* Document Listeners */

function init(){
    const utilityButtons = document.getElementsByClassName('utility-button');
    
    for (let button of utilityButtons) {
        button.addEventListener('click', () => {
            displayUtility(button);
        });
    }
    
    const ocrUtility = document.getElementById('ocr-utility');
    
    ocrUtility.addEventListener('paste', readPaste);
    
    const subtitleUtility = document.getElementById('subtitle-button');
    
    subtitleUtility.addEventListener('click', shiftSubtitleFile);
}


