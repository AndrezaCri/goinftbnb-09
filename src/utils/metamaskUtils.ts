
/**
 * Utilitários para interações com a MetaMask
 */

/**
 * Verifica se a MetaMask está instalada no navegador
 * @returns {boolean} - true se a MetaMask estiver instalada, false caso contrário
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};

/**
 * Conecta à carteira MetaMask e retorna o endereço do usuário
 * @returns {Promise<string | null>} - Promise com o endereço da carteira do usuário ou null em caso de erro
 */
export const conectarCarteira = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    alert('MetaMask não está disponível');
    return null;
  }

  try {
    const contas = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const conta = contas[0];
    console.log('🔗 Conta conectada:', conta);
    return conta;
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
    alert('Erro ao conectar à MetaMask');
    return null;
  }
};

/**
 * Verifica se existe uma carteira já conectada
 * @returns {Promise<string | null>} - Promise com o endereço da carteira conectada ou null se não houver
 */
export const verificarCarteiraConectada = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    const contas = await window.ethereum.request({ method: 'eth_accounts' });
    if (contas.length > 0) {
      console.log('✅ Carteira já conectada:', contas[0]);
      return contas[0];
    }
    return null;
  } catch (erro) {
    console.error('Erro ao verificar carteira conectada:', erro);
    return null;
  }
};
