import { useState } from 'react';
import { justificativas } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { ConfirmModal } from '@/components/ConfirmModal';
import { toast } from 'sonner';

export default function JustificativasGlobais() {
  // Justificativas pendentes há mais de 15 dias
  const [justs, setJusts] = useState(justificativas.filter(j => j.status === 'pendente'));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<'aprovar' | 'rejeitar' | null>(null);

  const handleConfirm = () => {
    if (!selectedId || !action) return;
    setJusts(prev => prev.map(j =>
      j.id === selectedId ? { ...j, status: action === 'aprovar' ? 'aprovada' as const : 'rejeitada' as const } : j
    ));
    toast.success(action === 'aprovar' ? 'Justificativa aprovada!' : 'Justificativa rejeitada!');
    setSelectedId(null);
    setAction(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Justificativas Globais</h1>
      <p className="text-muted-foreground mb-6">Justificativas pendentes de validação de todas as escolas</p>

      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Aluno</th>
            <th className="text-left p-3 text-sm font-medium">Escola</th>
            <th className="text-left p-3 text-sm font-medium">Período</th>
            <th className="text-left p-3 text-sm font-medium">Responsável</th>
            <th className="text-left p-3 text-sm font-medium">Envio</th>
            <th className="text-left p-3 text-sm font-medium">Status</th>
            <th className="text-left p-3 text-sm font-medium">Ações</th>
          </tr></thead>
          <tbody>
            {justs.map(j => (
              <tr key={j.id} className="border-b">
                <td className="p-3 text-sm font-medium">{j.alunoNome}</td>
                <td className="p-3 text-sm">{j.escolaNome}</td>
                <td className="p-3 text-sm">{j.periodoInicio} a {j.periodoFim}</td>
                <td className="p-3 text-sm">{j.responsavelNome}</td>
                <td className="p-3 text-sm">{j.dataEnvio}</td>
                <td className="p-3"><StatusBadge status={j.status} /></td>
                <td className="p-3">
                  {j.status === 'pendente' && (
                    <div className="flex gap-1">
                      <button onClick={() => { setSelectedId(j.id); setAction('aprovar'); }} className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Aprovar</button>
                      <button onClick={() => { setSelectedId(j.id); setAction('rejeitar'); }} className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">Rejeitar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!selectedId && !!action}
        onOpenChange={() => { setSelectedId(null); setAction(null); }}
        title={action === 'aprovar' ? 'Aprovar Justificativa' : 'Rejeitar Justificativa'}
        description={`Tem certeza que deseja ${action === 'aprovar' ? 'aprovar' : 'rejeitar'} esta justificativa?`}
        onConfirm={handleConfirm}
        confirmLabel={action === 'aprovar' ? 'Aprovar' : 'Rejeitar'}
        variant={action === 'rejeitar' ? 'destructive' : 'default'}
      />
    </div>
  );
}
