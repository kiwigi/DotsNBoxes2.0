import { useState } from "react"
import cat from '../assets/meow.png'
import dog from '../assets/woof.png'
import unicorn from '../assets/neigh.png'
import styled from 'styled-components';



function getNextTurn(currPlayer){
    let nextPlayer = 0
    if(currPlayer===3){
        nextPlayer=1
    
    }else{
        nextPlayer ++
    }
return nextPlayer
}

let currentTurn = 1

export default function GameBoard(){
    return(
        <>
        <Wrapper>
            <Row>
                <Square> <TopLeftDot/> <TopRightInnerDot/> <BottomLeftDot/> <BottomRightInnerDot/> <LVLine/> <THLine/> <BHLine/> </Square>
                <Square> <TopRightInnerDot/> <BottomRightInnerDot/> <LVLine/>  <THLine/> <BHLine/>  </Square>
                <Square> <TopRightInnerDot/> <BottomRightInnerDot/> <LVLine/> <THLine/> <BHLine/>  </Square>
                <Square> <TopRightDot/> <BottomRightDot/> <LVLine/> <RVLine/> <THLine/> <BHLine/>  </Square>
            </Row>
            <Row>
                <Square>  <BottomLeftDot/> <BottomRightInnerDot/> <LVLine/>  <BHLine/> </Square>
                <Square>  <BottomRightInnerDot/> <LVLine/>   <BHLine/>  </Square>
                <Square>  <BottomRightInnerDot/> <LVLine/> <BHLine/>  </Square>
                <Square>  <BottomRightDot/> <LVLine/> <RVLine/>  <BHLine/>  </Square>
            </Row>
            <Row>
                <Square>  <BottomLeftDot/> <BottomRightInnerDot/> <LVLine/>  <BHLine/> </Square>
                <Square>  <BottomRightInnerDot/> <LVLine/>   <BHLine/>  </Square>
                <Square>  <BottomRightInnerDot/> <LVLine/> <BHLine/>  </Square>
                <Square>  <BottomRightDot/> <LVLine/> <RVLine/>  <BHLine/>  </Square>
            </Row>

            <Row>
                <Square>  <BottomLeftDot/> <BottomRightInnerDot/> <LVLine/>  <BHLine/> </Square>
                <Square>  <BottomRightInnerDot/> <LVLine/>   <BHLine/>  </Square>
                <Square>  <BottomRightInnerDot/> <LVLine/> <BHLine/>  </Square>
                <Square>  <BottomRightDot/> <LVLine/> <RVLine/>  <BHLine/>  </Square>
            </Row>
        </Wrapper>
        
        
        </>
    )
}

//DOTS
const Dot = styled.div`
    background-color: #707070;
    width: 5vw;
    max-width: 20px;
    max-height: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    z-index: 1;

`
const TopRightDot = styled(Dot)`
    right: -0.5vw;
    top: -0.5vw;

`
const TopRightInnerDot = styled(Dot)`
    right: -1vw;
    top: -0.5vw;

`
const TopLeftDot = styled(Dot)`
    left: -0.5vw;
    top: -0.5vw;  
`
const BottomLeftDot = styled(Dot)`
    bottom: -1vw;
    left: -0.5vw;
`
const BottomRightDot = styled(Dot)`
    bottom: -1vw;
    right: -0.5vw;
`
const BottomRightInnerDot = styled(Dot)`
    bottom: -1vw;
    right: -1vw;
`

//LINES
const HLine = styled.div`
    width: 100%;
    height: 1vw;
    border: 3px solid #FFCEE6;
    border-radius: 25px;
    cursor: pointer;
    position: absolute;
`
const BHLine = styled(HLine)`
    bottom: -1vw;
`
const THLine = styled(HLine)`
    top: -0.5vw;
`

const VLine = styled.div`
    width: 10%;
    height: 100%;
    border: 3px solid #FFCEE6;
    border-radius: 25px;
    cursor: pointer;
    position: absolute;

    `
const RVLine = styled(VLine)`
    right: -0.5vw;
`
const LVLine = styled(VLine)`
    left: -0.5vw;
`

//WRAPPER
const Wrapper = styled.div`
    width: 90vw;
    aspect-ratio: 1;
    max-width: 650px;
    border: 3px solid #FFCEE6;
    border-radius: 50px;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    justify-content: center;
    display: flex;
    flex-direction: column
`
const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`
const Square = styled.div`
    width: 20vw;
    aspect-ratio: 1;
    max-width: 145px;
    max-height: 145px;
    // border: 1px solid black;
    position: relative;
    display: flex;
`
