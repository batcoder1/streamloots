import NotifierRepository from '../core/repositories/analytic.repository';
import nodemailer from 'nodemailer';
import Card from '../core/entities/Card';
import AnalyticRepository from '../core/repositories/analytic.repository';
import StatsD from 'hot-shots';

export class DatadogNotifier implements AnalyticRepository {
  public send(card: Card, stat: string): void {
    const dogstatsd = new StatsD();
    dogstatsd.increment(`cards.${stat}`);
  }
}

export function CreateDatadogNotifier(): DatadogNotifier {
  return new DatadogNotifier();
}
