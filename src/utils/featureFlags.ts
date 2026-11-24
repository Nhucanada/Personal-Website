export interface FeatureFlags {
  /** True when the entire site (or both sections) are under construction in prod */
  siteUnderConstruction: boolean;
  /** True when the SWE (/dev) section is under construction in prod */
  sweUnderConstruction: boolean;
  /** True when the Photography (/photo) section is under construction in prod */
  photoUnderConstruction: boolean;
  /** Whether the SWE (/dev) section is accessible */
  sweEnabled: boolean;
  /** Whether the Photography (/photo) section is accessible */
  photoEnabled: boolean;
  /** Whether the split-screen selector at / should be shown (both sections enabled) */
  selectorEnabled: boolean;
}

function isFlagTrue(value: string | boolean | undefined): boolean {
  return value === true || value === 'true';
}

export function getFeatureFlags(
  env: Record<string, string | boolean | undefined> = import.meta.env,
): FeatureFlags {
  const isProd = isFlagTrue(env.PROD);

  const rawSite = isFlagTrue(
    env.VITE_SITE_UNDER_CONSTRUCTION ?? env.REACT_APP_SITE_UNDER_CONSTRUCTION,
  );
  const rawSwe = isFlagTrue(
    env.VITE_SWE_UNDER_CONSTRUCTION ?? env.REACT_APP_SWE_UNDER_CONSTRUCTION,
  );
  const rawPhoto = isFlagTrue(
    env.VITE_PHOTO_UNDER_CONSTRUCTION ?? env.REACT_APP_PHOTO_UNDER_CONSTRUCTION,
  );

  const sweUnderConstruction = isProd && (rawSite || rawSwe);
  const photoUnderConstruction = isProd && (rawSite || rawPhoto);
  const siteUnderConstruction =
    isProd && (rawSite || (sweUnderConstruction && photoUnderConstruction));

  const sweEnabled = !sweUnderConstruction;
  const photoEnabled = !photoUnderConstruction;
  const selectorEnabled = sweEnabled && photoEnabled;

  return {
    siteUnderConstruction,
    sweUnderConstruction,
    photoUnderConstruction,
    sweEnabled,
    photoEnabled,
    selectorEnabled,
  };
}
