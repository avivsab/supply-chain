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
            .catch(e =>  console.error(`\x1b[43m${e}`))

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

        // drawing main canvas

        const canvas = mainCanvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "lightblue";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        let i, lineLength, monthX;
        lineLength = lineGraph.length;
        monthX = 0;
        for (i = 0; i < lineLength; ++i) {
            monthX += 100;
            ctx.lineTo(monthX, lineGraph[i]);
        }
        ctx.stroke();

        // drwing secondary canvas

        const scaleSecondaryCanvas = scaleCanvasRef.current;
        const scaleCtx = scaleSecondaryCanvas.getContext("2d");
        monthX = 0;
        let monthesLength = monthGraphNames.length;
        scaleCtx.font = "15px Comic Sans";
        for (i = 0; i < monthesLength; ++i) {
            let currentMonth = monthGraphNames[i];
            scaleCtx.fillText(currentMonth, monthX, 10);
            monthX += 100;
        }

    }
    const [err, handleErr] = React.useState('');
    const toggleErr = () => { setTimeout(() => {
        handleErr("Time line can't be shown in graph")
    }, 500);
        };


    // relating to canvas el
    const mainCanvasRef = React.createRef();
    const scaleCanvasRef = React.createRef();
    const errRef = React.createRef();

    useEffect(() => {
        getMonthesData();
        toggleErr();
    });
    // styling
    // const graphHeadLine = { fontFamily: 'Comic', color: 'orange' };
    // const mainCanvasStyle = { backgroundColor: "lavender", transform: 'skewX(8deg) rotateX(180deg)' };
    // const secondaryCanvasStyle = { display: 'block', margin: 'auto', position: 'relative', left: '35px' };
    const [graphHeadLine, mainCanvasStyle, secondaryCanvasStyle] = [
        { fontFamily: 'Comic', color: 'orange' },
        { backgroundColor: "lavender", transform: 'skewX(8deg) rotateX(180deg)' },
        { display: 'block', margin: 'auto', position: 'relative', left: '35px' }
    ]
    return (
        <div>
            <h5>Graph View</h5>
            {err && <h2 style={{color: 'red'}} >{err}</h2>}
            <h3 style={graphHeadLine}>Stock History Sketch</h3>
            <canvas
                width={550}
                height={400}
                ref={mainCanvasRef}
                style={mainCanvasStyle}>
            </canvas>
            <span style={{ position: 'absolute' }}>Stock quantity | (1000 per unit)</span>
            <canvas
                width={550}
                height={100}
                ref={scaleCanvasRef}
                style={secondaryCanvasStyle}
            >
            </canvas>

        </div>
    )
}
