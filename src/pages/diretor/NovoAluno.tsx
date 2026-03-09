import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { turmas, series, responsaveis } from '@/data/mockData';
import { toast } from 'sonner';

export default function NovoAluno() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [matricula, setMatricula] = useState('');
  const [serieSel, setSerieSel] = useState('');
  const [turmaSel, setTurmaSel] = useState('');
  const [respSel, setRespSel] = useState('');

  const seriesEscola = series.filter(s => s.escolaId === '1');
  const turmasFiltradas = turmas.filter(t => t.serieId === serieSel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Aluno cadastrado com sucesso!');
    navigate('/diretor/alunos');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Cadastrar Novo Aluno</h1>
      <div className="bg-card rounded-lg border p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome Completo</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required className="w-full px-3 py-2 border rounded-md bg-background text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CPF</label>
            <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" required className="w-full px-3 py-2 border rounded-md bg-background text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Matrícula</label>
            <input type="text" value={matricula} onChange={e => setMatricula(e.target.value)} required className="w-full px-3 py-2 border rounded-md bg-background text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Série</label>
            <select value={serieSel} onChange={e => { setSerieSel(e.target.value); setTurmaSel(''); }} required className="w-full px-3 py-2 border rounded-md bg-background text-sm">
              <option value="">Selecione...</option>
              {seriesEscola.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
            </select>
          </div>
          {serieSel && (
            <div>
              <label className="block text-sm font-medium mb-1">Turma</label>
              <select value={turmaSel} onChange={e => setTurmaSel(e.target.value)} required className="w-full px-3 py-2 border rounded-md bg-background text-sm">
                <option value="">Selecione...</option>
                {turmasFiltradas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Responsável</label>
            <select value={respSel} onChange={e => setRespSel(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-background text-sm">
              <option value="">Buscar responsável existente...</option>
              {responsaveis.map(r => <option key={r.id} value={r.id}>{r.nome} — {r.cpf}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90">Cadastrar</button>
            <button type="button" onClick={() => navigate('/diretor/alunos')} className="px-6 py-2 border rounded-md hover:bg-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
