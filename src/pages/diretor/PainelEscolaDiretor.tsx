import { Link } from 'react-router-dom';
import { getSeriesByEscola, escolas } from '@/data/mockData';

export default function PainelEscolaDiretor() {
  const escola = escolas[0]; // João Ferreira - Padre Cícero
  const seriesEscola = getSeriesByEscola('1');

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">{escola.nome}</h1>
      <p className="text-muted-foreground mb-6">Frequência média: <span className="font-bold text-primary">{escola.frequenciaMedia}%</span></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seriesEscola.map(serie => (
          <Link key={serie.id} to={`/diretor/serie/${serie.id}`} className="block">
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
