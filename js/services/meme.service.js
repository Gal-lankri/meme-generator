'use strict'

const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
const gNumsOfImgs = 18
const gImgs = []
const gImgsFromStorage = []
const STORAG_KEY = 'memesDB'
const gSavedMemes = []
let gLineDiff = 'up'
let gFiltterByImgKey

_creatImages(gNumsOfImgs, gImgs)

function _creatImages(imgNum, images) {
  for (let i = 1; i < imgNum; i++) {
    const keywords = []

    if (i === 8 || i === 6 || i === 12 || i === 13 || i === 14 || i === 15) {
      keywords.push('Tv')
    }
    if (i === 2 || i === 3 || i === 4) {
      keywords.push('Cute')
    }
    if (i === 10 || i === 16 || i === 8) {
      keywords.push('Funny')
    }
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      keywords.push('Baby')
    }
    if (i === 10 || i === 1 || i === 17) {
      keywords.push('Politician')
    }
    if (i === 11) {
      keywords.push('WTF')
    }

    images.push(_creatImage(i, `./images/${i}.jpg`, keywords))
  }
}

function _creatImage(id, url, keywords) {
  return {
    id,
    url,
    keywords,
  }
}

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 30,
      align: 'left',
      color: 'white',
      stroke: 'black',
      pos: { y: 50, x: 10 },
      isDrag: false,
    },
    {
      txt: 'I sometimes eat Pizza',
      size: 30,
      align: 'left',
      color: 'white',
      stroke: 'black',
      pos: { y: 450, x: 10 },
      isDrag: false,
    },
  ],
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}
function setStroke(color) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function _creatNewLine(txt, size = 30, align = 'left', color = 'white', stroke = 'black', pos) {
  return {
    txt,
    size,
    align,
    color,
    stroke,
    pos,
    isDrag: false,
  }
}

function setImg(imgIdx) {
  gMeme.selectedImgId = imgIdx
}

function getLines() {
  return gMeme.lines
}

function getImgById(imgId) {
  const { url } = gImgs.find((img) => imgId === img.id)
  return url
}

function getMeme() {
  return gMeme
}

function getImages() {
  let images = gImgs
  if (gFiltterByImgKey) {
    images = images.filter((image) =>
      image.keywords.some((key) => key.toLowerCase().includes(gFiltterByImgKey.toLowerCase()))
    )
  }
  return images
}

function setLineTxt(line) {
  if (!gMeme.lines.length) _creatNewLine(line, undefined, undefined, undefined, { x: 250, y: 50 })
  else gMeme.lines[gMeme.selectedLineIdx].txt = line
}

function updateFontSize(diff) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (diff === 'increase' && line.size * 10 < gElCanvas.width) line.size++
  else line.size--
}

function setNewLine(newLine, color) {
  gMeme.lines.push(
    _creatNewLine(newLine, undefined, undefined, color, {
      x: 10,
      y: gElCanvas.height / 2,
    })
  )
  gMeme.selectedLineIdx++
}

function setLineDrag(isDrag) {
  if (!gCurrLineClicked) return
  gMeme.lines.forEach((line) => {
    if (line.pos.y === gCurrLineClicked.pos.y) line.isDrag = isDrag
  })
}

function setLineSelect() {
  if (gLineDiff === 'up' && gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
  else if (gMeme.selectedLineIdx === 0) {
    gMeme.selectedLineIdx++
    gLineDiff = 'up'
  } else {
    gLineDiff = 'down'
    gMeme.selectedLineIdx--
  }
}

function setRemoveLine() {
  if (gMeme.lines.length === 0) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
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

function moveLine(dx, dy) {
  gMeme.lines.forEach((line) => {
    if (line.isDrag) {
      line.pos.y += dy
      line.pos.x += dx
    }
  })
}

function isLineClicked(pos) {
  const lines = getLines()
  const clickedLine = lines.find((line) => {
    return (
      pos.y < line.pos.y &&
      pos.y > line.pos.y - gCtx.measureText(line.txt).fontBoundingBoxAscent &&
      pos.x > line.pos.x &&
      pos.x < line.pos.x + gCtx.measureText(line.txt).width
    )
  })
  if (clickedLine) gCurrLineClicked = clickedLine
  return clickedLine
}

function setFilterByImgKey(key) {
  gFiltterByImgKey = key
}
