import { useState } from 'react';
import { professores, escolas, turmas } from '@/data/mockData';
import { toast } from 'sonner';

export default function GestaoProfessoresSecretaria() {
  const [filtroNome, setFiltroNome] = useState('');
  const filtered = professores.filter(p => !filtroNome || p.nome.toLowerCase().includes(filtroNome.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Gestão de Professores</h1>
        <button onClick={() => toast.info('Formulário de novo professor em desenvolvimento')} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">+ Novo Professor</button>
      </div>

      <input type="text" placeholder="Buscar por nome..." value={filtroNome} onChange={e => setFiltroNome(e.target.value)}
        className="px-3 py-2 border rounded-md bg-background text-sm w-64 mb-4" />

      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Nome</th>
            <th className="text-left p-3 text-sm font-medium">CPF</th>
            <th className="text-left p-3 text-sm font-medium">Disciplinas</th>
            <th className="text-left p-3 text-sm font-medium">Escolas</th>
            <th className="text-left p-3 text-sm font-medium">Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map(p => {
              const escolasProf = escolas.filter(e => p.escolaIds.includes(e.id));
              return (
                <tr key={p.id} className="border-b">
                  <td className="p-3 text-sm font-medium">{p.nome}</td>
                  <td className="p-3 text-sm">{p.cpf}</td>
                  <td className="p-3 text-sm">{p.disciplinas.join(', ')}</td>
                  <td className="p-3 text-sm">{escolasProf.map(e => e.nome).join(', ')}</td>
                  <td className="p-3">
                    <button onClick={() => toast.info('Edição em desenvolvimento')} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded">Editar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
