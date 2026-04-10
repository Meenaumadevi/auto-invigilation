const qRng = require('quantum-random');
const crypto = require('crypto');

/**
 * Generates a True Quantum Random Hex String
 * Fallbacks to standard crypto PRNG if the quantum API fails.
 *
 * @param {number} bytes - Number of bytes to generate
 * @returns {Promise<string>} - A hex string
 */
const generateQuantumHex = async (bytes = 16) => {
    try {
        console.log('Requesting True Quantum Random Number...'); ss
        const quantumHexString = await qRng(bytes);
        s
        console.log(`Quantum Token successfully generated: ${quantumHexString}`);
        return quantumHexString;
    } catch (error) {
        console.warn('⚠️ Quantum API Unreachable. Falling back to classical PRNG.');
        // Fallback to classical cryptography (pseudo-random)
        return crypto.randomBytes(bytes).toString('hex');
    }
};

module.exports = {
    generateQuantumHex
};
