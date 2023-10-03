import { AvailableAnalyticsModel } from '../models/available-analytics.model';
import { RestQueryVo } from '../../../shared/models/pagination/rest.query';
import { AnalyticModel } from '../models/analytic.model';

export interface AnalyticsStateModel {
  loading: boolean;
  restQuery: RestQueryVo;
  availableAnalytics: AvailableAnalyticsModel[];
  analytic: AnalyticModel | null;
}
