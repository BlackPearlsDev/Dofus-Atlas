import { useState, useEffect } from 'react';
import axios from 'axios';

function Montures() {
    const [mounts, setMounts] = useState([]);

    const getMounts = async () => {
        const response = await axios.get('https://api.dofusdu.de/dofus2/fr/mounts/all');
        setMounts(response.data.mounts.flat());
    }

    useEffect(() => {
        getMounts();
    }, []);

    return (
        <main>
            <p className='txt-align'>Si des images ne chargent pas correctement, n'hésitez pas à refresh la page.</p>
            <section className='mount-pos'>
                {mounts.map((mount, index) => (
                    <div key={index} className='mount-card'>
                        <img src={mount.image_urls.hd} alt={mount.name} />
                        <p>{mount.name}</p>
                        <div className='bottom-line'></div>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Montures;