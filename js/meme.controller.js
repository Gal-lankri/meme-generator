'use strict'
let gElCanvas
let gCtx
let gCurrPos
let gCurrLineClicked
let gLastLineIdx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

onInit()
function onInit() {
  gElCanvas = document.getElementById('main-canvas')
  gCtx = gElCanvas.getContext('2d')
  window.addEventListener('resize', resizeCanvas)
  addListeners()
}

function renderMeme(resize) {
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = getMeme()
  drawImg(imgId)
  drawText(lines, lineIdx)
  if (resize) return
  document.querySelector('.main-gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isLineClicked(pos)) return
  setLineDrag(true)
  gCurrPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  if (gCurrLineClicked !== undefined) var { isDrag } = gCurrLineClicked
  if (!isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gCurrPos.x
  const dy = pos.y - gCurrPos.y
  moveLine(dx, dy)
  gCurrPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
  
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-conatiner')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
  renderMeme('resize')
}

function drawImg(imgId) {
  const img = new Image()
  img.src = getImgById(imgId)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function drawSavedMeme(src) {
  const img = new Image()
  img.src = src
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  document.querySelector('.saved-memes-gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
}

function drawText(lines) {
  lines.forEach(({ txt, color, size, align, pos, stroke }, idx) => {
    gCtx.font = `${size}px impactfont`
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.textAlign = align
    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
  })
}

function onAddLine() {
  let elInuptLine = document.querySelector('[name="line"]')
  elInuptLine.placeholder = 'Add new line'
  const newLine = elInuptLine.value
  const color = document.querySelector('[name="color-select"]')
  setNewLine(newLine, color)
  renderMeme()
}

function onSetLineTxt(line) {
  if (document.querySelector('[name="line"]').placeholder === 'Add new line') return
  setLineTxt(line)
  renderMeme()
}

function onSwitchLines() {
  renderMeme()
  setLineSelect()
  const { lines, selectedLineIdx } = getMeme()
  let elInuptLine = document.querySelector('[name="line"]')
  elInuptLine.placeholder = lines[selectedLineIdx].txt
  gCtx.strokeStyle = '#F6F54D'
  gCtx.strokeRect(
    lines[selectedLineIdx].pos.x,
    lines[selectedLineIdx].pos.y - lines[selectedLineIdx].size,
    gCtx.measureText(lines[selectedLineIdx].txt).width + 5,
    lines[selectedLineIdx].size + 5
  )
}

function onChangeFontSize(diff) {
  updateFontSize(diff)
  renderMeme()
}

function onColorSelect(color) {
  setColor(color)
  renderMeme()
}
function onStrokeSelect(color) {
  setStroke(color)
  renderMeme()
}

function downloadCanvas(elLink) {
  renderMeme()
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
