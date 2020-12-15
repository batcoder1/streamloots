import Card from '../entities/Card';

interface AnalyticRepository {
  send(card: Card, stat: string): void;
}

export default AnalyticRepository;
