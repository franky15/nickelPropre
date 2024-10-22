import React from 'react';

const Cancel = () => {

    console.log('**** bienvenue dans  Cancel');
    
    return (
        <div className='cancelComponent'>
            <h1>Paiement annulé <i class="fa-solid fa-ban"></i></h1>
            <p 
                
            >Votre paiement a été annulé. Si vous souhaitez réessayer, veuillez recommencer la procédure.</p>

            <p>
                <a href='http://localhost:3001/stripe/paiement/15/9'>Recommencer</a>
            </p>
        </div>
    );
};

export default Cancel;