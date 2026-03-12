import { useParams, Link } from 'react-router-dom';
import { escolas, getSeriesByEscola, getTurmasBySerie } from '@/data/mockData';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function EscolaDetalheSecretaria() {
  const { escolaId } = useParams();
  const escola = escolas.find(e => e.id === escolaId);
  const seriesEscola = getSeriesByEscola(escolaId || '');

  if (!escola) return <div>Escola não encontrada</div>;

  return (
    <div>
      <Link to="/secretaria" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-2">{escola.nome}</h1>
      <p className="text-muted-foreground mb-6">Diretor: {escola.diretorNome} | Frequência média: <span className="font-bold text-primary">{escola.frequenciaMedia}%</span></p>

      <h2 className="text-lg font-semibold mb-4">Séries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seriesEscola.map(serie => (
          <Link key={serie.id} to={`/secretaria/escola/${escolaId}/serie/${serie.id}`} className="block">
            <div className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-card-foreground">{serie.nome}</h3>
              <div className={`text-2xl font-bold mt-2 ${serie.frequenciaMedia < 75 ? 'text-destructive' : 'text-primary'}`}>
                {serie.frequenciaMedia}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Frequência média</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
