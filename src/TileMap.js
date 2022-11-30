import Pacman from "./Pacman.js";

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.yellowDot = new Image();
        this.yellowDot.src = "../images/yellowDot.png";
        this.wall = new Image();
        this.wall.src = "../images/wall.png";
        // this.
    }

    // 1 -> wall
    // 0 -> Dot
    // 4 -> pacman

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    draw(ctx) {
        for (let row = 0; row < this.map.length; ++row) {
            for (let col = 0; col < this.map[row].length; ++col) {
                let tile = this.map[row][col];
                if (tile === 1) this.#drawWall(ctx, col, row, this.tileSize);
                if (!tile) this.#drawDot(ctx, col, row, this.tileSize);

                ctx.strokeStyle = "yellow";
                ctx.strokeRect(
                    col * this.tileSize,
                    row * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    #drawWall(ctx, column, row, size) {
        ctx.drawImage(
            this.wall,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawDot(ctx, column, row, size) {
        ctx.drawImage(
            this.yellowDot,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    getPacman(velocity) {
        for (let row = 0; row < this.map.length; ++row) {
            for (let col = 0; col < this.map[row].length; ++col) {
                let tile = this.map[row][col];
                if (tile === 4) {
                    this.map[row][col] = 0;
                    return new Pacman(
                        col * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    );
                }
            }
        }
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }
}
