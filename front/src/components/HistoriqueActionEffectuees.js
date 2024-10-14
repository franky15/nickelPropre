import React,{useState, useEffect} from 'react';

const HistoriqueActionEffectuees = ({itemUpdateChoice}) => {
    
    useEffect(() => {

        console.log('itemUpdateChoice', itemUpdateChoice);
        
    }, [itemUpdateChoice]);
    
    return (
        <div>
            HistoriqueAction
        </div>
    );
};

export default HistoriqueActionEffectuees;