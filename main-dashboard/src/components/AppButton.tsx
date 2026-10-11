import { ArrowUpRight } from 'lucide-react';
import type { AppLink } from '../types';

interface AppButtonProps {
  app: AppLink;
  href: string;
}

export const AppButton = ({ app, href }: AppButtonProps) => {
  const Icon = app.icon;

  return (
    <a className="app-button" href={href}>
      <span className="app-button__icon">
        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="app-button__body">
        <span className="app-button__name">{app.name}</span>
        <span className="app-button__description">{app.description}</span>
      </span>
      <ArrowUpRight className="app-button__arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
};
