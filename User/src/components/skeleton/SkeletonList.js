import React from 'react';
import '../../styles/SkeletonStyles.css'

function SkeletonList(props) {
    const dummy = Array.from({ length: 5 }, () => 0);

    return (
        <>
            {dummy.map((dummy, index) => {
                return (
                    <>
                        <div className='grid_wrapper' key={index}>
                            <div className='list_skeleton' key={index}></div>
                            <div className='list_skeleton' key={index}></div>
                            <div className='list_skeleton' key={index}></div>
                        </div>
                        {index % 5 !== 4 && (
                            <hr style={{ width: '90%', height: '0.1vh', border: 'none', backgroundColor: '#1b0278', opacity: '0.3' }} />
                        )}
                    </>
                )
            })
            }
        </>
    );
}

export default SkeletonList;