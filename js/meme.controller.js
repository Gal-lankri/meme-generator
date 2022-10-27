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

function renderMeme() {
  const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = getMeme()
  drawImg(imgId)
  drawText(lines, lineIdx)
  document.querySelector('.main-gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
  console.log('gMeme.lines[0].pos.x', gMeme.lines[0].pos.x)
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
  gElCanvas.width = elContainer.offsetWidth - 10

  renderMeme()
}

function drawImg(imgId) {
  const img = new Image()
  img.src = getImgById(imgId)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(lines, lineIdx) {
  if (lines.length <= 2) {
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
  } else {
    const { txt, color, size, align, pos } = lines[lineIdx]
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px impact`
    gCtx.textAlign = align
    gCtx.fillText(txt, gElCanvas.width / 2, pos.y)
    gCtx.strokeText(txt, gElCanvas.width / 2, pos.y)
  }
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
    console.log('data', data) 
    elLink.href = data 
    elLink.download = 'Your Meme' 
  }
  
