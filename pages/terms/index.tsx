import LegalPage from 'redesign/LegalPage';
import { termsPolicy } from 'redesign/legal-content';

export default function TermsPage() {
  return <LegalPage policy={termsPolicy} />;
}
