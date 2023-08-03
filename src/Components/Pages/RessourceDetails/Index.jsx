import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import images
import spinner from '../../../assets/img/spinner.svg';

function RessourceDetails() {
    const { id } = useParams();
    const [ressourceInfos, setRessourceInfos] = useState(null);
    const [resourcesUsedInRecipes, setResourcesUsedInRecipes] = useState(null);

    useEffect(() => {
        axios.get(`https://api.dofusdu.de/dofus2/fr/items/resources/${id}`)
            .then((res) => {
                setRessourceInfos(res.data);
            })
            .catch((err) => {
                console.log('err', err);
            })
    }, [id]);

    useEffect(() => {
        axios.get(`https://api.dofusdu.de/dofus2/fr/items/resources/all`)
            .then((res) => {
                setResourcesUsedInRecipes(res.data.items);
            })
            .catch((err) => {
                console.log('err', err);
            })
    }, []);

    return (
        <main>
            {ressourceInfos ? (
                <div className='item-pos'>
                    <article>
                        <div className="item-head-position">
                            <div className="item-head-infos">
                                <h3>{ressourceInfos?.name}</h3>
                                <p>Niveau {ressourceInfos?.level} - Pods {ressourceInfos?.pods}</p>
                                <p className="txt-green-itemset">{ressourceInfos?.type?.name}</p>
                            </div>
                            <div className="item-head-img">
                                <img src={ressourceInfos?.image_urls?.hq} alt="hq" />
                            </div>
                        </div>

                        {resourcesUsedInRecipes && (
                            <div className="recipe-pos">
                                <ul>
                                    {resourcesUsedInRecipes?.map((resource, index) => (
                                        <li key={index}>
                                            <span>
                                                {ressourceInfos?.recipe?.map((recip) => {
                                                    if (recip.item_ankama_id === resource.ankama_id) {
                                                        return (
                                                            <span key={recip?.item_ankama_id} className="recipe-line">
                                                                <img src={resource?.image_urls?.hd} alt={resource?.name} />
                                                                <a href={`../${resource.type.name.trim().toLowerCase()}/${recip.item_ankama_id}`} rel='noreferrer' target='_blank'>{recip?.quantity} {resource?.name}</a>
                                                            </span>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <h4 className="h4-desc">Description</h4>
                        <p className="item-description">{ressourceInfos.description}</p>
                    </article>
                </div>
            ) : (
                <div className="spinner-pos">
                    <img src={spinner} alt="Chargement des données en cours" />
                </div>
            )}
        </main>
    )
}

export default RessourceDetails;