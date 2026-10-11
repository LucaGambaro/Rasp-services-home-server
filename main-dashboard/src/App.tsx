import { AppButton } from './components/AppButton';
import { apps } from './config/apps';
import { buildAppUrl } from './utils/buildAppUrl';

export const App = () => {
  const { hostname } = window.location;

  return (
    <>
      <div className="orb orb--top" aria-hidden="true" />
      <div className="orb orb--bottom" aria-hidden="true" />
      <main className="container">
        <header className="header">
          <span className="badge">
            <span className="badge__dot" aria-hidden="true" />
            Online
          </span>
          <h1 className="title">Home Server</h1>
          <p className="subtitle">Tutte le tue applicazioni, a un click di distanza.</p>
        </header>
        <nav aria-label="Applicazioni">
          <ul className="grid">
            {apps.map((app) => (
              <li key={app.id}>
                <AppButton app={app} href={buildAppUrl(app, hostname)} />
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
};
