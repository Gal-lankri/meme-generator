'use strict'
const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

const gImgs = [{ id: 1, url: '/images/1.jpg', keywords: ['funny', 'cat'] }]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{ txt: 'I sometimes eat Falafel', size: 40, align: 'center', color: 'white' }],
}

function _creatMeme(imgIdx, lineIdx, lines) {
  return {
    imgIdx,
    lineIdx,
    lines: [lines],
  }
}

function _creatMemes() {}

function getImgById(imgId) {
  const { url } = gImgs.find((img) => imgId === img.id)
  return url
}

function getMeme() {
  return gMeme
}

function setLineTxt(line) {
  gMeme.lines.push(line)
}
