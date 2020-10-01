import React, { useEffect } from 'react'

export default function WhouseDetailsGraph({ activeWarehouse }) {
    let [currentWH] = activeWarehouse.filter(wh => wh.active);
    currentWH = currentWH.name;
    const URL = `wh-${currentWH}-history.json`;
    function getMonthesData() {
        fetch(URL, {
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(data => {
                return drawCompData(data)
            })
            .catch(e => {
                console.error(`\x1b[43m${e}`)
                return toggleErr(e)
            })

    }
    function drawCompData(data) {

        // getting the fetched data

        const monthInvetoryData = data;

        // and mapping it for using later to draw

        const lineGraph = monthInvetoryData.map(item => item.quantity);
        const monthGraph = monthInvetoryData.map(item => item.month);
        const monthGraphNames = monthGraph.map(month => {
            return new Date(month.toLocaleString("en-us", { month: "short" }))
        })
        for (let i = 0; i < monthGraphNames.length; ++i) {
            monthGraphNames[i] = monthGraphNames[i].toString().substr(3, 5).trim();
        }

        // scaling the canvas before building and drawing

        const canvasHeight = (Math.max(...lineGraph) + 50);
        let monthesLength = monthGraphNames.length;
        const canvasWidth = monthesLength * 100;
        scaleCanvasWidth(canvasWidth);
        scaleCanvasHeight(canvasHeight);
        // drawing main canvas

        const canvas = mainCanvasRef.current;
        const middleX = canvas.width / 2;
        const middleY = canvas.height / 2;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "lightblue";
        ctx.strokeStyle = '#008fb0';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, middleY);
        let i, lineLength, monthX;
        lineLength = lineGraph.length;
        monthX = 0;
        for (i = 0; i < lineLength; ++i) {
            monthX += 100;
            ctx.lineTo(monthX, lineGraph[i]);
            ctx.save();
            ctx.font = "20px Arial";
            ctx.fillStyle = "red";
            ctx.translate(monthX, lineGraph[i])
            ctx.rotate(Math.PI);
            ctx.fillText(lineGraph[i], 10, 0);
            ctx.rotate(Math.PI * (-1));
            ctx.restore();
        }
        ctx.stroke();

        // drwing secondary canvas

        const scaleSecondaryCanvas = scaleCanvasRef.current;
        const scaleCtx = scaleSecondaryCanvas.getContext("2d");
        monthX = 0;
        scaleCtx.font = "15px Comic Sans";
        for (i = monthesLength - 1; i >= 0; --i) {
            let currentMonth = monthGraphNames[i];
            scaleCtx.fillText(currentMonth, monthX, 10);
            monthX += 100;
        }

        // arrow line
        ctx.beginPath();
        ctx.moveTo(middleX, 20);
        ctx.lineTo(middleX + 80, 20);
        ctx.stroke();
        // arrow head
        ctx.beginPath();
        ctx.moveTo(middleX + 60, 1);
        ctx.lineTo(middleX + 80, 20);
        ctx.lineTo(middleX + 60, 40);
        ctx.stroke();
    }
    const [err, handleErr] = React.useState('');
    const toggleErr = (error) => {
        if (!error) return;
        if (typeof error === 'object' && error.message.includes("Unexpected token")) {
            const httpError = new Error("can't retrieve data - connection or parsing syntax problem")
            console.log(`\x1b[35mCustom dev msg ${httpError}`);
            setTimeout(() => { // UX
                handleErr("Time line can't be shown in graph");
            }, 500);
        }
    };

    const [width, setWidth] = React.useState(500);
    const scaleCanvasWidth = (canvasWidth) => setWidth(canvasWidth);

    const [height, setHeight] = React.useState(300);
    const scaleCanvasHeight = (canvasHeight) => setHeight(canvasHeight);


    // relating to canvas el
    const mainCanvasRef = React.createRef();
    const scaleCanvasRef = React.createRef();

    useEffect(() => {
        getMonthesData();
    });

    // styling
    const [graphHeadLine, mainCanvasStyle, secondaryCanvasStyle] = [
        { fontFamily: 'Comic', color: 'orange' },
        { backgroundColor: "lavender", transform: 'skewX(8deg) rotateX(180deg) rotateY(180deg)' },
        { display: 'block', margin: 'auto', position: 'relative', left: '35px' }
    ];
    const [quantitySpan, yearSpan] = [
        { position: 'absolute' },
        { color: 'cadetblue', zIndex: 1, position: 'relative', bottom: '5px', right: '520px' }
    ];
    // graph date
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div>
            <h5 className="text-info">Graph View</h5>
            {err && <h2 style={{ color: 'red' }} >{err}</h2>}
            <h3 style={graphHeadLine}>Stock History Sketch</h3>
            <canvas
                width={width}
                height={height}
                ref={mainCanvasRef}
                style={mainCanvasStyle}>
            </canvas>
            <span style={quantitySpan}>Stock quantity | (<b className="text-danger">1000</b> per unit)</span>
            <span style={yearSpan}>{year}</span>
            <canvas
                width={width}
                height={100}
                ref={scaleCanvasRef}
                style={secondaryCanvasStyle}
            >
            </canvas>
        </div>
    )
}
