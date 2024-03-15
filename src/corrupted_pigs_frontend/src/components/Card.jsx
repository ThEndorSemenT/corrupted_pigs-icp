import React from 'react'

const Card = ({ value, onClick }) => {
    return <button onClick={onClick}>{value}</button>;
}

export default Card