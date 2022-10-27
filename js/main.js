'use strict'
let gCurrShownEl

function openMobileMenu(el) {
  const elEditor = document.querySelector('.meme-editor')
  const elGallery = document.querySelector('.main-gallery')
  if (!elGallery.classList.contains('hidden')) {
    gCurrShownEl = elGallery
  } else if (!elEditor.classList.contains('hidden')) {
    gCurrShownEl = elEditor
  }
  gCurrShownEl.classList.toggle('hidden')
  document.querySelector('.mobile-menu').classList.toggle('hidden')
}
