import React, { useRef, useState } from 'react';

interface EditarPerfilProps {
  user: {
    nome?: string;
    login?: string;
    email?: string;
    fotoUrl?: string;
  };
  onSave: (dados: { nome: string; login: string; senha: string; fotoUrl?: string }) => void;
  onBack: () => void;
}

export default function EditarPerfil({ user, onSave, onBack }: EditarPerfilProps) {
  const [nome, setNome] = useState(user.nome || '');
  const [login, setLogin] = useState(user.login || '');
  const [senha, setSenha] = useState('');
  const [fotoUrl, setFotoUrl] = useState(user.fotoUrl || 'https://via.placeholder.com/120');
  const [mensagem, setMensagem] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function () {
        setFotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !login || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }
    onSave({ nome, login, senha, fotoUrl });
    setMensagem('Perfil atualizado com sucesso!');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111] to-[#222]">
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <button onClick={onBack} className="mb-4 text-[#00FFFF] font-bold">Voltar</button>
        <h2 className="text-2xl font-bold neon-text mb-6 text-center">Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <img src={fotoUrl} alt="Foto de perfil" className="rounded-full w-28 h-28 object-cover mb-2 border-4 border-[#00FFFF]" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00FFFF] file:text-black hover:file:bg-[#39FF14]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-1">Nome completo</label>
            <input
              type="text"
              id="name"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">Nome de usuário</label>
            <input
              type="text"
              id="username"
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder="Digite seu nome de usuário"
              className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-1">Nova senha</label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Digite sua nova senha"
              className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            />
          </div>
          <button type="submit" className="w-full neon-button py-2 mt-2">Salvar alterações</button>
          {mensagem && <div className="mt-4 text-center text-[#39FF14] font-bold">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
}
