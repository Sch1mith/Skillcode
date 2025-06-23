import React, { useState, useEffect } from 'react';
import { Trophy, Zap } from 'lucide-react';
import { LevelSelection } from './components/LevelSelection';
import { Question } from './components/Question';
import { GameOver } from './components/GameOver';
import { questions } from './data/questions';
import type { GameState } from './types/game';
import Homepage from './components/Homepage';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Usuario from './components/Usuario';

function App() {
  // Força sempre mostrar a Homepage ao iniciar
  useEffect(() => {
    localStorage.removeItem('skillcode_user');
  }, []);

  // Persistência do login
  const [user, setUserState] = useState<any>(() => {
    const saved = localStorage.getItem('skillcode_user');
    return saved ? JSON.parse(saved) : null;
  });
  const setUser = (user: any) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('skillcode_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skillcode_user');
    }
  };

  // Hooks SEMPRE no topo
  const [showCreate, setShowCreate] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: null,
    currentQuestionIndex: 0,
    score: 0,
    questions: [],
    gameStarted: false,
    gameFinished: false,
  });
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [showUser, setShowUser] = useState(false);
  const currentIndex = gameState.currentQuestionIndex;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (gameState.gameStarted && !gameState.gameFinished) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - (startTime ?? Date.now()));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.gameStarted, gameState.gameFinished, startTime]);

  // Funções que precisam ser usadas antes do JSX
  const handleLevelSelect = (level: 'junior' | 'pleno' | 'senior') => {
    const levelQuestions = questions.filter(q => q.level === level).map(q => ({ ...q, options: [...q.options] }));
    setGameState({
      ...gameState,
      currentLevel: level,
      questions: levelQuestions,
      gameStarted: true,
    });
    setAnswers(Array(levelQuestions.length).fill(null));
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleRestart = () => {
    setGameState({
      currentLevel: null,
      currentQuestionIndex: 0,
      score: 0,
      questions: [],
      gameStarted: false,
      gameFinished: false,
    });
    setAnswers([]);
    setShowExplanation(false);
    setStartTime(null);
    setElapsedTime(0);
    // Não desloga o usuário, só volta para seleção de nível
    setShowCreate(false);
    setShowLogin(false);
    setShowUser(false);
  };

  // Navegação de telas
  if (!user) {
    if (showCreate) {
      return <CreateAccount onAccountCreated={setUser} onBack={() => setShowCreate(false)} />;
    }
    if (showLogin) {
      return <Login onLogin={setUser} onBack={() => setShowLogin(false)} />;
    }
    return (
      <Homepage
        onCreateAccount={() => { setShowCreate(true); setShowLogin(false); }}
        onLogin={() => { setShowLogin(true); setShowCreate(false); }}
      />
    );
  }

  // Tela de usuário
  if (showUser) {
    return (
      <Usuario user={user} onBack={() => setShowUser(false)} />
    );
  }

  // Se já está logado e não iniciou o quiz, ir direto para seleção de nível
  if (user && !gameState.gameStarted && !gameState.gameFinished) {
    return (
      <div className="min-h-screen grid-background">
        <header style={{ width: '100%', padding: '10px 0', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '2px solid #00FFFF' }}>
          <img src="../../homepage/logotipo.png" alt="Logo SkillCode" style={{ width: 120, height: 'auto', pointerEvents: 'none', userSelect: 'none', filter: 'drop-shadow(0 0 8px #00FFFF)' }} />
        </header>
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 neon-text">
              Escolha seu nível
            </h2>
            <p className="text-xl text-gray-300">
              Domine o desenvolvimento web através do código
            </p>
          </div>
          <LevelSelection onSelectLevel={handleLevelSelect} onUserClick={() => setShowUser(true)} />
        </main>
      </div>
    );
  }

  // Quiz principal
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = gameState.questions[currentIndex];
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = answerIndex;
    setAnswers(updatedAnswers);
    if (
      answers[currentIndex] === null &&
      answerIndex === currentQuestion.correctAnswer
    ) {
      setGameState(prev => ({ ...prev, score: prev.score + 1 }));
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex === gameState.questions.length - 1) {
      setGameState(prev => ({ ...prev, gameFinished: true }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setShowExplanation(answers[currentIndex + 1] !== null);
    }
  };

  function inicio() {
    handleRestart();
  }

  return (
    <div className="min-h-screen grid-background">
      <header className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-[#00FFFF]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={handleRestart}><h1 className="text-4xl font-bold neon-text"><img src="../../homepage/logotipo.png" alt="Logo SkillCode" className="logo" width="800" /></h1></button>
            </div>
            {gameState.gameStarted && !gameState.gameFinished && (
              <div className="flex items-center gap-3">
                <button onClick={inicio}><h1 className='text-4x1 font-bold neon-text'>Ínicio</h1></button>
              </div>
            )}
            {gameState.gameStarted && !gameState.gameFinished && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-[#39FF14]" />
                  <span className="text-[#39FF14] font-bold">{gameState.score}</span>
                </div>
                <div className="text-gray-300">
                  {currentIndex + 1} / {gameState.questions.length}
                </div>
                <div className="text-[#00FFFF] font-mono text-sm">
                  ⏱️ {formatTime(elapsedTime)}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!gameState.gameStarted && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 neon-text">
                Escolha seu nível
              </h2>
              <p className="text-xl text-gray-300">
                Domine o desenvolvimento web através do código
              </p>
            </div>
            <LevelSelection onSelectLevel={handleLevelSelect} onUserClick={() => setShowUser(true)} />
          </>
        )}
        {gameState.gameStarted && !gameState.gameFinished && (
          <Question
            question={gameState.questions[currentIndex]}
            onAnswer={handleAnswer}
            showExplanation={showExplanation}
            selectedAnswer={answers[currentIndex]}
            currentQuestion={currentIndex + 1}
            totalQuestions={gameState.questions.length}
            onNext={handleNextQuestion}
          />
        )}
        {gameState.gameFinished && (
          <GameOver
            score={gameState.score}
            totalQuestions={gameState.questions.length}
            onRestart={handleRestart}
            level={gameState.currentLevel as 'junior' | 'pleno' | 'senior'}
          />
        )}
      </main>
    </div>
  );
}

export default App;
