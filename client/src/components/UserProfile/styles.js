import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 15,
    width: '90vw',
    height: '70vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryContainer:{
    borderRadius: 15,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardContainer:{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
   
  },
  /*
  cardContentContainer:{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "yellow",
  },
  divFlex:{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "pink",
  },
  */
  gridInner:{
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  sendFriend:{
      padding: '8px 20px',
  },
  center:{
      textAlign: 'center',
  },
  paperColor:{
      backgroundColor:"white",
      display:'flex',
      flexDirection: "column",
      flexBasis:'100%',
  },
  paperLength:{
      display:'flex',
      flexDirection:'row',
      flexBasis:'80%',
     
  },
  line:{
      width:'95%',
      margin:'auto',
      color: 'rgb(116,113,113)',
  },
  buttonWidth:{
      width:'95%',
  },
  /*
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  */
  
}));