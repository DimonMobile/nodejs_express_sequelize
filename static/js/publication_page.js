let preloaderElement = document.getElementById("draft_preloader");

function enableDraftPreloader(enable = true) {
    if (!enable) {
        preloaderElement.classList.add('hidden');
    } else {
        preloaderElement.classList.remove('hidden');
    }
}

let autosaveCheckboxElement = document.getElementById('publication_draft_autosave');

function autoSaveDraft() {
    if (autosaveCheckboxElement.checked === true) {
        console.log('Autosave');
        saveDraft();
    } else {
        console.log('Autosave disabled');
    }
}

function saveDraft() {
    // TODO: implement
    console.log('Saving triggered');
    enableDraftPreloader();
    setTimeout(() => {
        enableDraftPreloader(false);
    }, 1000);
}


let newPublicationNameElement = document.getElementById('new_publication_input');
newPublicationNameElement.addEventListener('change', (event) => {
    autoSaveDraft();
});


let publicationContentTextareaElement = document.getElementById('publication_content_textarea');
publicationContentTextareaElement.addEventListener('change', (event) => {
    autoSaveDraft();
});

let draftSaveBtnElement = document.getElementById('publication_draft_save');
draftSaveBtnElement.addEventListener('click', (event) => {
    saveDraft();
});

// Save draft every 10 seconds
setInterval(() => {
    autoSaveDraft();
}, 10000);


enableDraftPreloader(false);