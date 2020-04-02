import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return (
        <div className="tc ">
            <input type="search" className="f4 pa2 pr4 pl4 ma2 shadow3" onChange={onInputChange} />
            <button className="f4 pa2 pr4 pl4 ma2" onClick={onButtonSubmit} >Detect </button>
        </div>
    )
}

export default ImageLinkForm;