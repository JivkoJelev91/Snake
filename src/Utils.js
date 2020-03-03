export const getRandomCoordinates = () => {
    const [min, max] = [1, 98] // percents
    const x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    const y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
};

export const directions = {
    38: 'UP',
    40: 'DOWN',
    37: 'LEFT',
    39: 'RIGHT'
};

export const initialState = {
    food: getRandomCoordinates(),
    speed: 200,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ]
};