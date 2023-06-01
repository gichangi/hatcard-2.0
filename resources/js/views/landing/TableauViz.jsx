import React, {Component, createRef, useEffect, useRef} from 'react';
import tableau from 'tableau-api';



function TableauViz({vizStyle,vizOptions,vizUrl}) {
    const containerRef = useRef(null);
    const childRef = useRef(null);


    function Child() { // a new component
        const containerDiv =  containerRef.current;
        containerDiv.innerHTML = ''

        let g = document.createElement('div');
        g.setAttribute("id", "vizItem");
        g.setAttribute("ref", childRef);
        containerDiv.append(g)
        //containerDiv .appendChild(`<div id="vizItem" ref={childRef}></div>`)
        //containerDiv .innerHTML =`<div id="vizItem" ref={childRef}></div>`;
    }

    const initViz =()=> {
        Child();
        const options = {
            hideTabs: true,
            width: "1440px",
            height: "1200px",
        }
        //const vizContainer = document.getElementById("vizItem");
        const vizContainer = document.getElementById("vizItem");
        let viz = new window.tableau.Viz(vizContainer, vizUrl,options);
    }
    useEffect(()=>{

        initViz()
    },[])
    return (
        <div ref={containerRef} id="vizContainer"></div>
    );
}

export default TableauViz;
