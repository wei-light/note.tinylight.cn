function getElementTop(el: Element) {
  return el.getBoundingClientRect().top + window.scrollY
}

export {
  getElementTop,
}
