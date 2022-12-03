import cat from '../assets/meow.png';
import '../App.css';
import PlayerCard from '../components/PlayerCard';
import { Link } from "react-router-dom";
import { SocketContext, socket} from '../context/socket';
import { useEffect, useContext, useState } from 'react';


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
  border: '4px solid #FFCEE6',
  width: '150px',
  padding: '15px',
  borderRadius: '25px',
  
}


export default function Lobby() {

  const pp = useContext(SocketContext)
  const [wasPlayerSelected, updatePlayerSelect] = useState([false,false,false])


  useEffect( () => {
    socket.on("recieve_player", (data) => {
      
      let index = data.PlayerNumber-1
      const oldArr = wasPlayerSelected
      let newArr = [...oldArr]
      newArr[index]=true
      updatePlayerSelect(newArr)
    })
}, [pp,wasPlayerSelected]);



  console.log(wasPlayerSelected)

  return (
    <>
      <div style={{justifyContent: "center",textAlign:'center'}}> 
        <div style={gameTitle}>Dots•</div>
        <div style={gameTitle}> & Boxes☐ </div>  
      </div>
      <div style={{fontSize: "4vh",color: "#707070", textAlign: 'center'}}>Welcome! Please select your characters. </div>

      <SocketContext.Provider value={socket}>
      <div style={cardsS}>
        <PlayerCard color="#E6F8FF" num='1' wasSelected={wasPlayerSelected[0]}></PlayerCard>
        <PlayerCard color="#D9FFCE" num='2' wasSelected={wasPlayerSelected[1]} ></PlayerCard>
        <PlayerCard color="#F7D8FF" num='3' wasSelected={wasPlayerSelected[2]}></PlayerCard>
      </div>
      </SocketContext.Provider>
      <div style={btnStyle}>
        <Link to="/game" style={{ textDecoration: 'none',color: '#707070'}}>START</Link> 
      </div>
    </>
  );
}

