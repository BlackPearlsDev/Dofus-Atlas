import React from 'react';

// Import images
import artwork1 from '../../../assets/img/artwork_1.png';
import artwork2 from '../../../assets/img/artwork_2.png';

function Home() {
    return (
        <main className='main-home'>
            <h2>Bienvenue sur Dofus Atlas</h2>
            <p>Votre compagnon de jeu à ne pas manquer</p>
            <p>Retrouvez des informations sur les items, almaxas etc</p>
            {/* <p>Utilisation de l'API: <a href="https://docs.dofusdu.de" target='_blank' rel='noreferrer'>dofusdu</a>.</p> */}
            <div className="artwork-pos">
                <img src={artwork1} alt="Personnage de Dofus" />
                <img src={artwork2} alt="Personnage de Dofus" />
                <div className="smoke"></div>
            </div>
        </main>
    )
}

export default Home;