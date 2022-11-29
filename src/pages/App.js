import cat from '../assets/meow.png';
import '../App.css';

const gameTitle = {
  fontSize: "6vh",
  color: "#707070",
  padding: "20px",
  marginLeft:"auto",
  marginRight:"auto",
  fontWeight: '600'
}

export default function App() {
  return (
    <>
      <div style={{textAlign: 'center'}}> 
        <div style={gameTitle}>Dots•</div>
        <div style={gameTitle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; & Boxes☐ </div>  
      </div>
      <div style={{fontSize: "4vh",color: "#707070", textAlign: 'center'}}>Welcome! Please select a your characters. </div>
    </>
  );
}

