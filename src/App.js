import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import AptitudeTest from './components/AptitudeTest';
import ThankYouPage from './components/ThankYouPage';

const App = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    return (
        <div>
            {step === 1 && <RegistrationForm onRegister={(userEmail) => { setEmail(userEmail); setStep(2); }} />}
            {step === 2 && <AptitudeTest userEmail={email} onComplete={() => setStep(3)} />}
            {step === 3 && <ThankYouPage />}
        </div>
    );
};

export default App;
