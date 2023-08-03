import './style/style.css';

import Header from './Components/UI/Header/Index';
import Router from './router/index.routes';
import Footer from './Components/UI/Footer/Index';

function App() {
    return (
        <>
            <Header />
            <Router />
            <Footer />
        </>
    );
}

export default App;