import { diretores, escolas } from '@/data/mockData';

export default function MeusDadosDiretor() {
  const diretor = diretores[0];
  const minhasEscolas = escolas.filter(e => diretor.escolaIds.includes(e.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Meus Dados</h1>
      <div className="bg-card rounded-lg border p-6 max-w-lg space-y-4">
        <div><label className="text-sm text-muted-foreground">Nome</label><p className="font-medium">{diretor.nome}</p></div>
        <div><label className="text-sm text-muted-foreground">CPF</label><p className="font-medium">{diretor.cpf}</p></div>
        <div>
          <label className="text-sm text-muted-foreground">Escola(s)</label>
          <ul className="list-disc list-inside">{minhasEscolas.map(e => <li key={e.id} className="text-sm">{e.nome}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
