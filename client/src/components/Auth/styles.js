import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  imageBed:{
      alignSelf: 'end',
  },
  bubble:{
      width:'50%',
      padding:'2% 2% 2% 2%',
      borderRadius: '20%',
      backgroundColor:'gray',
      alignSelf: 'start',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    color:'white',
    backgroundColor:'black',
    borderRadius: '50%',
    alignSelf: 'center',
    margin: '1% 1% 1% 20%',
  },
  signup:{
      color:'white',
      backgroundColor:'black',
      alignSelf: 'end',
      borderRadius:'50%',
      margin: '1% 25% 1% 1%',
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  makeWhite: {
      color:'white',
      backgroundColor:'green',
  },
}));