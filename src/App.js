import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {Layout} from './components';
import {AdminPanel, Home} from './pages';

function App() {
    return (
        <div className="App">
            <Layout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={< Home />}/>
                        <Route path="/admin" element={< AdminPanel />}/>
                    </Routes>
                </BrowserRouter>
            </Layout>
        </div>
    );
}

export default App;
