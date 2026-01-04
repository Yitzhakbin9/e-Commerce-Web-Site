import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // BrowserRouter - זהו middleWare שמאפר לי מעבר בין עמוידם 

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <App />
    </BrowserRouter>

)
