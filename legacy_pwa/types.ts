
export enum CallState {
  IDLE = 'IDLE',
  INCOMING_CALL = 'INCOMING_CALL',
  ANSWERFORME_ACTIVE = 'ANSWERFORME_ACTIVE',
  LIVE_CALL = 'LIVE_CALL',
  CALL_ENDED_DISPLAY = 'CALL_ENDED_DISPLAY',
}

export interface CallerInfo {
  id: string;
  name: string;
  number: string;
}
