/**
 *
 * @param {'S256'|string} pkceMethod
 * @param {string} [test]
 * @returns {Promise<{codeVerifier: string, challenge: string }>}
 */
export function pkce(pkceMethod: 'S256' | string, test?: string | undefined): Promise<{
    codeVerifier: string;
    challenge: string;
}>;
