import { useState } from 'react';
import { getJustificativasByEscola } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { ConfirmModal } from '@/components/ConfirmModal';
import { toast } from 'sonner';

export default function JustificativasDiretor() {
  const [justificativas, setJustificativas] = useState(getJustificativasByEscola('1'));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<'aprovar' | 'rejeitar' | null>(null);
  const [detalheId, setDetalheId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedId || !action) return;
    setJustificativas(prev => prev.map(j =>
      j.id === selectedId ? { ...j, status: action === 'aprovar' ? 'aprovada' as const : 'rejeitada' as const } : j
    ));
    toast.success(action === 'aprovar' ? 'Justificativa aprovada!' : 'Justificativa rejeitada!');
    setSelectedId(null);
    setAction(null);
  };

  const detalhe = justificativas.find(j => j.id === detalheId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Justificativas de Falta</h1>
      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Aluno</th>
            <th className="text-left p-3 text-sm font-medium">Período</th>
            <th className="text-left p-3 text-sm font-medium">Responsável</th>
            <th className="text-left p-3 text-sm font-medium">Data Envio</th>
            <th className="text-left p-3 text-sm font-medium">Status</th>
            <th className="text-left p-3 text-sm font-medium">Ações</th>
          </tr></thead>
          <tbody>
            {justificativas.map(j => (
              <tr key={j.id} className="border-b">
                <td className="p-3 text-sm font-medium">{j.alunoNome}</td>
                <td className="p-3 text-sm">{j.periodoInicio} a {j.periodoFim}</td>
                <td className="p-3 text-sm">{j.responsavelNome}</td>
                <td className="p-3 text-sm">{j.dataEnvio}</td>
                <td className="p-3"><StatusBadge status={j.status} /></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => setDetalheId(j.id)} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Ver</button>
                    {j.status === 'pendente' && (
                      <>
                        <button onClick={() => { setSelectedId(j.id); setAction('aprovar'); }} className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Aprovar</button>
                        <button onClick={() => { setSelectedId(j.id); setAction('rejeitar'); }} className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">Rejeitar</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detalhe && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setDetalheId(null)}>
          <div className="bg-card rounded-lg border shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-4">Detalhes da Justificativa</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Aluno:</span> <span className="font-medium">{detalhe.alunoNome}</span></div>
              <div><span className="text-muted-foreground">Período:</span> {detalhe.periodoInicio} a {detalhe.periodoFim}</div>
              <div><span className="text-muted-foreground">Responsável:</span> {detalhe.responsavelNome}</div>
              <div><span className="text-muted-foreground">Documento:</span> {detalhe.documento}</div>
              <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={detalhe.status} /></div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setDetalheId(null)} className="px-4 py-2 text-sm border rounded-md hover:bg-secondary">Fechar</button>
            </div>
          </div>
        </div>
      )}

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
