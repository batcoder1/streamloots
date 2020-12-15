import Card from '../core/entities/Card';
import AnalyticRepository from '../core/repositories/analytic.repository';
import axios from 'axios';

export class GoogleNotifier implements AnalyticRepository {
  public send(card: Card, stat: string): void {
    const GA_TRACKING_ID = 'xxxx';

    const data = {
      // API Version.
      v: '1',
      // Tracking ID / Property ID.
      tid: GA_TRACKING_ID,
      // Anonymous Client Identifier. Ideally, this should be a UUID that
      // is associated with particular user, device, or browser instance.
      cid: card.userId,
      // Event hit type.
      t: 'event',
      // Event category.
      ec: 'cards',
      // Event action.
      ea: stat,
      // Event label.
      el: 'Card',
      // Event value.
      ev: card.name,
    };

    axios.post('http://www.google-analytics.com/collect', data);
  }
}
export function CreateGoogleNotifier(): GoogleNotifier {
  return new GoogleNotifier();
}
