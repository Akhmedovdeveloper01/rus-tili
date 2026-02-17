import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./page/Home";
import Verbs from "./page/Verbs";
import Words from "./page/Words";
import Game from "./page/Game";
import CardGame from "./components/Game/CardGame";
import QuestionGame from "./components/Game/QuestionGame";
import Practice from "./page/Practice";
import PracticeDetail from "./components/Practice/PracticeDetail";
import Grammar from "./page/Grammar";
import GrammarDetail from "./components/Grammar/GrammarDetail";

function App() {
    return (
        <div>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="verbs" element={<Verbs />} />
                    <Route path="words" element={<Words />} />
                    <Route path="game" element={<Game />} />
                    <Route path="game/card-game" element={<CardGame />} />
                    <Route path="game/question" element={<QuestionGame />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="practice/:id" element={<PracticeDetail />} />
                    <Route path="grammar" element={<Grammar />} />
                    <Route path="grammar/:id" element={<GrammarDetail />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
