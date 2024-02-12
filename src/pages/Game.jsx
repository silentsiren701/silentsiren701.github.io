import Canvas from "../components/Canvas";
import config from "../config.json"

export default function Game() {
    //board // can pass this down as prop // slight refactor required
    const tileSize = config.tileSize;
    const rows = config.rows;
    const columns = config.columns;

    //ship
    let ship = {
        x: tileSize,
        y: tileSize * rows - tileSize * 2,
        width: tileSize,
        height:  tileSize * 2,
    };

    let shipImg = new Image();
    shipImg.src = "src/assets/canoe.png";
    let shipVelocityX = tileSize; //ship moving speed

    // rocks
    let rockArray = [];
    const rockWidth = tileSize;
    const rockHeight = tileSize;

    let gameOver = false;

    let rockImg = new Image();
    rockImg.src = "src/assets/rock.png";

    let rockVelocityY = 1; //rock moving speed
    let createRocks = () => {
        let rocksInRow = rockGenerator()
        
        rockArray = []
        // Loop to create rocks
        for (let c = 0; c < rocksInRow.length; c++) {
            if (rocksInRow[c]) {
                // Calculate the x-coordinate of the rock
                let rockX = c * rockWidth;
                let rockY = getRandomInt(rows / 5) * tileSize;

                let rock = {
                    img: rockImg,
                    x: rockX,
                    y: rockY,
                    width: rockWidth,
                    height: rockHeight,
                    alive: true,
                };

                rockArray.push(rock);
            }
        }
    };

    function rockGenerator() {
        let rocksInRow = [Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5];
    
        if (rocksInRow.every(position => position)) {
            rocksInRow[Math.floor(Math.random() * rocksInRow.length)] = false;
        }
        if (rocksInRow.every(position => !position)) {
            rocksInRow[Math.floor(Math.random() * rocksInRow.length)] = true;
        }
        return rocksInRow;
    }

    let getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    function detectCollision(a, b) {
        return (
            a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
            a.x + a.width > b.x && //a's top right corner passes b's top left corner
            a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
            a.y + a.height > b.y    //a's bottom left corner passes b's top left corner
        ); 
    }


    function loadingContext(context) {

        console.log("Out")
        context.clearRect(
            0,
            0,
            context.canvas.width,
            context.canvas.height
        );
        context.fillStyle = "blue";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        let moveShip = (e) => {
            if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
                ship.x -= shipVelocityX; //move left one tile
                console.log("left");
            } else if (
                e.code == "ArrowRight" &&
                ship.x + shipVelocityX + ship.width <= context.canvas.width
            ) {
                console.log("right");
                ship.x += shipVelocityX; //move right one tile
            }
        };
        document.addEventListener("keydown", moveShip);
        createRocks();
        setInterval(createRocks, config.restartTime);
        console.log(rockArray)
    }



    const draw = (context) => {
        if (gameOver) {
            return;
        }

        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
        for (let i = 0; i < rockArray.length; i++) {
            let rock = rockArray[i];
            if (rock.alive) {
                // rock.x += rockVelocityX;
                rockArray[i].y += rockVelocityY;
                //if rock touches the borders
                if (detectCollision(ship, rock)) {
                    gameOver = true;
                }

                context.drawImage(rockImg, rock.x, rock.y, rock.width, rock.height);

                if (rock.y >= context.canvas.height) {
                    rock.alive = false;
                    console.log(rockArray)
                }
            }
        }
    };
    return <Canvas draw={draw} loadingContext={loadingContext}></Canvas>;
}
