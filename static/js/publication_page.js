let preloaderElement = document.getElementById("draft_preloader");
let newPublicationNameElement = document.getElementById('new_publication_input');
let autosaveCheckboxElement = document.getElementById('publication_draft_autosave');
let publicationContentTextareaElement = document.getElementById('publication_content_textarea');
let draftSaveBtnElement = document.getElementById('publication_draft_save');
let draftsListBtnElement = document.getElementById('drafts_list_btn');
let draftListPreloaderElement = document.getElementById('draft_list_preloader');
let draftListCollectionElement = document.getElementById('draft_list_collection');
let draftPreviewElement = document.getElementById('draft_preview');

function deleteDraft(uuid) {
    console.log(`Delete ${uuid}`);
    for (let child of draftListCollectionElement.children) {
        if (child.getAttribute('data-uuid') == uuid) {
            child.classList.add("red");

            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/api/drafts');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.addEventListener('loadend', (e) => {
                if (xhr.status === 200) {
                    let respObject = JSON.parse(xhr.responseText);
                    if (respObject.destroyed === 1) {
                        child.parentElement.removeChild(child);
                    } else {
                        M.toast({html: "Draft wasn't destroyed! Try again"});
                    }
                }
            });
            xhr.send(`uuid=${encodeURIComponent(uuid)}`);
            break;
        }
    }
}

function enableDraftListPreloader(enable = true) {
    if (!enable) {
        draftListPreloaderElement.classList.add('hide');
    } else {
        draftListPreloaderElement.classList.remove('hide');
    }
}

function enableDraftPreloader(enable = true) {
    if (!enable) {
        preloaderElement.classList.add('hide');
    } else {
        preloaderElement.classList.remove('hide');
    }
}

function autoSaveDraft() {
    if (autosaveCheckboxElement.checked === true && publicationContentTextareaElement.value.length > 15) {
        console.log('Autosave');
        saveDraft();
    } else {
        console.log('Autosave disabled');
    }
}

function saveDraft() {
    console.log('Saving triggered');
    enableDraftPreloader();

    const searchParams = new URLSearchParams();
    searchParams.set("name", newPublicationNameElement.value);
    searchParams.set("content", publicationContentTextareaElement.value);
    console.log(searchParams.toString());

    let formElement = document.getElementById("newpost-form");
    let formData = new URLSearchParams(new FormData(formElement)).toString();
    let request = new XMLHttpRequest();
    request.open('POST', '/api/drafts');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.addEventListener('loadend', (event) => {
        enableDraftPreloader(false);
        let respObject = JSON.parse(request.responseText);
        if (respObject.error) {
            M.toast({html: `<span class="red-text text-lighten-3">${respObject.error}</span>`});
        }
    });
    request.send(formData);
}

draftsListBtnElement.addEventListener('click', (event) => {
    enableDraftListPreloader();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/drafts');
    xhr.addEventListener('loadend', (e) => {
        enableDraftListPreloader(false);

        draftListCollectionElement.innerHTML = '';
        let respObject = JSON.parse(xhr.responseText);
        for (let element of respObject.items) {
            let elStr = `<li class="collection-item" data-uuid="${element.uuid}">`;
            elStr +=    `<a href="/publications/new?recoverDraft=${element.uuid}">${element.title}</a>`;
            elStr +=    `<a href="#" class="secondary-content" onclick="deleteDraft('${element.uuid}')"><i class="material-icons">delete_forever</i></a>`;
            //elStr +=    '<a href="#" class="secondary-content"><i class="material-icons">open_in_browser</i></a>';
            elStr +=    '</li>';
            draftListCollectionElement.innerHTML += elStr;
        }
    });
    xhr.send();
});

newPublicationNameElement.addEventListener('change', (event) => {
    autoSaveDraft();
});

publicationContentTextareaElement.addEventListener('change', (event) => {
    autoSaveDraft();
    let contentText = publicationContentTextareaElement.value;
    draftPreviewElement.innerHTML = markdown.toHTML(contentText);
});

draftSaveBtnElement.addEventListener('click', (event) => {
    saveDraft();
});

// Save draft every 10 seconds
setInterval(() => {
    autoSaveDraft();
}, 10000);


enableDraftPreloader(false);
enableDraftListPreloader(false);