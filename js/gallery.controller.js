'use strict'

function renderGallery() {
  const images = getImages()
  const strHTMLs = images.map(
    ({ url, id }) => `
    <img onclick="onImgSelect(this.dataset.id)"
    data-id="${id}"
    src="${url}"
    alt=""/>`
  )
  document.querySelector('.images-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgIdx) {
  setImg(+imgIdx)
  renderMeme()
}

function onFilterByImgKey(key) {
  console.log(key);
  setFilterByImgKey(key)
  renderGallery()
}
