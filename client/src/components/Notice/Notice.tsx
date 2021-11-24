import { useEffect, useRef, useState } from "react";
import { INoticeProps } from "./interfaces/INoticeProps";
import './style/Notice.css';

const Notice = (props: INoticeProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.classList.add("notice__show");
    }, []);

    return (
        <div ref={ref} className={`notice ${props.type}`}>
            <div className={`notice__line ${props.type}`}/>
            <div className="notice__text-container">
                <div className={`notice__title ${props.type}`}>{props.type}</div>
                <p className="notice__text">{props.text}</p>
            </div>
        </div>
    )
}

export default Notice;