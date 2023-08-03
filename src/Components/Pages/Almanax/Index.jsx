import { useState, useEffect } from 'react';
import axios from 'axios';

function Almanax() {
    const [almanax, setAlmanax] = useState([]);

    const getAlmanax = async () => {
        const response = await axios.get('https://api.dofusdu.de/dofus2/fr/almanax');
        setAlmanax(response.data);
    }

    useEffect(() => {
        getAlmanax();
    }, [])

    return (
        <main>
            <h2>Almanax</h2>

            <div className='almanax-pos'>
                {almanax.length > 0 ? (
                    almanax.map((almanax, index) => 
                        <section key={index} className='almanax-card'>
                            <h3>{almanax.date}</h3>
                            <img src={almanax.tribute.item.image_urls.hq} alt="HQ" />
                            <p className='almanax-item'>{almanax.tribute.quantity}x {almanax.tribute.item.name}</p>

                            <div className='div-separator-line'></div>

                            <p className='almanax-type'>Type: {almanax.bonus.type.name}</p>
                            <div className='almanax-txt-desc'>
                                <p>{almanax.bonus.description}</p>
                            </div>

                        </section>
                    )
                ) : (
                    <div className='almanax-box-error'>
                        <p className='txt-red'>Problème de récupération de l'Almanax</p>
                        <button onClick={getAlmanax} className='btn-almanax'>Afficher l'almanax</button>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Almanax;