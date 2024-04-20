import React, { ReactElement } from "react";
import "./Image.css";

export const imageStatuses = {hidden:"hidden", nextToReveal: "next-to-reveal"};

export default function Image({src, status, onClick}) {
    if (!status) {
        return <img className="image" src={src} />
    }

    let addIcon = null;

    if (status === imageStatuses.nextToReveal) {
        addIcon = <span>+</span>;
    }
    
    return <div className={"image "+ status} onClick={onClick}>{addIcon}</div>
};