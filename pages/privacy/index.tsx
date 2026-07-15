import LegalPage from 'redesign/LegalPage';
import { privacyPolicy } from 'redesign/legal-content';

export default function PrivacyPage() {
  return <LegalPage policy={privacyPolicy} />;
}
