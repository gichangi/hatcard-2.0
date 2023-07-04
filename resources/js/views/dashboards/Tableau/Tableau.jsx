import { useEffect, useRef } from 'react';
import newtableau from "tableau-api";
const {tableau} = window;
export const  Tableau  =()=> {
    const ref = useRef(null);
    const url =  "http://public.tableau.com/views/RegionalSampleWorkbook/Storms";
    function initViz(){
        const myNode = document.getElementById("tableauBody");
        myNode.innerHTML = '';
        let g = document.createElement('div');
        g.setAttribute("id", "tableauViz");
        myNode.append(g)

        var placeholderDiv = document.getElementById("tableauViz");
        var url = "https://public.tableau.com/views/linelister-dashboard/HIVTreatmentSummary?:language=en-US&:display_count=n&:origin=viz_share_link";
        var options = {
            hideTabs: true,
            width: "800px",
            height: "700px",
            onFirstInteractive: function() {
                // The viz is now ready and can be safely used.
            }
        };
        var viz = new tableau.Viz(placeholderDiv, url, options);
    }
    useEffect(()=>{
        initViz()
    },[])
    return (
        <div id={"tableauBody"} style={{width:'70%', margin:'auto'}}>
            <div id={"tableauViz"} style={{width:'70%', margin:'auto'}}>
                mew
            </div>
        </div>

    );
}
