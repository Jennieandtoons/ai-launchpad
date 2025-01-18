export type ResponseType = 'system' | 'response';

export interface CommandResponse {
  type: ResponseType;
  content: string;
  timestamp: string;
}

export interface CommandInterfaceProps {
  agentName: string;
  onCommandSuccess?: () => void;
}

export interface SuggestedCommand {
  cmd: string;
  desc: string;
}

export interface CommandResponseMap {
  [key: string]: string[];
}
