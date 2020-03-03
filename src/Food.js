import React from 'react';

const Food = ({ food, foodColor }) => {
    const style = {
        left: `${food[0]}%`,
        top: `${food[1]}%`, 
        background: foodColor || '#DC143C',
    };

    return (
        <div className="snakeFood" style={style} />
    );
}

export default React.memo(Food);