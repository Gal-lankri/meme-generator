'use strict'
let gElCanvas
let gCtx

onInit()
function onInit() {
  gElCanvas = document.getElementById('main-canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
}

function renderMeme() {
  const { selectedImgId: imgId, lines } = getMeme()

  drawImg(imgId)
  drawText(lines[lines.length - 1], gElCanvas.width / 2, 100)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth - 20
}

function drawImg(imgId) {
  const img = new Image()
  img.src = getImgById(imgId)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetImg(imgIdx) {
  const imgUrl = getImgById(imgIdx)
}

function drawText(text, x, y) {
  const { txt, color = 'white', size = 30, align = 'center' } = text
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px impact`
  gCtx.textAlign = align
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function onSetLineTxt(line) {
  setLineTxt(line)
  renderMeme()
}
