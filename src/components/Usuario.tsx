import React from 'react';
import EditarPerfil from './EditarPerfil';

interface UsuarioProps {
  user: {
    nome?: string;
    login?: string;
    email?: string;
    pontuacao?: number;
  };
  onBack: () => void;
}

const amigosRanking = [
  { nome: 'Amigo 01', pontuacao: 800 },
  { nome: 'Amigo 02', pontuacao: 750 },
  { nome: 'Amigo 03', pontuacao: 740 },
  { nome: 'Amigo 04', pontuacao: 710 },
  { nome: 'Amigo 05', pontuacao: 690 },
  { nome: 'Amigo 06', pontuacao: 660 },
  { nome: 'Amigo 07', pontuacao: 640 },
  { nome: 'Amigo 08', pontuacao: 600 },
  { nome: 'Amigo 09', pontuacao: 580 },
  { nome: 'Amigo 10', pontuacao: 550 },
  { nome: 'Amigo 11', pontuacao: 520 },
  { nome: 'Amigo 12', pontuacao: 500 },
];

export default function Usuario({ user, onBack }: UsuarioProps) {
  const [showEditar, setShowEditar] = React.useState(false);

  const score = user.pontuacao ?? 500;
  const maxScore = 1300;
  const percentage = Math.round((score / maxScore) * 100);

  if (showEditar) {
    return (
      <EditarPerfil
        user={user}
        onSave={() => setShowEditar(false)}
        onBack={() => setShowEditar(false)}
      />
    );
  }

  return (
    <div className="min-h-screen grid-background flex flex-col">
      <header className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-[#00FFFF]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <button onClick={onBack} className="text-[#00FFFF] font-bold">Voltar</button>
          <img src="../../homepage/teladeusuário/logotipo.png" alt="Logo SkillCode" className="logo" width={120} />
        </div>
      </header>
      <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-8">
        <aside className="bg-black bg-opacity-60 rounded-2xl p-6 w-64 flex flex-col items-center">
          <div className="avatar text-6xl mb-2">👤</div>
          <div className="font-bold text-white mb-2">{user.nome || user.login || 'Usuário'}</div>
          <button className="neon-button w-full mb-4" onClick={() => setShowEditar(true)}>
            Editar Perfil
          </button>
          <nav className="flex flex-col gap-2 mt-4 w-full">
            <button className="neon-button w-full">Cursos</button>
            <button className="neon-button w-full">Amigos</button>
            <button className="neon-button w-full">Conquistas</button>
          </nav>
        </aside>
        <main className="flex-1 flex flex-col gap-8">
          <section className="bg-black bg-opacity-60 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold neon-text mb-4">JavaScript</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="text-lg text-white">Pontuação: <span className="font-bold">{score} pts</span></div>
              <div className="flex flex-col items-center">
                <p className="text-white mb-1">Conquistas</p>
                <div className="grid grid-cols-6 gap-1">
                  {Array(12).fill(0).map((_, i) => <span key={i}>🏆</span>)}
                </div>
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-4 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#00FFFF] via-[#9D00FF] to-[#39FF14] transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              >
                <div className="w-full h-full animate-pulse bg-white bg-opacity-20" />
              </div>
            </div>
            <p className="text-right text-[#00FFFF] font-mono">{percentage}%</p>
          </section>
          <section className="bg-black bg-opacity-60 rounded-2xl p-8">
            <h2 className="text-2xl font-bold neon-text mb-4">Ranking Geral</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white">
                <thead>
                  <tr>
                    <th className="text-left p-2">Nome</th>
                    <th className="text-left p-2">Pontuação</th>
                  </tr>
                </thead>
                <tbody>
                  {amigosRanking.map((amigo, i) => (
                    <tr key={i} className="odd:bg-white/5 even:bg-white/10">
                      <td className="p-2">{amigo.nome}</td>
                      <td className="p-2">{amigo.pontuacao} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <footer className="text-center text-white py-4 bg-black bg-opacity-60 mt-8">Footer</footer>
    </div>
  );
}
