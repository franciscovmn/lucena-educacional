import { useState } from 'react';
import { getTurmasByEscola, series, professores, alunos } from '@/data/mockData';
import { toast } from 'sonner';

export default function GestaoTurmas() {
  const turmasEscola = getTurmasByEscola('1');
  const [showForm, setShowForm] = useState(false);
  const [serieSel, setSerieSel] = useState('');
  const [sala, setSala] = useState('');

  const seriesEscola = series.filter(s => s.escolaId === '1');

  const handleCriar = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Turma criada com sucesso!');
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Gestão de Turmas</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
          {showForm ? 'Cancelar' : '+ Nova Turma'}
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border p-6 mb-6 max-w-lg">
          <h3 className="font-semibold mb-4">Nova Turma</h3>
          <form onSubmit={handleCriar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Série</label>
              <select value={serieSel} onChange={e => setSerieSel(e.target.value)} required className="w-full px-3 py-2 border rounded-md bg-background text-sm">
                <option value="">Selecione...</option>
                {seriesEscola.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sala</label>
              <input type="text" value={sala} onChange={e => setSala(e.target.value)} placeholder="Ex: Sala 10" required className="w-full px-3 py-2 border rounded-md bg-background text-sm" />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90">Criar Turma</button>
          </form>
        </div>
      )}

      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Turma</th>
            <th className="text-left p-3 text-sm font-medium">Sala</th>
            <th className="text-left p-3 text-sm font-medium">Alunos</th>
            <th className="text-left p-3 text-sm font-medium">Freq. Média</th>
          </tr></thead>
          <tbody>
            {turmasEscola.map(t => (
              <tr key={t.id} className="border-b">
                <td className="p-3 text-sm font-medium">{t.nome}</td>
                <td className="p-3 text-sm">{t.sala}</td>
                <td className="p-3 text-sm">{alunos.filter(a => a.turmaId === t.id).length}</td>
                <td className="p-3 text-sm">
                  <span className={t.frequenciaMedia < 75 ? 'text-destructive font-bold' : 'text-primary font-bold'}>{t.frequenciaMedia}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
