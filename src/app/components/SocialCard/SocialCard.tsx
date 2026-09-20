import 'server-only';
import { ImageResponse } from 'next/og';

export type SocialCardModel = {
  eyebrow: string;
  eyebrowLocale?: 'en-US' | 'tr-TR';
  title: string;
  detail?: string;
};

export const socialCardSize = {
  width: 1200,
  height: 630,
};

export const socialCardContentType = 'image/png';

function getTitleSize(title: string): number {
  if (title.length > 48) {
    return 56;
  }

  if (title.length > 30) {
    return 68;
  }

  return 82;
}

export function renderSocialCard(model: SocialCardModel): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#FAF7F2',
          color: '#2A2A2A',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '82px 100px 74px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 960 }}>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
                color: '#9B8567',
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              {model.eyebrow.toLocaleUpperCase(model.eyebrowLocale ?? 'en-US')}
            </div>
            <div
              style={{
                display: 'flex',
                maxWidth: 960,
                color: '#2A2A2A',
                fontSize: getTitleSize(model.title),
                fontWeight: 600,
                letterSpacing: '-0.045em',
                lineHeight: 1.08,
              }}
            >
              {model.title}
            </div>
            {model.detail && (
              <div
                style={{
                  display: 'flex',
                  maxWidth: 820,
                  marginTop: 24,
                  color: '#3A3A3A',
                  fontSize: 28,
                  fontWeight: 400,
                  lineHeight: 1.42,
                }}
              >
                {model.detail}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#7B6B55',
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: '0.05em',
            }}
          >
            <span>Mert Ercan</span>
            <span style={{ color: '#B09A79' }}>mertercan.com</span>
          </div>
        </div>
      </div>
    ),
    socialCardSize
  );
}
