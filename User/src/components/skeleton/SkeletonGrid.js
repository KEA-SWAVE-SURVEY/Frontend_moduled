import React from 'react';
import '../../styles/SkeletonStyles.css'

function SkeletonGrid(props) {
    const dummy = Array.from({length: 8}, () => 0);

    return (
        <>
            {dummy.map((dummy,index) => <div key={index} className='grid_skeleton'/>)}
        </>
    );
}

export default SkeletonGrid;