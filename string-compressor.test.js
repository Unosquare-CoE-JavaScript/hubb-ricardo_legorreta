// Requirements:
// Design a method that compresses an input string consisting of only alphabetic characters by shortening its length, where possible.
// The string should be compressed such that consecutive duplicate letters are replaced with the letter followed by the number of consecutive duplicates.
// For example, uuueeeenzzzzz would compress into u3e4nz5.

// However, if the compression of a given letter would not shorten the output string, simply output the original letters.
// For example, uuueeeennzzzzz would compress into u3e4nnz5.

// Bonus #1: Design the method in such a way that the input string may contain numbers.
// If the input string does contain numbers, ensure that the input is compressed in an unambiguous way
// (a way in which the output string can be uncompressed back into the original input string).
// Would an output of ab434 mean the original string was ab434 or ab43333 or abbbb3333 or ab4444444444444444444444444444444444?

// Bonus #2: Can the caller of the method know if the input string was compressed or if the input string was simply returned as-is without
// the caller of the method having to perform a calculation of its own?

import { StringCompressor } from './string-compressor.js';

function runTests() {
    simpleInputShouldBeCompressedSuccessfully();
    inputIncludingTwoLettersShouldReturnOriginalLetters();
    inputShouldNotBeCompressed();
    inputWithSimpleNumbersAndCharactersShouldReturnTheSameOutput();
    inputWithNumbersAndCharactersCompressShouldSuccess();
    inputWithMoreThan9RepeatedCharactersThrowsError();
}

function simpleInputShouldBeCompressedSuccessfully() {
    const compressor = new StringCompressor();
    const compressed = compressor.compress('uuueeeenzzzzz');

    console.log('simpleInputShouldBeCompressedSuccessfully > '); // should be u3e4nz5
    compareTwoInputs('u3e4nz5', compressed.value);
}

function inputIncludingTwoLettersShouldReturnOriginalLetters() {
    const compressor = new StringCompressor();
    const compressed = compressor.compress('uuueeeennzzzzz');  // should be u3e4nnz5 (nn was not compressed)

    console.log('inputIncludingTwoLettersShouldReturnOriginalLetters > ');
    compareTwoInputs('u3e4nnz5', compressed.value);
}

function inputShouldNotBeCompressed() {
    const compressor = new StringCompressor();
    const compressed = compressor.compress('ueennzz');  // should be ueennzz (nothing was compressed)

    console.log('inputShouldNotBeCompressed > ');
    compareTwoInputs('ueennzz', compressed.value);

    console.log('was input compressed ? ', compressed.wasCompressed);
}

function inputWithSimpleNumbersAndCharactersShouldReturnTheSameOutput() {
    const compressor = new StringCompressor();
    const compressed = compressor.compress('uee34nnzz');  // should return the same

    console.log('inputWithSimpleNumbersAndCharactersShouldReturnTheSameOutput > ');
    compareTwoInputs('uee34nnzz', compressed.value);
}

function inputWithNumbersAndCharactersCompressShouldSuccess() {
    const compressor = new StringCompressor();
    const compressed = compressor.compress('4ueee3nnzz55');  // should return 4ue33nnzz55

    console.log('inputWithNumbersAndCharactersCompressShouldSuccess > ');
    compareTwoInputs('4ue33nnzz55', compressed.value);
}


function inputWithMoreThan9RepeatedCharactersThrowsError() {
    const compressor = new StringCompressor();

    console.log('inputWithMoreThan9RepeatedCharactersThrowsError > ');
    compressor.compress('uuuuuuuuuueennzz');  // should return error
}

/**
 * 
 * @param {string} expected 
 * @param {string} current 
 */
function compareTwoInputs(expected, current) {
    console.log(`>> expected: ${expected}, result: ${current}. >> Passed ? (${expected == current})`);
}

runTests();