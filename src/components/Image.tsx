import React from "react";
import "./Image.css";

export enum ImageStatuses {
    HIDDEN = "hidden",
    NEXT_TO_REVEAL = "next-to-reveal",
};

export default function Image({src, status}) {
    if (!status) {
        return <img className="image" src={src} />
    }
    
    return <div className={"image "+ status}></div>
};