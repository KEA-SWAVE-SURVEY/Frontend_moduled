import React from 'react';
import '../../styles/SkeletonStyles.css'

function SkeletonGPT(props) {
    const dummy = Array.from({ length: 7 }, () => 0);

    return (
        <>
            {dummy.map((dummy, index) => {
                return (
                    <div className='gpt_skeleton_item' key={index}>
                        <div className='gpt_skeleton_type' key={index}></div>
                        <div className='gpt_skeleton_title' key={index}></div>
                    </div>
                )
            })
            }
        </>
    );
}

export default SkeletonGPT;