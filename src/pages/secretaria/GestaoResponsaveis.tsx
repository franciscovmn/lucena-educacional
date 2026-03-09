import { useState } from 'react';
import { responsaveis, getDependentes } from '@/data/mockData';
import { toast } from 'sonner';

export default function GestaoResponsaveis() {
  const [filtroNome, setFiltroNome] = useState('');
  const filtered = responsaveis.filter(r => !filtroNome || r.nome.toLowerCase().includes(filtroNome.toLowerCase()));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Gestão de Responsáveis</h1>

      <input type="text" placeholder="Buscar por nome..." value={filtroNome} onChange={e => setFiltroNome(e.target.value)}
        className="px-3 py-2 border rounded-md bg-background text-sm w-64 mb-4" />

      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Nome</th>
            <th className="text-left p-3 text-sm font-medium">CPF</th>
            <th className="text-left p-3 text-sm font-medium">WhatsApp</th>
            <th className="text-left p-3 text-sm font-medium">Dependentes</th>
            <th className="text-left p-3 text-sm font-medium">Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map(r => {
              const deps = getDependentes(r.id);
              return (
                <tr key={r.id} className="border-b">
                  <td className="p-3 text-sm font-medium">{r.nome}</td>
                  <td className="p-3 text-sm">{r.cpf}</td>
                  <td className="p-3 text-sm">{r.whatsapp}</td>
                  <td className="p-3 text-sm">{deps.map(d => d.nome).join(', ')}</td>
                  <td className="p-3 flex gap-1">
                    <button onClick={() => toast.info('Edição em desenvolvimento')} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Editar</button>
                    <button onClick={() => toast.success('Notificação enviada!')} className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Notificar</button>
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
