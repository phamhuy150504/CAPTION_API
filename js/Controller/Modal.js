const $ = document.querySelector.bind(document);

export let WantRemove = () => {
    const modalId = $('#modelId');
    const want_remove = $('#want__remove');
    const backdrop = $('.modal-backdrop');
    want_remove.style = `display: block`;
    modalId.style = `display: none`;
    backdrop.style = `position: static`;
}

