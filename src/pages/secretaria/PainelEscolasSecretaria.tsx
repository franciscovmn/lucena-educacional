import { Link } from 'react-router-dom';
import { escolas } from '@/data/mockData';
import { School } from 'lucide-react';

export default function PainelEscolasSecretaria() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Escolas do Município</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {escolas.map(escola => (
          <Link key={escola.id} to={`/secretaria/escola/${escola.id}`} className="block">
            <div className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <School className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-card-foreground">{escola.nome}</h3>
                  <p className="text-sm text-muted-foreground">Diretor: {escola.diretorNome}</p>
                </div>
              </div>
              <div className={`text-2xl font-bold ${escola.frequenciaMedia < 75 ? 'text-destructive' : 'text-primary'}`}>
                {escola.frequenciaMedia}%
              </div>
              <p className="text-xs text-muted-foreground">Frequência média</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
