// when the window is fully loaded 
window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    
    // fps and timing
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
    
    // level properties
    var level = {
        x: 1,
        y: 65,
        width: canvas.width - 2,
        height: canvas.height - 66
    };
    
    // game square
    var square = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        xdir: 0,
        ydir: 0,
        speed: 0
    }
    
    // score
    var score = 0;

    // initialize the game
    function init() {
        // mouse event listeners
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);
        
        // initialize game square
        square.width = 100;
        square.height = 100;
        square.x = level.x + (level.width - square.width) / 2;
        square.y = level.y + (level.height - square.height) / 2;
        square.xdir = 1;
        square.ydir = 1;
        square.speed = 200;
        
        // initialize score
        score = 0;
    
        // enter main loop
        main(0);
    }
    
    // Main loop
    function main(tframe) {
        // request animation frames
        window.requestAnimationFrame(main);
        
        // update and render game
        update(tframe);
        render();
    }
    
    // Uupdate game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        
        // update fps counter
        updateFps(dt);
        
        // move game square, time-based
        square.x += dt * square.speed * square.xdir;
        square.y += dt * square.speed * square.ydir;
        
        // handle left and right collisions with the level border
        if (square.x <= level.x) {
            // left edge
            square.xdir = 1;
            square.x = level.x;
        } else if (square.x + square.width >= level.x + level.width) {
            // right edge
            square.xdir = -1;
            square.x = level.x + level.width - square.width;
        }
        
        // handle top and bottom collisions with the level border
        if (square.y <= level.y) {
            // top edge
            square.ydir = 1;
            square.y = level.y;
        } else if (square.y + square.height >= level.y + level.height) {
            // bottom edge
            square.ydir = -1;
            square.y = level.y + level.height - square.height;
        }
    }
    
    function updateFps(dt) {
        if (fpstime > 0.25) {
            // calculate frames per second
            fps = Math.round(framecount / fpstime);
            
            // reset time and frame count
            fpstime = 0;
            framecount = 0;
        }
        
        // increase time and frame count
        fpstime += dt;
        framecount++;
    }
    
    // render the game
    function render() {
        // draw the frame
        drawFrame();
        
        // draw game square
        context.fillStyle = "#0776B6";
        context.fillRect(square.x, square.y, square.width, square.height);
        
        // draw current score within game square
        context.fillStyle = "#C3D3DC";
        context.font = "42px Verdana";
        var textdim = context.measureText(score);
        context.fillText(score, square.x+(square.width-textdim.width)/2, square.y+65);
    }
    
    // draw the game frame with a border
    function drawFrame() {
        // draw background and border
        context.fillStyle = "#4B4B4B";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#F0F0F0";
        context.fillRect(1, 1, canvas.width-2, canvas.height-2);
        
        // draw header
        context.fillStyle = "#737373";
        context.fillRect(0, 0, canvas.width, 65);
        
        // draw title
        context.fillStyle = "#FFFFFF";
        context.font = "24px Verdana";
        context.fillText("HTML5 Canvas Game Test", 10, 30);
        
        // display fps
        context.fillStyle = "#FFFFFF";
        context.font = "10px Verdana";
        context.fillText("Fps: " + fps, 15, 50);
    }
    
    // mouse event handlers
    function onMouseMove(e) {}
    
    function onMouseDown(e) {
        // get mouse position
        var pos = getMousePos(canvas, e);
        
        // check to see if square clicked
        if (pos.x >= square.x && pos.x < square.x + square.width &&
            pos.y >= square.y && pos.y < square.y + square.height) {
            
            // increase score
            score += 1;
            
            // increase game square speed by 5%
            square.speed *= 1.05;
            
            // give game square a random position
            square.x = Math.floor(Math.random()*(level.x+level.width-square.width));
            square.y = Math.floor(Math.random()*(level.y+level.height-square.height));
            
            // give game square a random direction
            square.xdir = Math.floor(Math.random() * 2) * 2 - 1;
            square.ydir = Math.floor(Math.random() * 2) * 2 - 1;
        }
    }
    
    function onMouseUp(e) {}
    function onMouseOut(e) {}
    
    // get mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }
    
    // call init function to start game
    init();
};