export function classifyStr(str) {
    if (str?.length > 0) return str.replace(/\s+/g, '-').toLowerCase()
  
    return ''
  }