import { useParams } from 'react-router-dom';
import { DetalheAlunoPanel } from '@/components/DetalheAlunoPanel';

export default function DetalheAlunoDiretor() {
  const { id } = useParams();
  return <DetalheAlunoPanel alunoId={id} backLink="/diretor/alunos" readOnly />;
}
