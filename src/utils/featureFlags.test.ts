import { describe, expect, it } from 'vitest';
import { getFeatureFlags } from './featureFlags';

describe('getFeatureFlags', () => {
  it('enables all sections in non-production environments even when flags are true', () => {
    const flags = getFeatureFlags({
      PROD: false,
      VITE_SITE_UNDER_CONSTRUCTION: 'true',
      VITE_SWE_UNDER_CONSTRUCTION: 'true',
      VITE_PHOTO_UNDER_CONSTRUCTION: 'true',
    });

    expect(flags).toEqual({
      siteUnderConstruction: false,
      sweUnderConstruction: false,
      photoUnderConstruction: false,
      sweEnabled: true,
      photoEnabled: true,
      selectorEnabled: true,
    });
  });

  it('disables only the SWE section in prod when VITE_SWE_UNDER_CONSTRUCTION is true', () => {
    const flags = getFeatureFlags({
      PROD: true,
      VITE_SWE_UNDER_CONSTRUCTION: 'true',
    });

    expect(flags).toEqual({
      siteUnderConstruction: false,
      sweUnderConstruction: true,
      photoUnderConstruction: false,
      sweEnabled: false,
      photoEnabled: true,
      selectorEnabled: false,
    });
  });

  it('disables only the Photography section in prod when VITE_PHOTO_UNDER_CONSTRUCTION is true', () => {
    const flags = getFeatureFlags({
      PROD: true,
      VITE_PHOTO_UNDER_CONSTRUCTION: 'true',
    });

    expect(flags).toEqual({
      siteUnderConstruction: false,
      sweUnderConstruction: false,
      photoUnderConstruction: true,
      sweEnabled: true,
      photoEnabled: false,
      selectorEnabled: false,
    });
  });

  it('marks the whole site under construction when both SWE and Photo are under construction in prod', () => {
    const flags = getFeatureFlags({
      PROD: true,
      VITE_SWE_UNDER_CONSTRUCTION: 'true',
      VITE_PHOTO_UNDER_CONSTRUCTION: 'true',
    });

    expect(flags).toEqual({
      siteUnderConstruction: true,
      sweUnderConstruction: true,
      photoUnderConstruction: true,
      sweEnabled: false,
      photoEnabled: false,
      selectorEnabled: false,
    });
  });

  it('marks the whole site under construction when VITE_SITE_UNDER_CONSTRUCTION is true in prod', () => {
    const flags = getFeatureFlags({
      PROD: true,
      VITE_SITE_UNDER_CONSTRUCTION: 'true',
    });

    expect(flags).toEqual({
      siteUnderConstruction: true,
      sweUnderConstruction: true,
      photoUnderConstruction: true,
      sweEnabled: false,
      photoEnabled: false,
      selectorEnabled: false,
    });
  });
});
