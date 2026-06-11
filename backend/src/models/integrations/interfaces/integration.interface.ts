interface IIntegration {
  userId: string;
  provider_name: string;
  auth_token: string;
  endpoint: string;
  method?: string | null;
}
