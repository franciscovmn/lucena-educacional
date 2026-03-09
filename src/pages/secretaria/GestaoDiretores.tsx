import { useState } from 'react';
import { diretores, escolas } from '@/data/mockData';
import { toast } from 'sonner';

export default function GestaoDiretores() {
  const [editId, setEditId] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Gestão de Diretores</h1>
      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Nome</th>
            <th className="text-left p-3 text-sm font-medium">CPF</th>
            <th className="text-left p-3 text-sm font-medium">Escola(s)</th>
            <th className="text-left p-3 text-sm font-medium">Ações</th>
          </tr></thead>
          <tbody>
            {diretores.map(d => {
              const escolasDir = escolas.filter(e => d.escolaIds.includes(e.id));
              return (
                <tr key={d.id} className="border-b">
                  <td className="p-3 text-sm font-medium">{d.nome}</td>
                  <td className="p-3 text-sm">{d.cpf}</td>
                  <td className="p-3 text-sm">{escolasDir.map(e => e.nome).join(', ')}</td>
                  <td className="p-3">
                    <button onClick={() => toast.info('Edição de diretor em desenvolvimento')} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded">Editar</button>
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
