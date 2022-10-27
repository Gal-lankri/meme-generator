'use strict'

const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
const imgNums = 18
const gImgs = []
const gImgsFromStorage = []
const STORAG_KEY = 'memesDB'
const gSavedMemes = []

_creatImages(imgNums, gImgs)

function _creatImages(imgNum, images) {
  for (let i = 1; i < imgNum; i++) {
    images.push(_creatImage(i, `./images/${i}.jpg`, 'funny'))
  }
}

function _creatImage(id, url, keywords) {
  return {
    id,
    url,
    keywords: [keywords],
  }
}

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 2.5,
      align: 'center',
      color: 'white',
      pos: { y: 50 },
    },
    {
      txt: 'I sometimes eat Pizza',
      size: 2.5,
      align: 'center',
      color: 'white',
      pos: { y: 450 },
    },
  ],
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function _creatNewLine(txt, size = 2.3, align = 'center', color = 'white', pos) {
  return {
    txt,
    size,
    align,
    color,
    pos,
  }
}

function setImg(imgIdx) {
  gMeme.selectedImgId = imgIdx
}

function getImgById(imgId) {
  const { url } = gImgs.find((img) => imgId === img.id)
  return url
}

function getMeme() {
  return gMeme
}

function getImages() {
  return gImgs
}

function setLineTxt(line) {
  if (!gMeme.lines.length) _creatNewLine(line, undefined, undefined, undefined, { x: 250, y: 50 })
  else gMeme.lines[gMeme.selectedLineIdx].txt = line
}

function updateFontSize(diff) {
  if (diff === 'increase') gMeme.lines[gMeme.selectedLineIdx].size++
  else gMeme.lines[gMeme.selectedLineIdx].size--
}

function setNewLine(newLine, color) {
  gMeme.lines.push(
    _creatNewLine(newLine, undefined, undefined, color, {
      x: gElCanvas.width,
      y: gElCanvas.height / 2,
    })
  )
  gMeme.selectedLineIdx++
}

function setLineSelect() {
  if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
    gMeme.selectedLineIdx++
  } else if (gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--
}

function setRemoveLine() {
  if (gMeme.lines.length === 0) return
  gMeme.lines.splice(gMeme.lines.length - 1, 1)
}

function setSaveMemeToStorage(meme) {
  gSavedMemes.push(meme)
  saveToStorage(STORAG_KEY, gSavedMemes)
}

function loadMemeFromStorage() {
  const dataURLS = loadFromStorage(STORAG_KEY)
  dataURLS.map((dataUrl) => {
    gImgsFromStorage.push(dataUrl)
  })
}
