'use strict'
let gElCanvas
let gCtx

onInit()
function onInit() {
  gElCanvas = document.getElementById('main-canvas')
  gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = getMeme()
  drawImg(imgId)
  
  if (lineIdx !== 0) drawText(lines[lineIdx], gElCanvas.width / 2, 300)
  else drawText(lines[lineIdx], gElCanvas.width / 2, 100)
  document.querySelector('.main-gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
}


function onChangeFontSize(diff) {
  updateFontSize(diff)
  renderMeme()
}

function onColorSelect(color) {
  setColor(color)
  renderMeme()
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

function drawText(text, x, y) {
  const { txt, color, size = 30, align = 'center' } = text
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px impact`
  gCtx.textAlign = align
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function onAddLine() {
  const newLine = document.querySelector('[name=line]').value
  const color = document.querySelector('[name="color-select"]')
  setNewLine(newLine, color)
  renderMeme()
}

function onSetLineTxt(line) {
  setLineTxt(line)
  renderMeme()
}
