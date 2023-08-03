import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function Equipements() {
    const [equipements, setEquipements] = useState([]);
    const [selectedEquipement, setSelectedEquipement] = useState(null);
    const [itemInfos, setItemInfos] = useState([]);
    const [showRecipe, setShowRecipe] = useState(false);
    const [resources, setResources] = useState([]);
    const [resourcesUsedInRecipes, setResourcesUsedInRecipes] = useState([]);

    const getEquipements = async () => {
        const response = await axios.get('https://api.dofusdu.de/dofus2/fr/items/equipment/all');
        setEquipements(response.data.items.flat()); // Nous concaténons tous les tableaux d'équipements ici
    }

    const getRessources = async () => {
        const response = await axios.get('https://api.dofusdu.de/dofus2/fr/items/resources/all');
        setResources(response.data.items.flat()); // Nous concaténons tous les tableaux de ressources ici
    }

    useEffect(() => {
        getEquipements();
        getRessources();
    }, []);

    // Extraction des noms des équipements pour l'AutoComplete
    const equipementNames = equipements.length > 0 ? equipements.map((equipement) => equipement.name) : [];
    const uniqueEquipementNames = Array.from(new Set(equipementNames));

    // Extraction des noms et images des ressources pour les recettes des équipements


    const handleSearch = () => {
        const selectedItem = equipements.find((equipement) => equipement.name === selectedEquipement)
        if(selectedItem) {
            // Récupération des informations de l'élément sélectionné
            setItemInfos(selectedItem);

            // Récupération des informations des ressources utilisées dans les recettes de l'équipement
            const resourcesUsedInRecipes = selectedItem?.recipe?.map(recipeItem => {
                const resource = resources.find(resource => resource.ankama_id === recipeItem.item_ankama_id);
                return resource;
            });

            setResourcesUsedInRecipes(resourcesUsedInRecipes);
            setShowRecipe(false);
        } else {
            console.log('Equipement non trouvé');
        }
    }

    const handleShowRecipe = () => {
        setShowRecipe(!showRecipe);
    }

    return (
        <main>
            <h2>Rechercher un equipement</h2>

            <div className='autocomplete-pos'>
                <Autocomplete
                    className='autocomplete-equipement'
                    disablePortal
                    id="combo-box-demo"
                    options={uniqueEquipementNames}
                    sx={{ width: 300 }}
                    value={selectedEquipement}
                    onChange={(event, newValue) => newValue ? setSelectedEquipement(newValue) : setSelectedEquipement(null)}
                    renderInput={(params) => <TextField {...params} label="Equipement" />}
                    />

                <Button variant="text" onClick={handleSearch} className='btn-search'>GO</Button>
            </div>

            <div className='item-pos'>
                {selectedEquipement && itemInfos.length !== 0 && (
                    <article>
                        <div className='item-head-position'>
                            <div className='item-head-infos'>
                                <h3>{itemInfos?.name}</h3>
                                <p>{itemInfos?.type?.name} - Niveau {itemInfos?.level}</p>
                                <p className='txt-green-itemset'>{itemInfos?.parent_set?.name ? itemInfos?.parent_set?.name : 'Pas de panoplie associée'}</p>
                                {itemInfos?.is_weapon && (
                                    <p>{itemInfos?.is_two_anded ? `Arme à deux mains - ${itemInfos?.ap_cost} PA` : `Arme - ${itemInfos?.ap_cost} PA`}</p>
                                )}
                                {itemInfos?.range && (
                                    <p>{itemInfos?.range.min} à {itemInfos?.range.max} PO</p>
                                )}
                            </div>
                            <div className='item-head-img'>
                                <img src={itemInfos?.image_urls?.hq} alt="hq" />
                            </div>
                        </div>

                        {showRecipe && resourcesUsedInRecipes ? (
                            <div className="recipe-pos">
                                    <ul>
                                        {resourcesUsedInRecipes.map((resource, index) => {
                                            if (!resource) {
                                                return null; // Retourne null si resouce est null ou undefined
                                            }
                                            return (
                                                <li key={index}>
                                                    <span>
                                                        {itemInfos.recipe.map((recip) => {
                                                            if (recip.item_ankama_id === resource.ankama_id) {
                                                                return (
                                                                <span key={recip.item_ankama_id} className='recipe-line'>
                                                                    <img src={resource.image_urls.hd} alt={resource.name} />
                                                                    <a href={`ressource/${resource.type.name.trim().toLowerCase()}/${resource.ankama_id}`} rel='noreferrer' target='_blank'>{recip.quantity} {resource.name}</a>
                                                                </span>
                                                                );
                                                            }
                                                        return null;
                                                        })}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                            </div>
                        ) : (
                            <>
                                {itemInfos?.effects && <h4>Effets</h4>}
                                {itemInfos?.effects && itemInfos?.effects.map((effect, index) => (
                                    <p key={index} className={effect?.formatted.includes('-') ? 'txt-red' : null}>{effect?.int_minimum} à {effect?.int_maximum} | {effect?.type?.name}</p> 
                                ))}
                            </>
                        )}

                        {showRecipe ? (
                            null
                        ) : (
                            <>
                                <h4 className='h4-desc'>Description</h4>
                                <p className='item-description'>{itemInfos?.description}</p>
                            </>
                        )}

                        <Button variant="text" className='btn-recipe' onClick={handleShowRecipe}>{showRecipe ? 'Effets' : 'Recette'}</Button>
                    </article>
                )}
            </div>
        </main>
    )
}

export default Equipements;