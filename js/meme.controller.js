'use strict'
let gElCanvas
let gCtx
let loadFirstLines

onInit()
function onInit() {
  gElCanvas = document.getElementById('main-canvas')
  gCtx = gElCanvas.getContext('2d')
  window.addEventListener('resize', resizeCanvas)
}

function renderMeme(resize) {
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = getMeme()
  drawImg(imgId)
  drawText(lines, lineIdx)
  if (resize) return
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
  const elContainer = document.querySelector('.canvas-conatiner')
  gElCanvas.width = elContainer.offsetWidth - 40
  renderMeme('resize')
}

function drawImg(imgId) {
  const img = new Image()
  img.src = getImgById(imgId)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(lines, lineIdx) {
  loadFirstLines = true
  lines.forEach(({ txt, color, size, align, pos }, idx) => {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}rem impact`
    gCtx.textAlign = align
    gCtx.fillText(txt, gElCanvas.width / 2, pos.y)
    gCtx.strokeText(txt, gElCanvas.width / 2, pos.y)
  })
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

function onSwitchLines() {
  setLineSelect()
  const { lines, selectedLineIdx } = getMeme()
  let elInuptLine = document.querySelector('[name="line"]')
  //   if (elInuptLine.placeholder === 'I sometimes eat Falafel')
  elInuptLine.placeholder = lines[selectedLineIdx].txt
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'Your Meme'
}

function onBackToGallery() {
  document.querySelector('.mobile-menu').classList.add('hidden')
  document.querySelector('.meme-editor').classList.add('hidden')
  document.querySelector('.saved-memes-gallery').classList.add('hidden')
  document.querySelector('.main-gallery').classList.remove('hidden')
}

function onRemoveLine() {
  setRemoveLine()
  renderMeme()
}

function onSaveMemeToStorage() {
  setSaveMemeToStorage(gElCanvas.toDataURL())
}
