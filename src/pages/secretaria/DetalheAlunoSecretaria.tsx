import { useParams } from 'react-router-dom';
import { DetalheAlunoPanel } from '@/components/DetalheAlunoPanel';

export default function DetalheAlunoSecretaria() {
  const { id } = useParams();
  return <DetalheAlunoPanel alunoId={id} backLink="/secretaria/alunos" />;
}
