import cat from '../assets/meow.png';
import '../App.css';
import PlayerCard from '../components/PlayerCard';
import { Link } from "react-router-dom";
import { SocketContext, socket} from '../context/socket';
import { useEffect, useContext, useState, useRef } from 'react';
import { Cookie } from '@mui/icons-material';


const gameTitle = {
  fontSize: "6vh",
  color: "#707070",
  padding: "20px",
  marginLeft:"auto",
  marginRight:"auto",
  fontWeight: '600',
  
}

const cardsS = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding:'10px',
}

const btnStyle = {
  marginLeft: 'auto',
  fontSize: '3vh',
  marginRight: 'auto',
  textAlign: 'center',
  justifyContent: "center",
  border: '5px solid #FFCEE6',
  width: '150px',
  padding: '15px',
  borderRadius: '25px',
  backgroundColor: 'white'
  
}

const cardStyle={
    margin: "10px",
    backgroundColor: "#E6F8FF",
    width: '80%',
    maxWidth: '400px',
    height: '30vh',
    borderRadius: '40px',
    justifyContent: 'center',
    padding: '10px',
    marginTop: "4vh",
    border: '0.5px solid #707070',
}



let inputStyle = {

    fontSize: '2.5vh',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    border: 'none',
    color: '#707070',
    borderRadius: "5px",
    marginTop: '3vh',
    marginBottom: '3vh'
    

}

function joinRoom(room){
    if(room !== "" && room !== null){
        document.cookie = "Room ="+room
        socket.emit("join_room", room)
    }
}

function createRoom(room){
    if(room !== "" && room !== null){
        document.cookie = "Room ="+room
        socket.emit("make_room", room)
    }else{
        console.log("value is null or empty")
    }
}


export default function Home() {
    
    const inputRef = useRef(null)
    const joinRef = useRef(null)
    const [joinroom,setRoom] = useState(null)
    const [makeroom,setMakeRoom] = useState(null)

    // const pp = useContext(SocketContext)

    useEffect( () => {
        if(joinroom!=null){
            joinRoom(joinroom)
        }
    },[joinroom])
    useEffect( () => {
        if(makeroom!=null){
            createRoom(makeroom)
        }
    },[makeroom])


  return (
    <>
      <div style={{justifyContent: "center",textAlign:'center'}}> 
        <div style={gameTitle}>Dots•</div>
        <div style={gameTitle}> & Boxes☐ </div>  
      </div>
      <div style={{fontSize: "4vh",color: "#707070", textAlign: 'center'}}>Welcome! Please select what you would like to do!</div>

      <div style={cardsS}>
        <div style={cardStyle}>
            <p style={{textAlign: 'center',fontSize: '3vh'}}>JOIN A LOBBY</p>
            <input ref={joinRef} style={inputStyle} placeholder="lobby password"></input>
            <div style={btnStyle} onClick={ ()=> setRoom(inputRef.current.value)}>
                <Link to="/Lobby" style={{ textDecoration: 'none',color: '#707070'}}>JOIN</Link> 
            </div>
        </div>
        <div style={cardStyle}>
            <p style={{textAlign: 'center',fontSize: '3vh'}}>CREATE MY OWN</p>
            <input ref={inputRef} style={inputStyle} placeholder="set a password"></input>
            <div style={btnStyle} onClick={()=> setMakeRoom(inputRef.current.value)}>
                <p style={{fontSize: "3vh", cursor: "pointer",padding: "0",margin: "0"}}> CREATE</p>
                {/* <Link to="/Lobby" style={{ textDecoration: 'none',color: '#707070'}} >CREATE</Link>  */}
            </div>
        </div>

      </div>
   

    </>
  );
}


