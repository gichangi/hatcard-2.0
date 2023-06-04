import React, {useState} from 'react';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
import {iconsList} from "./IconsList";

function Index({selectedIcon}) {
    const [icon,setIcon] = useState();
    const handleChange = (value) =>{
        let iconSelected = value === ''?null:value;
        setIcon(iconSelected);

        selectedIcon(iconSelected);
    }
    const iconProps = {
        icons: [...iconsList],
        theme: 'blue',
        renderUsing: 'class',
        value: icon,
        onChange: handleChange,
        isMulti: false,
    }
    return (
        <div className="App">
            <FontIconPicker {...iconProps} />
        </div>
    );
}

export default Index;
