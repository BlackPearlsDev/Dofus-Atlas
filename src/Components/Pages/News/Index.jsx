import { useState, useEffect } from 'react';
import axios from 'axios';

function News() {
    const [news, setNews] = useState([]);

    const getNews = async () => {
        const response = await axios.get('https://api.dofusdu.de/meta/webhooks/twitter');
        setNews(response.data.subscriptions);
    }

    useEffect (() => {
        getNews();
    }, []);

    return (
        <main>
            <section>
                <h2>Les news</h2>
                <p className='txt-align txt-margin'>Ne ratez plus aucune information et nouveautés sur Dofus, allez voir ce qui se passe !</p>
                <aside className='list-twitter'>
                    {news.length > 0 ? (
                        <ul>
                            {news && news.map((neww, index) => (
                                <li key={index}>
                                    <a key={index} href={`https://twitter.com/${neww}`} target='_blank' rel='noreferrer'>- {neww}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chargement...</p>
                    )}
                </aside>
            </section>
        </main>
    )
}

export default News;