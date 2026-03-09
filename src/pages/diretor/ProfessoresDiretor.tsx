import { professores, turmas, escolas } from '@/data/mockData';

export default function ProfessoresDiretor() {
  const profsEscola = professores.filter(p => p.escolaIds.includes('1'));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Professores</h1>
      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full table-striped">
          <thead><tr className="border-b bg-secondary">
            <th className="text-left p-3 text-sm font-medium">Nome</th>
            <th className="text-left p-3 text-sm font-medium">CPF</th>
            <th className="text-left p-3 text-sm font-medium">Disciplinas</th>
            <th className="text-left p-3 text-sm font-medium">Turmas</th>
          </tr></thead>
          <tbody>
            {profsEscola.map(p => {
              const turmasProf = turmas.filter(t => p.turmaIds.includes(t.id) && t.escolaId === '1');
              return (
                <tr key={p.id} className="border-b">
                  <td className="p-3 text-sm font-medium">{p.nome}</td>
                  <td className="p-3 text-sm">{p.cpf}</td>
                  <td className="p-3 text-sm">{p.disciplinas.join(', ')}</td>
                  <td className="p-3 text-sm">{turmasProf.map(t => t.nome).join(', ')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
