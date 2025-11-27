import { useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [passwordlength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const lowercase = uppercase.toLowerCase();
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      let characterPool = '';
      if (includeUppercase) characterPool += uppercase;
      if (includeLowercase) characterPool += lowercase;
      if (includeSymbols) characterPool += symbols;
      if (includeNumbers) characterPool += numbers;
      if (characterPool === '') {
          characterPool = uppercase + lowercase + numbers + symbols;
          setIncludeUppercase(true);
          setIncludeLowercase(true);
          setIncludeNumbers(true);
          setIncludeSymbols(false);
      }
      let generatedPassword = '';
      for (let i = 0; i < passwordlength; i++) {
          const randomIndex = Math.floor(Math.random() * characterPool.length);
          generatedPassword += characterPool[randomIndex];
      }
      setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(password);
      alert('пароль скопирован в буфер обмена!');
  };

  return (
      <div className="app">
          <div className="container">
              <h1>Генератор паролей</h1>
              <div className="password-display">
                  <input type="text" value={password} readOnly placeholder="Сгенерированный пароль появится здесь" className="password-input"/>
                  <button onClick={copyToClipboard} disabled={!password}>Копировать</button>
              </div>
              <div className="controls">
                  <div className="length-control">
                      <label>Длина пароля: {passwordlength}
                          <input type="range" min="4" max="32" value={passwordlength} onChange={(e) => setPasswordLength(e.target.value)}/>
                      </label>
                  </div>
                  <div className="character-types">
                      <label>
                          <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)}/>
                          Заглавные буквы (A-Z)
                      </label>
                      <label>
                          <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)}/>
                          Строчные буквы (a-z)
                      </label>
                      <label>
                          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}/>
                          Цифры (0-9)
                      </label>
                      <label>
                          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}/>
                          Символы (!@#$% и т.д.)
                      </label>
                  </div>
              </div>
              <button onClick={generatePassword} className="generate-btn">Сгенерировать пароль</button>
          </div>
      </div>
  );
}

export default App
