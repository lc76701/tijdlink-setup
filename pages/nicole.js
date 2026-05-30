import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Nicole() {
  const [slug, setSlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bolCountry, setBolCountry] = useState('NL');
  const [neosurfCountry, setNeosurfCountry] = useState('NL');

  const baseUrl = 'https://betaalverzoek.nu';

  const generateNewSlug = async () => {
    setLoading(true);
    const res = await fetch('/api/generate');
    const { slug: newSlug } = await res.json();
    setSlug(newSlug);
    setLoading(false);
  };

  useEffect(() => {
    generateNewSlug();
  }, []);

  const handleCopy = (text, refresh = false) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Gekopieerd!');
      if (refresh) location.reload();
    });
  };

  const generateTikkieText = (amount) =>
    `💖 Wil je mij alsjeblieft betalen voor 'Tikkie' via ${baseUrl}/${slug}\n\nVia deze link kun je €${amount} betalen`;

  const generateBolText = (amount, url) =>
    `💖 Wil je mij alsjeblieft betalen via bol cadeaukaart? Binnen 1 minuut via: ${url}\n\nVia deze link kun je €${amount} betalen`;

  const generateNeosurfText = (amount, url) =>
    `💖 Wil je mij alsjeblieft betalen via neosurf cadeaukaart? Binnen 1 minuut via: ${url}\n\nVia deze link kun je €${amount} betalen`;

  const bankText = `Handmatige bankoverschrijving? Dat kan ook: NL34BUNQ2106132808 tnv E. Tiggelaar (naam veranderd voor privacy maar rekening nr klopt)`;

const bolLinks = {
  NL: [
    { amount: 25, url: 'https://www.opwaarderen.nl/bol-com-cadeaukaart-25-euro' },
    { amount: 30, url: 'https://beltegoed.nl/order?productId=56280&quantity=1' },
    { amount: 50, url: 'https://beltegoed.nl/order?productId=56361&quantity=1' },
    { amount: 70, url: 'https://beltegoed.nl/order?productId=88345&quantity=1' },
    { amount: 90, url: 'https://beltegoed.nl/order?productId=88345&quantity=1' },
  ],
  BE: [
    { amount: 10, url: 'https://www.herladen.be/bol-com-cadeaubon-10-euro' },
    { amount: 15, url: 'https://www.herladen.be/bol-com-cadeaubon-15-euro' },
    { amount: 20, url: 'https://www.herladen.be/bol-com-cadeaubon-20-euro' },
    { amount: 25, url: 'https://www.herladen.be/bol-com-cadeaubon-25-euro' },
    { amount: 50, url: 'https://www.herladen.be/bol-com-cadeaubon-50-euro' },
    { amount: 100, url: 'https://www.herladen.be/bol-com-cadeaubon-100-euro' },
  ],
};

const neosurfLinks = {
  NL: [
    { amount: 5, url: 'https://kaartdirect.nl/product/neosurf-eur5' },
    { amount: 10, url: 'https://kaartdirect.nl/product/neosurf-eur10' },
    { amount: 15, url: 'https://kaartdirect.nl/product/neosurf-eur15' },
    { amount: 25, url: 'https://kaartdirect.nl/product/neosurf-eur25' },
    { amount: 30, url: 'https://kaartdirect.nl/product/neosurf-eur30' },
  ],
  BE: [
    { amount: 5, url: 'https://kaartdirect.be/product/neosurf-eur5' },
    { amount: 10, url: 'https://kaartdirect.be/product/neosurf-eur10' },
    { amount: 15, url: 'https://kaartdirect.be/product/neosurf-eur15' },
    { amount: 25, url: 'https://kaartdirect.be/product/neosurf-eur25' },
    { amount: 30, url: 'https://kaartdirect.be/product/neosurf-eur30' },
  ],
};

  const activeBolLinks = bolLinks[bolCountry];
  const activeNeosurfLinks = neosurfLinks[neosurfCountry];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Link Generator</title>
        <meta name="robots" content="noindex" />
      </Head>

      <h1>Actieve redirect link</h1>

      {slug ? (
        <>
          <p>
            <a href={`/${slug}`} target="_blank" rel="noopener noreferrer">
              /{slug}
            </a>
          </p>

          {/* Tikkie */}
          <div style={{ marginTop: '2rem' }}>
            <textarea
              style={{ width: '100%', height: '120px' }}
              readOnly
              value={generateTikkieText(30)}
            />
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => handleCopy(generateTikkieText(30), true)}>Kopieer Tikkie-tekst</button>
              <button onClick={() => handleCopy(generateTikkieText(50), true)}>€50</button>
              <button onClick={() => handleCopy(generateTikkieText(70), true)}>€70</button>
              <button onClick={() => handleCopy(generateTikkieText(90), true)}>€90</button>
            </div>
          </div>

          {/* Neosurf */}
          <div style={{ marginTop: '2rem' }}>
            <h2>Neosurf tegoed</h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setNeosurfCountry('NL')}>🇳🇱 NL</button>
              <button onClick={() => setNeosurfCountry('BE')}>🇧🇪 BE</button>
            </div>

            <textarea
              style={{ width: '100%', height: '120px' }}
              readOnly
              value={generateNeosurfText(activeNeosurfLinks[0].amount, activeNeosurfLinks[0].url)}
            />

            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() =>
                  handleCopy(generateNeosurfText(activeNeosurfLinks[0].amount, activeNeosurfLinks[0].url))
                }
              >
                Kopieer Neosurf-tekst
              </button>

              {activeNeosurfLinks.map((item) => (
                <button
                  key={`${neosurfCountry}-${item.amount}`}
                  onClick={() => handleCopy(generateNeosurfText(item.amount, item.url))}
                >
                  €{item.amount}
                </button>
              ))}
            </div>
          </div>

          {/* Bol */}
          <div style={{ marginTop: '2rem' }}>
            <h2>Bol cadeaukaart</h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setBolCountry('NL')}>🇳🇱 NL</button>
              <button onClick={() => setBolCountry('BE')}>🇧🇪 BE</button>
            </div>

            <textarea
              style={{ width: '100%', height: '120px' }}
              readOnly
              value={generateBolText(activeBolLinks[0].amount, activeBolLinks[0].url)}
            />

            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() =>
                  handleCopy(generateBolText(activeBolLinks[0].amount, activeBolLinks[0].url))
                }
              >
                Kopieer Bol-tekst
              </button>

              {activeBolLinks.map((item) => (
                <button
                  key={`${bolCountry}-${item.amount}`}
                  onClick={() => handleCopy(generateBolText(item.amount, item.url))}
                >
                  €{item.amount}
                </button>
              ))}
            </div>
          </div>

          {/* IBAN */}
          <div style={{ marginTop: '2rem' }}>
            <textarea
              style={{ width: '100%', height: '80px' }}
              readOnly
              value={bankText}
            />
            <button onClick={() => handleCopy(bankText)}>Kopieer Bank-tekst</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <div style={{ marginTop: '3rem' }}>
        <button onClick={generateNewSlug} disabled={loading}>
          {loading ? 'Even geduld...' : 'Genereer nieuwe link'}
        </button>
      </div>
    </div>
  );
}
