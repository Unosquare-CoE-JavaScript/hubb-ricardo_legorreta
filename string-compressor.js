// Requirements:
// Design a method that compresses an input string consisting of only alphabetic characters by shortening its length, where possible.
// The string should be compressed such that consecutive duplicate letters are replaced with the letter followed by the number of consecutive duplicates.
// For example, uuueeeenzzzzz would compress into u3e4nz5.

// However, if the compression of a given letter would not shorten the output string, simply output the original letters.
// For example, uuueeeennzzzzz would compress into u3e4nnz5.

// Bonus #1: Design the method in such a way that the input string may contain numbers.
// If the input string does contain numbers, ensure that the input is compressed in an unambiguous way (a way in which the output string can be uncompressed back into the original input string). Would an output of ab434 mean the original string was ab434 or ab43333 or abbbb3333 or ab4444444444444444444444444444444444?

// Bonus #2: Can the caller of the method know if the input string was compressed or if the input string was simply returned as-is without
// the caller of the method having to perform a calculation of its own?

export class StringCompressor {

    /**
     * Note: Self defined rule: repeated characters should not be greater than 9, otherwise throw error.
     * @param {string} input
     */
    compress(input) {
        /** @type {{char: string, total: number}[]} */
        let compressedCharacters = [];

        for (let index = 0; index < input.length; index++) {
            const char = input[index];

            if (index == 0) {
                compressedCharacters.push({ char, total: 1 });
                continue;
            }

            if (input[index] == input[index - 1]) {
                const compressedCharacter = compressedCharacters.find(function (compressedChar) {
                    return compressedChar.char == char;
                });

                compressedCharacter.total++;

                if (compressedCharacter.total >= 10) {
                    console.error('Error: Repeated characters should not be greater that 9');
                    return;
                }
            } else {
                compressedCharacters.push({ char, total: 1 });
            }
        }

        const result = compressedCharacters.map(function (compressedChar) {
            if (compressedChar.total > 2) {
                return `${compressedChar.char}${compressedChar.total}`;
            } else {
                return compressedChar.char.repeat(compressedChar.total);
            }
        });

        return {
            value: result.join(''),
            wasCompressed: input != result.join('')
        }
    }

}