export default {
  wrap: {
    position           : 'fixed',
    display            : 'block',
    bottom             : '0',
    width              : '100%',
    padding            : '20px',
    boxSizing          : 'border-box',
    backgroundColor    : 'rgba(0, 0, 0, .8)',
    color              : '#eee',
    fontSize           : '20px',
    transitionDuration : '.3s',

    $open: {
      height: '500px',
    },
    $close: {
      height: '80px',
      opacity: '0',
    },
  },

  label: {
    fontSize        : '14px',
    fontWeight      : 'bold',
  },

  button: {
    backgroundColor : 'transparent',
    color           : '#eee',
    fontSize        : '16px',
    outline         : 'none',
    padding         : '4px 10px',
    marginRight     : '15px',
    borderRadius    : '5px',
    borderWidth     : '2px',
  },

  inputWrap: {
    display   : 'block',
    maxWidth  : '350px',
    margin    : '1em',
  },

  input: {
    width           : '100%',
    fontSize        : '20px',
    fontWeight      : '100',
    padding         : '2px 5px',
    backgroundColor : 'transparent',
    color           : '#eee',
    borderWidth     : '0 0 1px',
    borderColor     : '#aaa',
  },

}
