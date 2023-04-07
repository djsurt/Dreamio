import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    background: 'rgb(255,253,208)',
    //Maybe add something like backgroundColor: "red", instead of red try to find a better looking color
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  fileInput: {
      margin: '10px 10px 10px 10px',
  },
  buttonSubmit: {
    margin: '15px',
    color: 'white',
    background: 'linear-gradient(45deg, #808080 30%, #FF0000 90%)',
  },
  buttonClear: {
      color: 'white',
      background: 'linear-gradient(45deg, #808080 30%, #0000FF 90%)',
  },
  textareaMessage: {
      width: '94.5%',
      background: 'rgb(255,253,208)',
  },

}));