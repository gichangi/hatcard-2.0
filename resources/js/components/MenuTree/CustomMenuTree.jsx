import Box from "@mui/material/Box";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {useEffect, useState} from "react";
import {apiFetch} from "../../assets/api/utils";
import _ from "lodash";


function CustomMenuTree({numberOfItems, selectedItem, defaultSelected = []}) {
    const [menuItems, setMenuItems] = useState([]);
    const [menuTree, setMenuTree] = useState([]);
    const [selected, setSelected] = useState(defaultSelected);

    useEffect(()=>{
        apiFetch('GET',{},'/api/menu-items',{}).then(res=>{
            let temp = [];
            res.data.menu_items.forEach(i =>{
                temp.push({
                    "name":i.name,
                    "id":i.id,
                    order_id:i.order_id,
                    //parent_id:i.parent_id !== null || parent_id !== undefined  ? i.parent_id:null
                    parent_id:i.parent_id
                });
            })
            setMenuItems(temp);
            const result = _.orderBy(temp,'order_id','desc').reduce((acc, item) => {
                acc.set(item.id, item)
                let parent = [];
                if(item.parent_id  === null){
                    parent = acc.get('root')
                }else{
                    parent = acc.get(item.parent_id).children ??= [];
                }
                parent.push(item)

                return acc
            }, new Map([['root', []]])).get('root')
            setMenuTree([...result]);

        })

    },[]);

    function getChildById(node, id,parent_level) {
        let array = [];
        function getAllChild(nodes = null) {
            if (nodes === null || nodes.level >parent_level+1) return [];
            array.push(nodes.id);
            if (nodes.level <= parent_level+1 && Array.isArray(nodes.children)) {
                nodes.children.forEach(node => {
                    array = [...array, ...getAllChild(node)];
                    array = array.filter((v, i) => array.indexOf(v) === i);
                });
            }
            return array;
        }

        function getNodeById(nodes, id) {
            if (nodes.id === id ) {
                return nodes;
            } else if ( nodes.level <= parent_level+1 && Array.isArray(nodes.children)) {
                let result = null;
                nodes.children.forEach(node => {
                    if (!!getNodeById(node, id)) {
                        result = getNodeById(node, id);
                    }
                });
                return result;
            }

            return null;
        }

        // props.setOUParam(selected.length > 0?'&dimension=ou:'+_.join(selected ,';'):null);
        return getAllChild(getNodeById(node, id));
    }

    function getOnChange(checked, nodes) {
        const allNode= getChildById(nodes, nodes.id, nodes.level);
        let array = checked
            ? [...selected, ...allNode]
            : selected.filter(value => !allNode.includes(value));

        array = array.filter((v, i) => array.indexOf(v) === i);
        if(numberOfItems === 'single' && array.length >=2){
            array.shift()
        }
        selectedItem(array);
        setSelected(array);
    }

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selected.some(item => item === nodes.id)}
                            onChange={event =>
                                getOnChange(event.currentTarget.checked, nodes)
                            }
                            onClick={e => e.stopPropagation()}
                        />
                    }

                    label={<>{nodes.name}</>}
                    key={nodes.id}
                />
            }
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map(n => renderTree(n))
                : null}
        </TreeItem>


    );
    return (
        <>
            <Typography id="demo-radio-buttons-group-label"  style={{color:'#fff',fontWeight:'bold',marginTop:'10px',padding:'10px', backgroundColor:"rgb(15, 105, 125)",fontSize:'18px', marginBottom:'5px'}}>Select Menu</Typography>
            {menuTree.length >0 &&
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {menuTree.map((node,i)=>(
                        <>
                            {renderTree(node)}
                        </>

                    ))}

                </TreeView>
            }
        </>
    );
}

export default CustomMenuTree;
