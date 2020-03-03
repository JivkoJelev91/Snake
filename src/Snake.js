import React from 'react';

const Snake = ({snakeDots, snakeColor}) => {
    return (
        snakeDots.map((dot, i) => {

            const style = {
                left: `${dot[0]}%`, 
                top: `${dot[1]}%`,
                background: snakeColor || '#000',
            };

            return (
                <div className="snakeDot" key={i} style={style} />
            )
        })
    );
}

export default React.memo(Snake);