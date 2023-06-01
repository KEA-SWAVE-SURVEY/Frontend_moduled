import React from 'react';
import styles from "../../../styles/sidebar.module.css";

function SidebarGPTResponse(props) {
    return (
        <div className={styles.gptResponseItem} onClick={props.onClick}>
            <div className={styles.gptResponseItemType}>{props.question.type}</div>
            <div className={styles.gptResponseItemTitle}>{props.question.title}</div>
        </div>
    );
}

export default SidebarGPTResponse;