import React from 'react';

const Cancel = () => {

    console.log('**** bienvenue dans  Cancel');
    
    return (
        <div className='cancelComponent'>
            <h1>Paiement annulé <i class="fa-solid fa-ban"></i></h1>
            <p 
                
            >Votre paiement a été annulé. Si vous souhaitez réessayer, veuillez recommencer la procédure.</p>
        </div>
    );
};

export default Cancel;
