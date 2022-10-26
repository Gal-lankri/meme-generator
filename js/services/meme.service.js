'use strict'

const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
const imgNums = 18
const gImgs = []

_creatImages(imgNums)

function _creatImages(imgNum) {
  for (let i = 1; i < imgNum; i++) {
    gImgs.push(_creatImage(i, `./images/${i}.jpg`, 'funny'))
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
    { txt: 'I sometimes eat Falafel', size: 40, align: 'center', color: 'white' },
    { txt: 'I sometimes eat Falafel', size: 40, align: 'center', color: 'white' },
  ],
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function _creatMeme(imgIdx, lineIdx, lines) {
  return {
    imgIdx,
    lineIdx,
    lines: [lines],
  }
}

function _creatNewLine(txt, size = 40, align = 'center', color = 'white') {
  return {
    txt,
    size,
    align,
    color,
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
  gMeme.lines[gMeme.selectedLineIdx].txt = line
}

function updateFontSize(diff) {
  if (diff === 'increase') gMeme.lines[gMeme.selectedLineIdx].size++
  else gMeme.lines[gMeme.selectedLineIdx].size--
}

function setNewLine(newLine, color) {
  gMeme.lines.push(_creatNewLine(newLine, undefined, undefined, color))
  gMeme.selectedLineIdx++
}
