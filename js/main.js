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

function openMemesGallery() {
  loadMemeFromStorage()
  const elEditor = document.querySelector('.meme-editor')
  const elGallery = document.querySelector('.main-gallery')
  if (!elGallery.classList.contains('hidden')) {
    gCurrShownEl = elGallery
  } else if (!elEditor.classList.contains('hidden')) {
    gCurrShownEl = elEditor
  }
  gCurrShownEl.classList.toggle('hidden')
  document.querySelector('.saved-memes-gallery').classList.toggle('hidden')
  renderSavedMemes()
}

function renderSavedMemes() {
  const images = gImgsFromStorage
  if (!images || images.length === 0) return
  const strHTMLs = images.map(
    (Image) => `
    <img src="${Image}" alt=""/>`
  )
  document.querySelector('.saved-memes-container').innerHTML = strHTMLs.join('')
}
