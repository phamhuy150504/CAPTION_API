const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export let WantRemove = (id, arrCart) => {
    const modalId = $('#modelId');
    const want_remove = $('#want__remove');
    const backdrop = $('.modal-backdrop');
    want_remove.style = `display: block`;
    modalId.style = `display: none`;
    backdrop.style = `position: static`;
}

