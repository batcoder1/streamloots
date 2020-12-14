import Card from '../entities/Card';

interface NotifierRepository {
  notify(card: Card, email: string): void;
}

export default NotifierRepository;
