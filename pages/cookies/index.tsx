import LegalPage from 'redesign/LegalPage';
import { cookiesPolicy } from 'redesign/legal-content';

export default function CookiesPage() {
  return <LegalPage policy={cookiesPolicy} />;
}
