function clippy(text) {
  return `
  /${'-'.repeat(text.length + 2)}\\\r\n\
  |  ${text} |\r\n\
  \\${'-'.repeat(text.length + 2)}/\r\n\
  \\ \r\n\
   \\ \r\n\
      __
     /  \\ \r\n\
     |  | \r\n\
     @  @ \r\n\
     |  | \r\n\
     || |/\ \r\n\
     || || \r\n\
     |\\_/| \r\n\
     \\___/ \r\n\
  `;
}

module.exports = clippy
