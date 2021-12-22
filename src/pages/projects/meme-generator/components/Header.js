import React from "react"
import trollFace from "../images/troll-face.png"

export default function Header() {
    return (
        <header className="meme--header">
            <img 
                src={trollFace} 
                className="meme--header--image"
            />
            <h2 className="meme--header--title">Meme Generator</h2>
            <h4 className="meme--header--project">React Course - Project 3</h4>
        </header>
    )
}