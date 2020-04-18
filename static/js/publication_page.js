let preloaderElement = document.getElementById("draft_preloader");
let newPublicationNameElement = document.getElementById('new_publication_input');
let autosaveCheckboxElement = document.getElementById('publication_draft_autosave');
let publicationContentTextareaElement = document.getElementById('publication_content_textarea');
let draftSaveBtnElement = document.getElementById('publication_draft_save');


function enableDraftPreloader(enable = true) {
    if (!enable) {
        preloaderElement.classList.add('hidden');
    } else {
        preloaderElement.classList.remove('hidden');
    }
}

function autoSaveDraft() {
    if (autosaveCheckboxElement.checked === true) {
        console.log('Autosave');
        saveDraft();
    } else {
        console.log('Autosave disabled');
    }
}

function saveDraft() {
    console.log('Saving triggered');
    enableDraftPreloader();

    // TODO: send it!
    const searchParams = new URLSearchParams();
    searchParams.set("name", newPublicationNameElement.value);
    searchParams.set("content", publicationContentTextareaElement.value);
    console.log(searchParams.toString());

    setTimeout(() => {
        enableDraftPreloader(false);
    }, 1000);
}

newPublicationNameElement.addEventListener('change', (event) => {
    autoSaveDraft();
});

publicationContentTextareaElement.addEventListener('change', (event) => {
    autoSaveDraft();
});

draftSaveBtnElement.addEventListener('click', (event) => {
    saveDraft();
});

// Save draft every 10 seconds
setInterval(() => {
    autoSaveDraft();
}, 10000);


enableDraftPreloader(false);