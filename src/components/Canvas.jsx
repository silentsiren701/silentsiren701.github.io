import React, { useRef, useEffect, useState } from "react";
import config from "../config.json"

const Canvas = (props) => {
    const { draw, loadingContext, ...rest } = props;
    const canvasRef = useRef(null);

    let board;
    
    let context;
    // First Onload
    useEffect(() => {
        board = canvasRef.current;

        board.width = config.tileSize * config.columns;;
        board.height = config.tileSize * config.rows;
        context = board.getContext("2d");

        loadingContext(context);

    }, []);


    // Subsequent updates
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const render = () => {
            requestAnimationFrame(render);

            draw(context);
        };
        render();


        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
