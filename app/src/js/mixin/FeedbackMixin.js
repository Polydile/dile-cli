import { store } from '../redux/store.js';
import { DileFeedback } from '@dile/lib';

export const FeedbackMixin = DileFeedback(store);

