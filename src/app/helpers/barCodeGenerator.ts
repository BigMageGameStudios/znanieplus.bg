const array5bit_A = ['f//AAAAAAAAAAAAAAAAAAAA', 'f//AAAAAAAAAAAAAAAAAAAB', 'f//AAAAAAAAAAAAAAEAAAD/',
    'f//AAAAAAAAAAAAAAEAAAAA', 'f//AAAAAAAAAQAAAP8AAAAA', 'f//AAAAAAAAAQAAAP8AAAAB', 'f//AAAAAAAAAQAAAAAAAAD/',
    'f//AAAAAAAAAQAAAAAAAAAA', 'f//AAABAAAA/wAAAAAAAAAA', 'f//AAABAAAA/wAAAAAAAAAB', 'f//AAABAAAA/wAAAAEAAAD/',
    'f//AAABAAAA/wAAAAEAAAAA', 'f//AAABAAAAAAAAAP8AAAAA', 'f//AAABAAAAAAAAAP8AAAAB', 'f//AAABAAAAAAAAAAAAAAD/',
    'f//AAABAAAAAAAAAAAAAAAA', 'QD/AAD/AAAAAAAAAAAAAAAA', 'QD/AAD/AAAAAAAAAAAAAAAB', 'QD/AAD/AAAAAAAAAAEAAAD/',
    'QD/AAD/AAAAAAAAAAEAAAAA', 'QD/AAD/AAAAAQAAAP8AAAAA', 'QD/AAD/AAAAAQAAAP8AAAAB', 'QD/AAD/AAAAAQAAAAAAAAD/',
    'QD/AAD/AAAAAQAAAAAAAAAA', 'QD/AAAAAAAA/wAAAAAAAAAA', 'QD/AAAAAAAA/wAAAAAAAAAB', 'SL/AADeAAAA/gAAAAIAAAD+',
    'QD/AAAAAAAA/wAAAAEAAAAA', 'QD/AAAAAAAAAAAAAP8AAAAA', 'QD/AAAAAAAAAAAAAP8AAAAB', 'QD/AAAAAAAAAAAAAAAAAAD/',
    'QD/AAAAAAAAAAAAAAAAAAAA'];

const array5bit_B = ['US0CAuSD38g', 'UUYCA7QBErs', 'ajEDAm49ReY', 'UUoCA+juogg', 'bjEDAjQrOn0', 'bkoDA3iPVH4',
    'ajUDAt82atY', 'UU4CA1nljTg', 'cjEDAghkmFU', 'ckoDA0TA9lY', 'izUEAhrxcbg', 'ck4DAxY8F10', 'bjUDAlvFFR8', 'bk4DAxdhexw',
    'ajkDAr7LFAw', 'UVICAyQ+UJI', 'TTECAq7UnEM', 'TUoCA+Jw8kA', 'ZjUDAmZGozo', 'TU4CA7CME0s', 'ajUDAvnk9E4', 'ak4DA7VAmk0',
    'ZjkDAtle3bI', 'TVICAxOyzrM', 'STUCAqHeHtM', 'SU4CA+16cNA', 'h6QEAZKdo54', 'SVICA62zYxM', 'RTkCAqx1lb4', 'RVICA/z3WM0',
    'QT0CAkdoxRU', 'KFYBA46vJCA'];

const stringStart = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAQAAADLaIVbAAAANUlEQVQIHQEqANX/A';
const stringMid = 'AAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA';
const stringEnd = 'AAAAASUVORK5CYII=" width="';
const arrayCodeEANBin = [['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'], ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'], ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100']];
const arrayStructEAN = ['000000', '001011', '001101', '001110', '010011', '011001', '011100', '010101', '010110', '011010'];

export function generateBarCode(inputString: string, intWidth: number, intHeight: number) {
    let strRaw = funcEAN(inputString);

    const intRawmod = strRaw.length % 5;
    if (intRawmod > 0) {
        for (let i = 0; i < 5 - intRawmod; i++) {
            strRaw += "0";
        }
    }

    const intChunks = strRaw.length / 5;
    const arraySeq = new Array(intChunks);
    for (let i = 0; i < intChunks; i++) {
        const len = i * 5;
        arraySeq[i] = parseInt(strRaw.slice(len, len + 5), 2);
    }

    let resultString = "";
    for (let i = 0; i < arraySeq.length; i++) {
        resultString += stringStart + array5bit_A[arraySeq[i]] + stringMid + array5bit_B[arraySeq[i]] + stringEnd + intWidth + '" height="' + intHeight + '">';
    }

    return resultString;
}




function funcEAN(strText = "") {
    let intSumOdd = 0, intSumEven = 0, intCheck: number, i: number, j: number, strStruct: string;
    let strRaw = '';

    for (i = 0; i < 12; i += 2) {
        intSumEven += parseInt(strText[i]);
        intSumOdd += parseInt(strText[i + 1]);
    }

    intCheck = ((intSumOdd * 3) + intSumEven) % 10;
    if (intCheck > 0) {
        intCheck = 10 - intCheck;
    }
    strText += intCheck;

    strRaw = "101";
    strStruct = arrayStructEAN[strText[0]];

    for (i = 1; i < 7; i += 1) {
        strRaw += arrayCodeEANBin[strStruct[i - 1]][strText[i]];
    }

    strRaw += "01010";
    for (i = 0; i < 6; i += 1) {
        strRaw += arrayCodeEANBin[2][strText[i + 7]];
    }
    
    strRaw += "101";
    return strRaw;
}

