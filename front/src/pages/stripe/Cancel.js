import React from 'react';

const Cancel = () => {

    console.log('**** bienvenue dans  Cancel');
    
    return (
        <div className='succesComponent'>
            <h1>Paiement annulé</h1>
            <p 
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >Votre paiement a été annulé. Si vous souhaitez réessayer, veuillez recommencer la procédure.</p>
        </div>
    );
};

export default Cancel;
