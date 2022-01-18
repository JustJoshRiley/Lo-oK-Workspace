import React, {useState} from "react";
import Firefly from "firefly-react";
import './hero.css';

function Hero() {
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
    const colors = ["#ffbad2", "#d48b99", "#bb6e7d"];

    window.addEventListener(
        "resize",
        (e) => {
        setCanvasHeight(window.innerHeight);
        setCanvasWidth(window.innerWidth);
        },
        false
    );

    return(
        <>
        <Firefly
        id="Canvas"
        className='firefly-react'
        canvasWidth={canvasWidth} 
        canvasHeight={canvasHeight}
        colors={colors}
        />
        <div className="HeroContainer">
            <h1 className="Header">( L<a className="header-o">o</a>-<a className="header-o">o</a>K )</h1>
            <h2 className="Subtext">A New Way To Search</h2>
        </div>
        </>
    )
}

export default Hero;  